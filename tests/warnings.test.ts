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

import { afterEach, describe, it } from 'node:test';
import assert from 'node:assert';

import { isPinnedToHead, pinnedToHeadWarning } from '../src/warnings';

describe('warnings', async () => {
  describe('#isPinnedToHead', async () => {
    afterEach(async () => {
      delete process.env.GITHUB_ACTION_REF;
    });

    const cases = [
      {
        name: 'undefined',
        ref: undefined,
        expected: false,
      },
      {
        name: 'master',
        ref: 'master',
        expected: true,
      },
      {
        name: 'main',
        ref: 'main',
        expected: true,
      },
      {
        name: 'v0',
        ref: 'v0',
        expected: false,
      },
    ];

    cases.forEach((tc) => {
      it(tc.name, async () => {
        process.env.GITHUB_ACTION_REF = tc.ref;
        const actual = isPinnedToHead();
        assert.deepStrictEqual(actual, tc.expected);
      });
    });
  });

  describe('#pinnedToHeadWarning', async () => {
    afterEach(async () => {
      delete process.env.GITHUB_ACTION_REF;
      delete process.env.GITHUB_ACTION_REPOSITORY;
    });

    it('builds a warning string', async () => {
      process.env.GITHUB_ACTION_REF = 'my-ref';
      process.env.GITHUB_ACTION_REPOSITORY = 'my-org/my-repo';

      const actual = pinnedToHeadWarning('v0');
      assert.match(actual, /my-org\/my-repo@my-ref/);
      assert.match(actual, /my-org\/my-repo@v0/);
    });
  });
});
