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
  // Split on space or "=" if not in quotes
  const result = input.replace('\n', '').match(/(".*?"|'.*?'|[^"\s=]+)+(?=\s*|\s*$)/g);
  if (result) {
    return result;
  }
  return [];
}
