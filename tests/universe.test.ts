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

import { describe, test } from 'node:test';
import assert from 'node:assert/strict';

import { expandUniverseEndpoints } from '../src/universe';

describe('universe', { concurrency: true }, async () => {
  test('#expandUniverseEndpoints', async (suite) => {
    const cases = [
      {
        name: 'undefined',
        endpoints: undefined,
        expected: {},
      },
      {
        name: 'empty',
        endpoints: {},
        expected: {},
      },
      {
        name: 'expands one',
        endpoints: {
          foo: 'https://foo.{universe}/v1',
        },
        universe: 'myuniverse.com',
        expected: {
          foo: 'https://foo.myuniverse.com/v1',
        },
      },
      {
        name: 'expands all',
        endpoints: {
          bar: 'https://bar.{universe}/v1',
          foo: 'https://foo.{universe}/v1',
          zip: 'https://zip.{universe}/v1',
        },
        universe: 'my-other-universe.com',
        expected: {
          bar: 'https://bar.my-other-universe.com/v1',
          foo: 'https://foo.my-other-universe.com/v1',
          zip: 'https://zip.my-other-universe.com/v1',
        },
      },
    ];

    for await (const tc of cases) {
      await suite.test(tc.name, async () => {
        const result = expandUniverseEndpoints(tc.endpoints as Record<string, string>, tc.universe);
        assert.deepStrictEqual(result, tc.expected);
      });
    }
  });
});
