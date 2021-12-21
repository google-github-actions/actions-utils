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

/**
 * parseCSV accepts a comma-separated list of items. Whitespace around entries
 * is removed.
 *
 * @param input String representing a list.
 *
 * @returns Array of strings, in the same order they were supplied.
 */
export function parseCSV(input: string): string[] {
  input = (input || '').trim();
  if (!input) {
    return [];
  }

  const list = input.split(/(?<!\\),/gi);
  for (let i = 0; i < list.length; i++) {
    list[i] = list[i].trim().replace(/\\,/gi, ',');
  }
  return list;
}
