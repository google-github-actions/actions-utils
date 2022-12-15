/*
 * Copyright 2022 Google LLC
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

import { deepClone } from '../src/clone';

import { stubEnv, ProcessEnv } from '../src/env';

describe('env', () => {
  describe('#stubEnv', () => {
    const cases: {
      only?: boolean;
      name: string;
      existing: ProcessEnv;
      input: ProcessEnv;
      expected: ProcessEnv;
    }[] = [
      {
        name: 'sets',
        existing: {},
        input: {
          FOO: 'bar',
          ZIP: 'zap',
        },
        expected: {
          FOO: 'bar',
          ZIP: 'zap',
        },
      },
      {
        name: 'overwrites',
        existing: {
          FOO: 'bar',
        },
        input: {
          FOO: 'zap',
        },
        expected: {
          FOO: 'zap',
        },
      },
      {
        name: 'removes',
        existing: {
          FOO: 'bar',
        },
        input: {
          FOO: undefined,
        },
        expected: {},
      },
    ];

    cases.forEach((tc) => {
      const fn = tc.only ? it.only : it;
      fn(tc.name, () => {
        const original = deepClone(tc.existing);
        const restore = stubEnv(tc.input, tc.existing);
        expect(tc.existing).to.eql(tc.expected);

        restore();
        expect(tc.existing).to.eql(original);
      });
    });

    it('works with process.env', () => {
      process.env.FOO = 'original';
      const restore = stubEnv({ FOO: 'bar', ZIP: 'zap' });
      expect(process.env.FOO).to.eql('bar');
      expect(process.env.ZIP).to.eql('zap');

      restore();
      expect(process.env.FOO).to.eql('original');
      expect(process.env.ZIP).to.eql(undefined);
    });
  });
});
