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

import { describe, it } from 'node:test';
import assert from 'node:assert';

import { parseBoolean } from '../src/input';

describe('input', async () => {
  describe('#parseBoolean', async () => {
    const cases: {
      name: string;
      input: string | undefined;
      expected: boolean;
    }[] = [
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
        name: 'nonsense',
        input: '149585',
        expected: false,
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
        name: '1',
        input: '1',
        expected: true,
      },
      {
        name: '0',
        input: '0',
        expected: false,
      },
      {
        name: 'false',
        input: 'false',
        expected: false,
      },
    ];

    cases.forEach((tc) => {
      it(tc.name, async () => {
        const actual = parseBoolean(tc.input);
        assert.deepStrictEqual(actual, tc.expected);
      });
    });
  });
});
