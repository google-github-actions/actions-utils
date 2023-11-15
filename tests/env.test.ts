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

import { describe, it } from 'node:test';
import assert from 'node:assert';

import { deepClone } from '../src/clone';

import { stubEnv, ProcessEnv } from '../src/env';

describe('env', () => {
  describe('#stubEnv', () => {
    const cases: {
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
      it(tc.name, async () => {
        const original = deepClone(tc.existing);
        const restore = stubEnv(tc.input, tc.existing);
        assert.deepStrictEqual(tc.existing, tc.expected);

        restore();
        assert.deepStrictEqual(tc.existing, original);
      });
    });

    it('works with process.env', async () => {
      process.env.FOO = 'original';
      const restore = stubEnv({ FOO: 'bar', ZIP: 'zap' });
      assert.deepStrictEqual(process.env.FOO, 'bar');
      assert.deepStrictEqual(process.env.ZIP, 'zap');

      restore();
      assert.deepStrictEqual(process.env.FOO, 'original');
      assert.deepStrictEqual(process.env.ZIP, undefined);
    });
  });
});
