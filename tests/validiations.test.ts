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

import { allOf, exactlyOneOf, presence } from '../src/validations';

describe('validations', () => {
  describe('#presence', () => {
    const cases = [
      {
        name: 'null',
        input: null,
        expected: undefined,
      },
      {
        name: 'undefined',
        input: undefined,
        expected: undefined,
      },
      {
        name: 'empty string',
        input: '',
        expected: undefined,
      },
      {
        name: 'string spaces',
        input: '   ',
        expected: undefined,
      },
      {
        name: 'value',
        input: 'value',
        expected: 'value',
      },
      {
        name: 'trims',
        input: '  value  ',
        expected: 'value',
      },
    ];

    cases.forEach((tc) => {
      it(tc.name, () => {
        expect(presence(tc.input)).to.eql(tc.expected);
      });
    });
  });

  describe('#exactlyOneOf', () => {
    const cases = [
      {
        name: 'null',
        input: [null],
        expected: false,
      },
      {
        name: 'undefined',
        input: [undefined],
        expected: false,
      },
      {
        name: 'empty string',
        input: [''],
        expected: false,
      },
      {
        name: 'trifecta',
        input: [null, undefined, ''],
        expected: false,
      },
      {
        name: 'no values',
        input: [],
        expected: false,
      },
      {
        name: 'single value',
        input: ['value'],
        expected: true,
      },
      {
        name: 'multiple values only one',
        input: ['', 'value', '', false],
        expected: true,
      },
      {
        name: 'multiple values more than one',
        input: ['', 'value', '', true],
        expected: false,
      },
    ];

    cases.forEach((tc) => {
      it(tc.name, () => {
        expect(exactlyOneOf(...tc.input)).to.eql(tc.expected);
      });
    });
  });

  describe('#allOf', () => {
    const cases = [
      {
        name: 'null',
        input: [null],
        expected: false,
      },
      {
        name: 'undefined',
        input: [undefined],
        expected: false,
      },
      {
        name: 'empty string',
        input: [''],
        expected: false,
      },
      {
        name: 'trifecta',
        input: [null, undefined, ''],
        expected: false,
      },
      {
        name: 'no values',
        input: [],
        expected: true,
      },
      {
        name: 'single value',
        input: ['value'],
        expected: true,
      },
      {
        name: 'multiple values only one',
        input: ['', 'value', '', false],
        expected: false,
      },
      {
        name: 'multiple values all',
        input: ['this', 'value', 'is', true],
        expected: true,
      },
    ];

    cases.forEach((tc) => {
      it(tc.name, () => {
        expect(allOf(...tc.input)).to.eql(tc.expected);
      });
    });
  });
});
