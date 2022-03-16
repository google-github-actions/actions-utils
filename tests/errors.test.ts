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

import { errorMessage } from '../src/errors';

describe('errors', () => {
  describe('#errorMessage', () => {
    const cases = [
      {
        name: 'null',
        input: null,
        expected: '',
      },
      {
        name: 'undefined',
        input: undefined,
        expected: '',
      },
      {
        name: 'empty string',
        input: '',
        expected: '',
      },
      {
        name: 'trims',
        input: '   ',
        expected: '',
      },
      {
        name: 'single character',
        input: 'a',
        expected: 'a',
      },
      {
        name: 'single character error',
        input: new Error('a'),
        expected: 'a',
      },
      {
        name: 'lowercase first',
        input: new Error('Failed with'),
        expected: 'failed with',
      },
      {
        name: 'no lowercase first multi-caps',
        input: new Error('EONENT: oops'),
        expected: 'EONENT: oops',
      },
      {
        name: 'error',
        input: new Error('foobar'),
        expected: 'foobar',
      },
      {
        name: 'error prefix',
        input: new Error('Error: failed'),
        expected: 'failed',
      },
      {
        name: 'input object',
        input: { message: 'message', error: 'error' },
        expected: JSON.stringify({ message: 'message', error: 'error' }),
      },
    ];

    cases.forEach((tc) => {
      it(tc.name, () => {
        expect(errorMessage(tc.input)).to.eql(tc.expected);
      });
    });
  });
});
