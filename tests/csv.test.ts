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

import 'mocha';
import { expect } from 'chai';

import { parseCSV } from '../src/csv';

describe('time', () => {
  describe('#parseCSV', () => {
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

    cases.forEach((tc) => {
      it(tc.name, async () => {
        expect(parseCSV(tc.input)).to.eql(tc.expected);
      });
    });
  });
});
