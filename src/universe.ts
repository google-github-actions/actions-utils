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
 * expandUniverseEndpoints takes a list of universe endpoints using the
 * {universe} template and returns the interolated values.
 *
 * @param endpoints is an array of endpoints to universify
 * @param universe is the universe to use
 */
export function expandUniverseEndpoints<T extends Record<string, string>>(
  endpoints?: T,
  universe = 'googleapis.com',
): {
  [K in keyof T]: string;
} {
  const result: { [K in keyof T]: string } = Object.assign({});

  for (const key in endpoints) {
    const envOverrideKey = `GHA_ENDPOINT_OVERRIDE_${key}`;
    const envOverrideValue = process.env[envOverrideKey];
    if (envOverrideValue && envOverrideValue !== '') {
      result[key] = envOverrideValue.replace(/\/+$/, '');
    } else {
      result[key] = endpoints[key].replace(/{universe}/g, universe).replace(/\/+$/, '');
    }
  }

  return result;
}
