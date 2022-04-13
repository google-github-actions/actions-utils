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

import { parseFlags } from '../src/flags';

describe('#parseFlags', () => {
  const cases: {
    only?: boolean;
    name: string;
    input: string;
    exp: string[];
  }[] = [
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
  ];

  cases.forEach((tc) => {
    const fn = tc.only ? it.only : it;
    fn(tc.name, () => {
      const result = parseFlags(tc.input);
      expect(result).to.eql(tc.exp);
    });
  });
});
