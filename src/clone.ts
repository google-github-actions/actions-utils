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

import * as v8 from 'v8';

/**
 * deepClone builds a deep copy (clone) of the given input. By default, it uses
 * structuredClone if defined. Otherwise, it uses v8 to serialize and
 * deserialize the input.
 *
 * @param input Object to deep clone.
 * @param useStructuredClone Use structuredClone method (defaults to true).
 * @return Deep copy of input.
 */
export function deepClone<T>(input: T, useStructuredClone = true): T {
  if (useStructuredClone && typeof structuredClone === 'function') {
    return structuredClone(input);
  }
  return v8.deserialize(v8.serialize(input));
}
