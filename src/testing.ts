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
 * setInput sets the given name as a GitHub Actions input. It uses the reverse
 * logic for how GitHub Actions searches for a named input.
 *
 * @param name Name of the input.
 * @param value String value of the input.
 */
export function setInput(name: string, value: string): void {
  const envvar = `INPUT_${name.replace(/ /g, '_').toUpperCase()}`;
  process.env[envvar] = value;
}

/**
 * setInputs sets the list of GitHub Actions inputs. See #setInput for more
 * information.
 *
 * @param inputs List of inputs.
 */
export function setInputs(inputs: Record<string, string>): void {
  Object.entries(inputs).forEach(([key, value]) => setInput(key, value));
}

/**
 * clearInputs removes any GitHub Actions inputs set on the environment.
 */
export function clearInputs(): void {
  clearEnv((key) => key.startsWith(`INPUT_`));
}

/**
 * clearEnv deletes any keys from the environment for which the function returns
 * true.
 *
 * @param fn Function to determine whether a variable should be deleted.
 */
export function clearEnv(fn: (key: string, value?: string) => boolean): void {
  Object.keys(process.env).forEach((key) => {
    if (fn(key, process.env[key])) {
      delete process.env[key];
    }
  });
}
