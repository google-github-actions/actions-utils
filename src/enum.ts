/*
 * Copyright 2024 Google LLC
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
 * toEnum converts the input value to the best enum value. If no enum value
 * exists, it throws an error.
 *
 * @param e Enum to check against.
 * @param s String to enumerize.
 * @returns string
 */
export function toEnum<E extends Record<string, string>>(e: E, s: string): E[keyof E] {
  const originalValue = (s || '').toUpperCase();
  const mutatedValue = originalValue.replace(/[\s-]+/g, '_');

  if (originalValue in e) {
    return e[originalValue] as E[keyof E];
  } else if (mutatedValue in e) {
    return e[mutatedValue] as E[keyof E];
  } else {
    const keys = Object.keys(e) as Array<keyof E>;
    throw new Error(`Invalid value ${s}, valid values are ${JSON.stringify(keys)}`);
  }
}
