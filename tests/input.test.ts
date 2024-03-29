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

import { parseBoolean } from '../src/input';

describe('input', { concurrency: true }, async () => {
  test('#parseBoolean', async (suite) => {
    const cases = [
      {
        name: 'undefined',
        input: undefined,
        expected: false,
      },
      {
        name: 'empty string',
        input: '',
        expected: false,
      },
      {
        name: 'undefined a with custom default',
        input: undefined,
        defaultValue: true,
        expected: true,
      },
      {
        name: 'empty string a with custom default',
        input: '',
        defaultValue: true,
        expected: true,
      },
      {
        name: 'nonsense',
        input: '149585',
        error: 'invalid boolean value "149585"',
      },
      {
        name: '1',
        input: '1',
        expected: true,
      },
      {
        name: 't',
        input: 't',
        expected: true,
      },
      {
        name: 'T',
        input: 'T',
        expected: true,
      },
      {
        name: 'true',
        input: 'true',
        expected: true,
      },
      {
        name: 'True',
        input: 'True',
        expected: true,
      },
      {
        name: 'TRUE',
        input: 'TRUE',
        expected: true,
      },
      {
        name: '0',
        input: '0',
        expected: false,
      },
      {
        name: 'f',
        input: 'f',
        expected: false,
      },
      {
        name: 'F',
        input: 'F',
        expected: false,
      },
      {
        name: 'false',
        input: 'false',
        expected: false,
      },
      {
        name: 'False',
        input: 'False',
        expected: false,
      },
      {
        name: 'FALSE',
        input: 'FALSE',
        expected: false,
      },
    ];

    for await (const tc of cases) {
      await suite.test(tc.name, async () => {
        if (tc.error) {
          assert.throws(
            () => {
              parseBoolean(tc.input, tc.defaultValue);
            },
            { message: tc.error },
          );
        } else {
          const actual = parseBoolean(tc.input, tc.defaultValue);
          assert.deepStrictEqual(actual, tc.expected);
        }
      });
    }
  });
});
