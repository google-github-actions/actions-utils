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
    const cases: {
      only?: boolean;
      name: string;
      input: unknown;
      expected: string;
    }[] = [
      {
        name: 'null',
        input: null,
        expected: 'null',
      },
      {
        name: 'undefined',
        input: undefined,
        expected: 'undefined',
      },

      // BigInt
      // disabled: TS2737
      // {
      //   name: 'bigint',
      //   input: 1242n,
      //   expected: '1242n',
      // },
      {
        name: 'bigint coerced',
        input: BigInt(Number.MAX_SAFE_INTEGER) * BigInt(2),
        expected: '18014398509481982',
      },

      // Boolean
      {
        name: 'boolean true',
        input: true,
        expected: 'true',
      },
      {
        name: 'boolean false',
        input: false,
        expected: 'false',
      },
      {
        name: 'boolean coerced true',
        input: Boolean(true),
        expected: 'true',
      },
      {
        name: 'boolean coerced false',
        input: Boolean(false),
        expected: 'false',
      },
      {
        name: 'boolean object true',
        input: new Boolean(true),
        expected: 'true',
      },
      {
        name: 'boolean object false',
        input: new Boolean(false),
        expected: 'false',
      },

      // Error
      {
        name: 'error coerced',
        input: Error('error'),
        expected: 'error',
      },
      {
        name: 'error object',
        input: new Error('error'),
        expected: 'error',
      },

      // Function
      {
        name: 'function',
        input: (): string => {
          return 'function';
        },
        expected: 'function',
      },
      {
        name: 'function coerced',
        input: Function(`return 'function';`),
        expected: 'function',
      },
      {
        name: 'function object',
        input: new Function(`return 'function';`),
        expected: 'function',
      },

      // Number
      {
        name: 'number',
        input: 12,
        expected: '12',
      },
      {
        name: 'number coerced',
        input: Number(12),
        expected: '12',
      },
      {
        name: 'number object',
        input: new Number(12),
        expected: '12',
      },

      // String
      {
        name: 'string',
        input: 'string',
        expected: 'string',
      },
      {
        name: 'string coerced',
        input: String('string'),
        expected: 'string',
      },
      {
        name: 'string object',
        input: new String('string'),
        expected: 'string',
      },

      // Symbol
      {
        name: 'symbol coerced',
        input: Symbol('symbol'),
        expected: 'symbol(symbol)',
      },

      // Object
      {
        name: 'object',
        input: { object: true },
        expected: '{"object":true}',
      },
      {
        name: 'object coerced',
        input: Object({ object: true }),
        expected: '{"object":true}',
      },
      {
        name: 'object object',
        input: new Object({ object: true }),
        expected: '{"object":true}',
      },

      // Validation and trimming
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
        name: 'error prefix',
        input: new Error('Error: failed'),
        expected: 'failed',
      },
    ];

    cases.forEach((tc) => {
      const fn = tc.only ? it.only : it;
      fn(tc.name, () => {
        expect(errorMessage(tc.input)).to.eql(tc.expected);
      });
    });
  });
});
