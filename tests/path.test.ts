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

import * as path from 'path';

import { toPlatformPath, toPosixPath, toWin32Path } from '../src/path';

describe('#toPosixPath', () => {
  const cases: {
    only?: boolean;
    name: string;
    input: string;
    expected: string;
  }[] = [
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

  cases.forEach((tc) => {
    const fn = tc.only ? it.only : it;
    fn(tc.name, () => {
      const result = toPosixPath(tc.input);
      expect(result).to.eql(tc.expected);
    });
  });
});

describe('#toWin32Path', () => {
  const cases: {
    only?: boolean;
    name: string;
    input: string;
    expected: string;
  }[] = [
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

  cases.forEach((tc) => {
    const fn = tc.only ? it.only : it;
    fn(tc.name, () => {
      const result = toWin32Path(tc.input);
      expect(result).to.eql(tc.expected);
    });
  });
});

describe('#toPlatformPath', () => {
  const cases: {
    only?: boolean;
    name: string;
    input: string;
    expected: string;
  }[] = [
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

  cases.forEach((tc) => {
    const fn = tc.only ? it.only : it;
    fn(tc.name, () => {
      const result = toPlatformPath(tc.input);
      expect(result).to.eql(tc.expected);
    });
  });
});
