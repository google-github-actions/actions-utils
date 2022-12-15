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
 * ProcessEnv is a wrapper that defines an environment structure.
 */
export type ProcessEnv = Record<string, string | undefined>;

/**
 * stubEnv accepts an input dictionary and sets the provided environment
 * variables in the current process environment. Values set to "undefined" are
 * deleted from the environment.
 *
 * The function is only safe for concurrent use if the target is safe for
 * concurrent use. The function itself provides no locking.
 *
 * @param input Map of string value pairs to set in the new environment.
 * @param target Target map to set and restore (defaults to `process.env`).
 *
 * @return Function that restores the environment.
 */
export function stubEnv(input: ProcessEnv, target: ProcessEnv = process.env): () => void {
  const restore: ProcessEnv = {};

  for (const name in input) {
    restore[name] = target[name];

    if (input[name] !== undefined) {
      target[name] = input[name];
    } else {
      delete target[name];
    }
  }

  return () => {
    for (const name in restore) {
      if (restore[name] !== undefined) {
        target[name] = restore[name];
      } else {
        delete target[name];
      }
    }
  };
}
