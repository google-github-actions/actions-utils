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

const booleanTable: Record<string, boolean> = {
  '1': true,
  't': true,
  'T': true,
  'true': true,
  'True': true,
  'TRUE': true,

  '0': false,
  'f': false,
  'F': false,
  'false': false,
  'False': false,
  'FALSE': false,
};

/**
 * parseBoolean converts a string into a boolean. Unparseable or invalid values
 * return false.
 *
 * @param input The value to check
 * @return boolean
 */
export function parseBoolean(input?: string, defaultValue: boolean = false): boolean {
  const key = (input || '').trim();
  if (key === '') {
    return defaultValue;
  }

  if (!(key in booleanTable)) {
    throw new Error(`invalid boolean value "${key}"`);
  }

  return booleanTable[key];
}
