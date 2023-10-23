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
 * parseKVString parses a string of the format "KEY1=VALUE1,KEY2=VALUE2" or
 * "KEY1=VALUE1\nKEY2=VALUE2". Keys or values that contain a separator must be
 * escaped with a backslash ("\,", "\\n"). All leading and trailing whitespace
 * is trimmed.
 *
 * @param input String with key/value pairs to parse.
 * @param allowEmptyValues Boolean indicating whether empty values are allowed.
 *
 * They will be parsed as empty string ("")
 */
export function parseKVString(input: string, allowEmptyValues = false): KVPair {
  input = (input || '').trim();
  if (!input) {
    return {};
  }

  const result: KVPair = {};

  // This regular expression uses a lookahead to split on commas and newlines
  // which are not preceeded by an escape character (slash).
  const pairs = input.split(/(?<!\\)[,\n]/gi);
  for (let i = 0; i < pairs.length; i++) {
    const pair = (pairs[i] || '').trim();
    if (!pair) {
      continue;
    }

    const firstEqual = pair.indexOf('=');
    if (!firstEqual || firstEqual === -1) {
      throw new SyntaxError(`Failed to parse KEY=VALUE pair "${pair}": missing "="`);
    }

    // Trim any key whitespace and un-escape any escaped commas and newlines.
    const k = pair
      .slice(0, firstEqual)
      .trim()
      .replace(/\\([,\n])/gi, '$1');
    const v = pair
      .slice(firstEqual + 1)
      .trim()
      .replace(/\\([,\n])/gi, '$1');

    if (!k || (!v && !allowEmptyValues)) {
      throw new SyntaxError(`Failed to parse KEY=VALUE pair "${pair}": no value`);
    }

    result[k] = v;
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
export function parseKVFile(filePath: string): KVPair {
  try {
    const content = presence(readFileSync(filePath, 'utf-8'));
    if (!content || content.length < 1) {
      return {};
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
export function parseKVJSON(str: string): KVPair {
  str = (str || '').trim();
  if (!str) {
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
export function parseKVYAML(str: string): KVPair {
  if (!str || str.trim().length === 0) {
    return {};
  }

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
export function parseKVStringAndFile(kvString?: string, kvFilePath?: string): KVPair {
  kvString = (kvString || '').trim();
  kvFilePath = (kvFilePath || '').trim();

  let result: Record<string, string> = {};

  if (kvFilePath) {
    const parsed = parseKVFile(kvFilePath);
    result = { ...result, ...parsed };
  }

  if (kvString) {
    const parsed = parseKVString(kvString);
    result = { ...result, ...parsed };
  }

  return result;
}
