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

import { parseFlags, readUntil } from '../src/flags';

describe('flags', { concurrency: true }, async () => {
  test('#parseFlags', async (suite) => {
    const cases = [
      {
        name: `empty string`,
        input: ``,
        exp: [],
      },
      {
        name: `empty string spaces`,
        input: ``,
        exp: [],
      },
      {
        name: `empty string multi-lines`,
        input: `

      `,
        exp: [],
      },
      {
        name: `with equals`,
        input: `--foo=2 --bar=2Gi`,
        exp: [`--foo`, `2`, `--bar`, `2Gi`],
      },
      {
        name: `with spaces`,
        input: `--foo 2 --bar 2Gi`,
        exp: [`--foo`, `2`, `--bar`, `2Gi`],
      },
      {
        name: `with equals and spaces`,
        input: `--foo 2 --bar=2Gi`,
        exp: [`--foo`, `2`, `--bar`, `2Gi`],
      },
      {
        name: `with equals and double quotes`,
        input: `--bar="2Gi"`,
        exp: [`--bar`, `"2Gi"`],
      },
      {
        name: `with space and double quotes`,
        input: `--bar "2Gi"`,
        exp: [`--bar`, `"2Gi"`],
      },
      {
        name: `with equals and space and double quotes`,
        input: `--bar="2Gi" --foo "2"`,
        exp: [`--bar`, `"2Gi"`, `--foo`, `"2"`],
      },
      {
        name: `with equals and space and some double quotes`,
        input: `--foo 2 --bar="2Gi"`,
        exp: [`--foo`, `2`, `--bar`, `"2Gi"`],
      },
      {
        name: `with equals and single quotes`,
        input: `--bar='2Gi'`,
        exp: [`--bar`, `'2Gi'`],
      },
      {
        name: `with space and single quotes`,
        input: `--bar '2Gi'`,
        exp: [`--bar`, `'2Gi'`],
      },
      {
        name: `with equals and space and single quotes`,
        input: `--foo '2' --bar='2Gi'`,
        exp: [`--foo`, `'2'`, `--bar`, `'2Gi'`],
      },
      {
        name: `with equals and space and some single quotes`,
        input: `--foo 2 --bar='2Gi' `,
        exp: [`--foo`, `2`, `--bar`, `'2Gi'`],
      },
      {
        name: `with double and single quotes`,
        input: `--foo="2" --bar='2Gi'`,
        exp: [`--foo`, `"2"`, `--bar`, `'2Gi'`],
      },
      {
        name: 'with multi-line separators',
        input: `
        --foo 2
        --bar=2Gi
        --zip "zap"
      `,
        exp: [`--foo`, `2`, `--bar`, `2Gi`, `--zip`, `"zap"`],
      },
      {
        name: 'with subflags quoted',
        input: `--foo "--bar=1,--zip-zap"`,
        exp: [`--foo`, `"--bar=1,--zip-zap"`],
      },
      {
        name: 'with subflags equals',
        input: `--foo=--bar=1,--zip-zap`,
        exp: [`--foo`, `--bar=1,--zip-zap`],
      },
      {
        name: 'with subflags quoted subquoted',
        input: `--foo "--bar="1",--zip-zap"`,
        exp: [`--foo`, `"--bar="1",--zip-zap"`],
      },
      {
        name: 'with subflags equals subquoted',
        input: `--foo=--bar="1",--zip-zap`,
        exp: [`--foo`, `--bar="1",--zip-zap`],
      },
      {
        name: 'with kv',
        input: `--foo --env foo=bar,zip=zap`,
        exp: [`--foo`, `--env`, `foo=bar,zip=zap`],
      },
      {
        name: 'with kv equals',
        input: `--foo --env=foo=bar,zip=zap`,
        exp: [`--foo`, `--env`, `foo=bar,zip=zap`],
      },
      {
        name: 'with kv quote',
        input: `--foo --env "foo=bar,zip=zap"`,
        exp: [`--foo`, `--env`, `"foo=bar,zip=zap"`],
      },
      {
        name: 'with kv equals quote',
        input: `--foo --env="foo=bar,zip=zap"`,
        exp: [`--foo`, `--env`, `"foo=bar,zip=zap"`],
      },
    ];

    for await (const tc of cases) {
      await suite.test(tc.name, async () => {
        const result = parseFlags(tc.input);
        assert.deepStrictEqual(result, tc.exp);
      });
    }
  });

  test('#readUntil', async (suite) => {
    const cases = [
      {
        name: `empty string`,
        input: ``,
        ch: ``,
        exp: null,
      },
      {
        name: `ch`,
        input: `foo bar' baz`,
        ch: `'`,
        exp: `foo bar'`,
      },
      {
        name: `ch end`,
        input: `foo bar'`,
        ch: `'`,
        exp: `foo bar'`,
      },
      {
        name: `ch start`,
        input: `'foo bar`,
        ch: `'`,
        exp: `'`,
      },
      {
        name: `ch first`,
        input: `foo' 'bar'`,
        ch: `'`,
        exp: `foo'`,
      },
      {
        name: `ch escaped`,
        input: `foo\\' bar'`,
        ch: `'`,
        exp: `foo\\' bar'`,
      },
      {
        name: `not found`,
        input: `foo bar`,
        ch: `'`,
        exp: null,
      },
    ];

    for await (const tc of cases) {
      await suite.test(tc.name, async () => {
        const result = readUntil(tc.input, tc.ch);
        assert.deepStrictEqual(result, tc.exp);
      });
    }
  });
});
