/*
 * Copyright 2022 Google LLC
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

/**
 * parseFlags takes an input string and parses it as posix-compliant flags.
 *
 * @param input Flag string input.
 * @return Array of strings in the order in which they were defined as flags.
 */
export function parseFlags(input: string): string[] {
  const result: string[] = [];
  let current = '';
  let expectingArg = false;

  for (let i = 0; i < input.length; i++) {
    const ch = input[i];

    // If we encounter a single quote, read until we encounter another single
    // quote.
    if (ch === `'`) {
      const next = readUntil(input.slice(i + 1), `'`);
      if (next === null) {
        throw new Error(`Unterminated single quote in ${input} at position ${i}`);
      }
      current += ch + next;
      i += next.length;
      continue;
    }

    // If we encounter a double quote, read until we encounter another double
    // quote.
    if (ch === `"`) {
      const next = readUntil(input.slice(i + 1), `"`);
      if (next === null) {
        throw new Error(`Unterminated double quote in ${input} at position ${i}`);
      }
      current += ch + next;
      i += next.length;
      continue;
    }

    // Whitespace characters trigger argument termination.
    if (ch === '\r' || ch === `\n` || ch === ` `) {
      // We are no longer expecting an argument.
      expectingArg = false;

      // If there's anything in the buffer, append now.
      if (current !== ``) {
        result.push(current);
        current = ``;
      }

      // Regardless, do not append these strings to the result.
      continue;
    }

    // If we've encountered an equal sign, we need to check whether we're
    // expecting an argument. If we're not expecting an argument and the current
    // entry looks like a flag, terminate. Otherwise, continue normal appending
    // below.
    if (ch === `=`) {
      if (!expectingArg && current[0] === `-`) {
        result.push(current);
        current = ``;
        expectingArg = true;
        continue;
      }
    }

    // Otherwise, append.
    current += ch;
  }

  if (current !== '') {
    result.push(current);
  }

  return result;
}

/**
 * readUntil reads up to and including the given character and returns the
 * result. It ignores escaped versions of the character if they are preceeded by
 * with "\". If ch is not found, it returns null.
 *
 * This is a utility function, but it is exported for testing.
 *
 * @param input The input string.
 * @param ch The character to search.
 *
 * @return the string up to and including the search character, or null if no
 * match is found.
 */
export function readUntil(input: string, ch: string): string | null {
  let escaped = false;
  let result = '';

  for (let i = 0; i < input.length; i++) {
    const next = input[i];
    result += next;

    if (next === `\\`) {
      escaped = true;
      continue;
    }

    if (next === ch && !escaped) {
      return result;
    }

    escaped = false;
  }

  return null;
}
