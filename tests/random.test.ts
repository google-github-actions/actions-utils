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

import { describe, test } from 'node:test';
import assert from 'node:assert/strict';

import { tmpdir } from 'os';
import { join as pathjoin } from 'path';

import { randomFilename, randomFilepath } from '../src/random';

describe('random', { concurrency: true }, async () => {
  test('#randomFilename', async (suite) => {
    const cases = [
      {
        name: 'no args',
        input: [],
        expected: 24,
      },
      {
        name: 'custom length',
        input: [24],
        expected: 48,
      },
    ];

    for await (const tc of cases) {
      await suite.test(tc.name, async () => {
        const actual = randomFilename(...tc.input);
        assert.deepStrictEqual(actual.length, tc.expected);
        assert.notEqual(actual, randomFilename(...tc.input));
      });
    }
  });

  test('#randomFilepath', async (suite) => {
    const cases = [
      {
        name: 'no args',
        input: [],
        expected: tmpdir(),
      },
      {
        name: 'custom prefix',
        input: [pathjoin('foo', 'bar')],
        expected: pathjoin('foo', 'bar'),
      },
    ];

    for await (const tc of cases) {
      await suite.test(tc.name, async () => {
        const actual = randomFilepath(...tc.input);
        const expected = tc.expected.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
        assert.match(actual, new RegExp(`^${expected}`));
        assert.notEqual(actual, randomFilepath(...tc.input));
      });
    }
  });
});
