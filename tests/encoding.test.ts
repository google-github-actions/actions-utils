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

import { fromBase64, toBase64 } from '../src/encoding';

describe('encoding', () => {
  describe('#fromBase64', () => {
    const cases = [
      {
        name: 'decodes',
        input: 'aGVsbG8',
        expected: 'hello',
      },
      {
        name: 'decodes padded',
        input: 'aGVsbG8==',
        expected: 'hello',
      },
      {
        name: 'decodes semi-padded',
        input: 'aGVsbG8=',
        expected: 'hello',
      },
    ];

    cases.forEach((tc) => {
      it(tc.name, async () => {
        expect(fromBase64(tc.input)).to.eq(tc.expected);
      });
    });
  });

  describe('#toBase64', () => {
    const cases = [
      {
        name: 'empty string',
        input: '',
        expected: '',
      },
      {
        name: 'empty buffer',
        input: Buffer.from(''),
        expected: '',
      },
      {
        name: 'encodes string',
        input: 'hello',
        expected: 'aGVsbG8',
      },
      {
        name: 'encodes buffer',
        input: Buffer.from('hello'),
        expected: 'aGVsbG8',
      },
    ];

    cases.forEach((tc) => {
      it(tc.name, async () => {
        expect(toBase64(tc.input)).to.eq(tc.expected);
      });
    });
  });
});
