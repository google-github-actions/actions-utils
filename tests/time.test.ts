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

import { parseDuration, sleep } from '../src/time';

describe('time', () => {
  describe('#parseDuration', () => {
    const cases = [
      {
        name: 'empty string',
        input: '',
        expected: 0,
      },
      {
        name: 'unitless',
        input: '149585',
        expected: 149585,
      },
      {
        name: 'with commas',
        input: '149,585',
        expected: 149585,
      },
      {
        name: 'suffix seconds',
        input: '149585s',
        expected: 149585,
      },
      {
        name: 'suffix minutes',
        input: '25m',
        expected: 1500,
      },
      {
        name: 'suffix hours',
        input: '12h',
        expected: 43200,
      },
      {
        name: 'suffix hours minutes seconds',
        input: '12h10m55s',
        expected: 43855,
      },
      {
        name: 'commas and spaces',
        input: '12h, 10m 55s',
        expected: 43855,
      },
      {
        name: 'invalid',
        input: '12h blueberries',
        error: 'Unsupported character "b" at position 4',
      },
    ];

    cases.forEach((tc) => {
      it(tc.name, async () => {
        if (tc.expected) {
          expect(parseDuration(tc.input)).to.eq(tc.expected);
        } else if (tc.error) {
          expect(() => {
            parseDuration(tc.input);
          }).to.throw(tc.error);
        }
      });
    });
  });

  describe('#sleep', () => {
    const cases: {
      name: string;
      input: number | undefined;
      expMinDuration: number;
    }[] = [
      {
        name: 'undefined',
        input: undefined,
        expMinDuration: 0,
      },
      {
        name: 'zero',
        input: 0,
        expMinDuration: 0,
      },
      {
        name: 'negative',
        input: -100,
        expMinDuration: 0,
      },
      {
        name: '100 milliseconds',
        input: 100,
        expMinDuration: 0,
      },
      {
        name: '5 seconds',
        input: 5 * 1000,
        expMinDuration: 4.9,
      },
    ];

    cases.forEach((tc) => {
      it(tc.name, async () => {
        const start = new Date().getTime();
        await sleep(tc.input);
        const end = new Date().getTime();

        expect(end - start).to.be.greaterThanOrEqual(tc.expMinDuration);
      });
    });
  });
});
