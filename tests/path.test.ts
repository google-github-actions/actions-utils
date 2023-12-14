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

import { describe, test } from 'node:test';
import assert from 'node:assert/strict';

import * as path from 'path';

import { toPlatformPath, toPosixPath, toWin32Path } from '../src/path';

describe('path', { concurrency: true }, async () => {
  test('#toPosixPath', async (suite) => {
    const cases = [
      {
        name: 'empty string',
        input: '',
        expected: '',
      },
      {
        name: 'single value',
        input: 'foo',
        expected: 'foo',
      },
      {
        name: 'with posix relative',
        input: 'foo/bar/baz',
        expected: 'foo/bar/baz',
      },
      {
        name: 'with posix absolute',
        input: '/foo/bar/baz',
        expected: '/foo/bar/baz',
      },
      {
        name: 'with win32 relative',
        input: 'foo\\bar\\baz',
        expected: 'foo/bar/baz',
      },
      {
        name: 'with win32 absolute',
        input: '\\foo\\bar\\baz',
        expected: '/foo/bar/baz',
      },
      {
        name: 'with a mix',
        input: '\\foo/bar/baz',
        expected: '/foo/bar/baz',
      },
    ];

    for await (const tc of cases) {
      await suite.test(tc.name, async () => {
        const actual = toPosixPath(tc.input);
        assert.deepStrictEqual(actual, tc.expected);
      });
    }
  });

  test('#toWin32Path', async (suite) => {
    const cases = [
      {
        name: 'empty string',
        input: '',
        expected: '',
      },
      {
        name: 'single value',
        input: 'foo',
        expected: 'foo',
      },
      {
        name: 'with posix relative',
        input: 'foo/bar/baz',
        expected: 'foo\\bar\\baz',
      },
      {
        name: 'with posix absolute',
        input: '/foo/bar/baz',
        expected: '\\foo\\bar\\baz',
      },
      {
        name: 'with win32 relative',
        input: 'foo\\bar\\baz',
        expected: 'foo\\bar\\baz',
      },
      {
        name: 'with win32 absolute',
        input: '\\foo\\bar\\baz',
        expected: '\\foo\\bar\\baz',
      },
      {
        name: 'with a mix',
        input: '\\foo/bar\\baz',
        expected: '\\foo\\bar\\baz',
      },
    ];

    for await (const tc of cases) {
      await suite.test(tc.name, async () => {
        const actual = toWin32Path(tc.input);
        assert.deepStrictEqual(actual, tc.expected);
      });
    }
  });

  test('#toPlatformPath', async (suite) => {
    const cases = [
      {
        name: 'empty string',
        input: '',
        expected: '',
      },
      {
        name: 'single value',
        input: 'foo',
        expected: 'foo',
      },
      {
        name: 'with posix relative',
        input: 'foo/bar/baz',
        expected: path.join('foo', 'bar', 'baz'),
      },
      {
        name: 'with posix absolute',
        input: '/foo/bar/baz',
        expected: path.join(path.sep, 'foo', 'bar', 'baz'),
      },
      {
        name: 'with win32 relative',
        input: 'foo\\bar\\baz',
        expected: path.join('foo', 'bar', 'baz'),
      },
      {
        name: 'with win32 absolute',
        input: '\\foo\\bar\\baz',
        expected: path.join(path.sep, 'foo', 'bar', 'baz'),
      },
      {
        name: 'with a mix',
        input: '\\foo/bar\\baz',
        expected: path.join(path.sep, 'foo', 'bar', 'baz'),
      },
    ];

    for await (const tc of cases) {
      await suite.test(tc.name, async () => {
        const actual = toPlatformPath(tc.input);
        assert.deepStrictEqual(actual, tc.expected);
      });
    }
  });
});
