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

import { isPinnedToHead, pinnedToHeadWarning } from '../src/warnings';

describe('warnings', () => {
  describe('#isPinnedToHead', () => {
    afterEach(() => {
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
      it(tc.name, () => {
        process.env.GITHUB_ACTION_REF = tc.ref;
        expect(isPinnedToHead()).to.eql(tc.expected);
      });
    });
  });

  describe('#pinnedToHeadWarning', () => {
    afterEach(() => {
      delete process.env.GITHUB_ACTION_REF;
      delete process.env.GITHUB_ACTION_REPOSITORY;
    });

    it('builds a warning string', () => {
      process.env.GITHUB_ACTION_REF = 'my-ref';
      process.env.GITHUB_ACTION_REPOSITORY = 'my-org/my-repo';

      expect(pinnedToHeadWarning('v0')).to.include('my-org/my-repo@my-ref');
      expect(pinnedToHeadWarning('v0')).to.include('my-org/my-repo@v0');
    });
  });
});
