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

import { parseCSV, parseMultilineCSV } from '../src/csv';

describe('csv', { concurrency: true }, async () => {
  test('#parseCSV', async (suite) => {
    const cases = [
      {
        name: 'empty string',
        input: '',
        expected: [],
      },
      {
        name: 'padded string',
        input: '   ',
        expected: [],
      },
      {
        name: 'single item',
        input: 'apple',
        expected: ['apple'],
      },
      {
        name: 'multiple items',
        input: 'apple, banana, berries',
        expected: ['apple', 'banana', 'berries'],
      },
      {
        name: 'escaped',
        input: 'new york\\, new york, banana, berries',
        expected: ['new york, new york', 'banana', 'berries'],
      },
    ];

    for await (const tc of cases) {
      await suite.test(tc.name, async () => {
        const actual = parseCSV(tc.input);
        assert.deepStrictEqual(actual, tc.expected);
      });
    }
  });

  test('#parseMultilineCSV', async (suite) => {
    const cases = [
      {
        name: 'empty string',
        input: '',
        expected: [],
      },
      {
        name: 'padded string',
        input: '   ',
        expected: [],
      },
      {
        name: 'single item',
        input: 'apple',
        expected: ['apple'],
      },
      {
        name: 'multiple items',
        input: 'apple, banana, berries',
        expected: ['apple', 'banana', 'berries'],
      },
      {
        name: 'escaped',
        input: 'new york\\, new york, banana, berries',
        expected: ['new york, new york', 'banana', 'berries'],
      },
      {
        name: 'multiple lines empty',
        input: '\n\n\n\n',
        expected: [],
      },
      {
        name: 'multiple lines padded',
        input: '\n  \n\n  \n',
        expected: [],
      },
      {
        name: 'multiple lines single item',
        input: '\n\napple\n',
        expected: ['apple'],
      },
      {
        name: 'multiple lines multiple items',
        input: 'apple\nbanana,berries\n\nnew york\nnew york',
        expected: ['apple', 'banana', 'berries', 'new york', 'new york'],
      },
    ];

    for await (const tc of cases) {
      await suite.test(tc.name, async () => {
        const actual = parseMultilineCSV(tc.input);
        assert.deepStrictEqual(actual, tc.expected);
      });
    }
  });
});
