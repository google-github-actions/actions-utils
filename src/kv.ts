/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import YAML from 'yaml';
import { readFileSync } from 'fs';

import { errorMessage } from './errors';
import { presence } from './validations';

/**
 * KVPair represents a key=value pair of strings.
 */
export type KVPair = Record<string, string>;

/**
 * joinKVString joins the given KVPair using the provided separator.
 *
 * @param input KVPair to serialize.
 * @param separator Join separator.
 */
export function joinKVString(input: KVPair, separator = ','): string {
  return Object.entries(input)
    .map(([k, v]) => {
      return `${k}=${v}`;
    })
    .join(separator);
}

/**
 * joinKVStringForGCloud creates a string suitable for using with gcloud by
 * choosing a custom escape delimiter sequence that does not exist in the input
 * string.
 *
 * @param input KVPair to serialize.
 * @param chars String of characters to use.
 */
export function joinKVStringForGCloud(
  input: KVPair,
  chars = ',.!@#$%&*()_=+~`[]{}|:;<>?🚀🍪🐼\u200B',
): string {
  const initial = joinKVString(input, '');
  if (initial === '') {
    return '';
  }

  const initialMap: Record<string, boolean> = {};
  for (let i = 0; i < initial.length; i++) {
    initialMap[initial[i]] = true;
  }

  let delim = '';
  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i];
    if (!(ch in initialMap)) {
      delim = ch;
      break;
    }
  }

  if (delim === '' || initial.includes(delim)) {
    throw new Error(
      `Something extremely probabilistically unlikely has occured - none of ` +
        `the possible delimiters is viable for the input.`,
    );
  }

  return `^${delim}^` + joinKVString(input, delim);
}

/**
 * parseKVString parses a string of the format "KEY1=VALUE1,KEY2=VALUE2" or
 * "KEY1=VALUE1\nKEY2=VALUE2". Keys or values that contain a separator must be
 * escaped with a backslash ("\,", "\\n"). All leading and trailing whitespace
 * is trimmed.
 *
 * If the input is the literal string "{}", this returns the empty object. This
 * is useful when trying to delete all upstream values.
 *
 * @param input String with key/value pairs to parse.
 */
export function parseKVString(input: string): KVPair | undefined {
  input = (input || '').trim();
  if (!input) {
    return undefined;
  }

  const result: KVPair = {};

  if (input === '{}') {
    return result;
  }

  let currentKey = '';
  let currentValue = '';
  let backslashIdx = -1;

  const setKey = (s: string) => (currentKey += s);
  const setValue = (s: string) => (currentValue += s);
  let buffer = setKey;

  for (let i = 0; i < input.length; i++) {
    const ch = input[i];

    if (backslashIdx >= 0) {
      buffer(ch);
      backslashIdx = -1;
    } else if (ch === '\\') {
      backslashIdx = i;
    } else if (ch === '=') {
      // Ensure we have a key
      if (currentKey === '') {
        throw new Error(`Invalid start sequence for value (no preceeding key before "=") at ${i}`);
      }

      // This handles the case where we have an "=". If the buffer is on
      // setValue, then we are already inside a key and want to retain the "=".
      if (buffer === setValue) {
        buffer(ch);
      }

      buffer = setValue;
    } else if (ch === '\n' || ch === '\r' || ch === '\u2028' || ch === '\u2029' || ch === ',') {
      if (currentKey !== '') {
        result[currentKey.trim()] = currentValue.trim();
      }

      currentKey = '';
      currentValue = '';
      buffer = setKey;
    } else {
      buffer(ch);
    }
  }

  if (backslashIdx >= 0) {
    throw new Error(`Unterminated escape character at ${backslashIdx}`);
  }

  // Put what's left in the buffer
  if (currentKey !== '') {
    result[currentKey.trim()] = currentValue.trim();
  }

  return result;
}

/**
 * Read and parse an env var file. If the file contents begin with a curly
 * brace, the content is assumed to be JSON and is parsed as JSON. Otherwise,
 * the contents are parsed as a subset of YAML.
 *
 * @param filePath Path to the file on disk to parse.
 */
export function parseKVFile(filePath: string): KVPair | undefined {
  try {
    const content = presence(readFileSync(filePath, 'utf8'));
    if (!content || content.length < 1) {
      return undefined;
    }

    if (content[0] === '{' || content[0] === '[') {
      return parseKVJSON(content);
    }

    if (content.match(/^.+=.+/gi)) {
      return parseKVString(content);
    }

    return parseKVYAML(content);
  } catch (err) {
    const msg = errorMessage(err);
    throw new Error(`Failed to read file '${filePath}': ${msg}`);
  }
}

/**
 * parseKVJSON parses the given string as a set of key=value pairs expressed as
 * JSON. If the input is not valid JSON, it errors. If the keys and values are
 * not both string types, it errors. Entries are returned in the order in which
 * they appeared in the JSON input.
 *
 * This is mostly exposed for testing. Callers should probably use #parseKVFile
 * instead.
 *
 * @param str JSON string to parse.
 *
 * @return List of key=value pairs.
 */
export function parseKVJSON(str: string): KVPair | undefined {
  str = (str || '').trim();
  if (!str) {
    return undefined;
  }

  if (str === '{}') {
    return {};
  }

  try {
    const parsed = JSON.parse(str);

    const pairs: KVPair = {};
    for (const [k, v] of Object.entries(parsed)) {
      if (typeof k !== 'string') {
        throw new SyntaxError(`Failed to parse key "${k}", expected string, got ${typeof k}`);
      }
      if (k.trim() === '') {
        throw new SyntaxError(`Failed to parse key "${k}", expected at least one character`);
      }

      if (typeof v !== 'string') {
        const vPretty = JSON.stringify(v);
        throw new SyntaxError(
          `Failed to parse value "${vPretty}" for "${k}", expected string, got ${typeof v}`,
        );
      }
      if (v.trim() === '') {
        throw new SyntaxError(`Value for key "${k}" cannot be empty (got "${v}")`);
      }

      pairs[k] = v;
    }

    return pairs;
  } catch (err) {
    const msg = errorMessage(err);
    throw new Error(`Failed to parse KV pairs as JSON: ${msg}`);
  }
}

/**
 * Read and parse contents of the string as YAML. This is mostly just exposed
 * for testing.
 *
 * @param str YAML content to parse as K=V pairs.
 */
export function parseKVYAML(str: string): KVPair | undefined {
  const trimmed = (str || '').trim();
  if (!trimmed) {
    return undefined;
  }

  if (trimmed === '{}') {
    return {};
  }

  // Parse the original string here, since trimming could have changed
  // indentation.
  const yamlContent = YAML.parse(str) as KVPair;

  const result: KVPair = {};
  for (const [k, v] of Object.entries(yamlContent)) {
    if (typeof k !== 'string' || typeof v !== 'string') {
      throw new SyntaxError(
        `env_vars_file must contain only KEY: VALUE strings. Error parsing key ${k} of type ${typeof k} with value ${v} of type ${typeof v}`,
      );
    }
    result[k.trim()] = v.trim();
  }

  return result;
}

/**
 * parseKVStringAndFile parses the given KV string and KV file, merging the
 * results (with kvString taking precedence).
 *
 * @param kvString String of KEY=VALUE pairs.
 * @param kvFilePath Path on disk to a YAML file of KEY: VALUE pairs.
 */
export function parseKVStringAndFile(kvString?: string, kvFilePath?: string): KVPair | undefined {
  kvString = (kvString || '').trim();
  kvFilePath = (kvFilePath || '').trim();

  const fromFile = kvFilePath ? parseKVFile(kvFilePath) : undefined;
  const fromString = kvString ? parseKVString(kvString) : undefined;

  if (fromFile === undefined && fromString === undefined) {
    return undefined;
  }
  return Object.assign({}, fromFile, fromString);
}
