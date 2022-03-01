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

import { promises as fs } from 'fs';
import { randomFilepath } from '../src/random';

import {
  parseKVString,
  parseKVFile,
  parseKVJSON,
  parseKVYAML,
  parseKVStringAndFile,
} from '../src/kv';

describe('kv', () => {
  describe('#parseKVString', () => {
    const cases = [
      {
        name: 'empty string',
        input: '',
        expected: {},
      },
      {
        name: 'single value',
        input: 'FOO=bar',
        expected: { FOO: 'bar' },
      },
      {
        name: 'multi value',
        input: 'FOO=bar,ZIP=zap',
        expected: { FOO: 'bar', ZIP: 'zap' },
      },
      {
        name: 'value with equals',
        input: 'FOO=bar=baz',
        expected: { FOO: 'bar=baz' },
      },
      {
        name: 'value with many equals',
        input: 'FOO=bar=baz;zip=zap;zinc=atom',
        expected: { FOO: 'bar=baz;zip=zap;zinc=atom' },
      },
      {
        name: 'comma-separated value with many equals',
        input: 'FOO=bar=baz,ZIP=zap=flap==,ZINC=atom',
        expected: { FOO: 'bar=baz', ZIP: 'zap=flap==', ZINC: 'atom' },
      },
      {
        name: 'value with consecutive equals',
        input: 'FOO=bar==baz;zip===zap;zinc====atom',
        expected: { FOO: 'bar==baz;zip===zap;zinc====atom' },
      },
      {
        name: 'value with trailing equals',
        input: 'FOO=aGVsbG8gd29ybGQhCg==',
        expected: { FOO: 'aGVsbG8gd29ybGQhCg==' },
      },
      {
        name: 'trims',
        input: '  FOO= bar, ZIP=zap ',
        expected: { FOO: 'bar', ZIP: 'zap' },
      },
      {
        name: 'multiline',
        input: `
          FOO=bar
          ZIP=zap
        `,
        expected: { FOO: 'bar', ZIP: 'zap' },
      },
      {
        name: 'multiline escaped',
        input: `
          FOO=bar\\\nbaz
        `,
        expected: { FOO: 'bar\nbaz' },
      },
      {
        name: 'escaped comma key',
        input: 'FOO\\,BAR=baz,ZIP=zap',
        expected: { 'FOO,BAR': 'baz', 'ZIP': 'zap' },
      },
      {
        name: 'double escaped comma key',
        input: 'FOO\\\\,BAR=baz,ZIP=zap',
        expected: { 'FOO\\,BAR': 'baz', 'ZIP': 'zap' },
      },
      {
        name: 'escaped comma value',
        input: 'FOO=bar\\,baz,ZIP=zap',
        expected: { FOO: 'bar,baz', ZIP: 'zap' },
      },
      {
        name: 'double escaped comma value',
        input: 'FOO=bar\\\\,baz,ZIP=zap',
        expected: { FOO: 'bar\\,baz', ZIP: 'zap' },
      },
      {
        name: 'missing key',
        input: '=bar',
        error: 'Failed to parse',
      },
      {
        name: 'missing value',
        input: 'FOO=',
        error: 'Failed to parse',
      },
      {
        name: 'no equal',
        input: 'FOO',
        error: 'Failed to parse',
      },
    ];

    cases.forEach((tc) => {
      it(tc.name, () => {
        if (tc.expected) {
          expect(parseKVString(tc.input)).to.eql(tc.expected);
        } else if (tc.error) {
          expect(() => {
            parseKVString(tc.input);
          }).to.throw(tc.error);
        }
      });
    });
  });

  describe('#parseKVJSON', () => {
    const cases = [
      {
        name: 'empty string',
        input: '',
        expected: {},
      },
      {
        name: 'single value',
        input: `{"FOO": "bar"}`,
        expected: { FOO: 'bar' },
      },
      {
        name: 'multi value',
        input: `{"FOO": "bar", "ZIP": "zap"}`,
        expected: { FOO: 'bar', ZIP: 'zap' },
      },
      {
        name: 'no trims',
        input: `{"FOO": "bar  ", "ZIP" : "  zap"}`,
        expected: { FOO: 'bar  ', ZIP: '  zap' },
      },
      {
        name: 'not string value',
        input: `{"FOO": {"BAR": "baz"}}`,
        error: 'expected string, got object',
      },
    ];

    cases.forEach((tc) => {
      it(tc.name, () => {
        if (tc.expected) {
          expect(parseKVJSON(tc.input)).to.eql(tc.expected);
        } else if (tc.error) {
          expect(() => {
            parseKVJSON(tc.input);
          }).to.throw(tc.error);
        }
      });
    });
  });

  describe('#parseKVYAML', () => {
    const cases = [
      {
        name: 'empty string',
        input: '',
        expected: {},
      },
      {
        name: 'single value',
        input: `
          FOO: 'bar'
        `,
        expected: { FOO: 'bar' },
      },
      {
        name: 'multi value',
        input: `
          FOO: 'bar'
          ZIP: 'zap'
        `,
        expected: { FOO: 'bar', ZIP: 'zap' },
      },
      {
        name: 'trims',
        input: `
          FOO: 'bar  '
          ZIP : '  zap'
        `,
        expected: { FOO: 'bar', ZIP: 'zap' },
      },
      {
        name: 'not string value',
        input: `
          FOO:
            BAR: 'baz'
        `,
        error: 'must contain only KEY: VALUE strings',
      },
    ];

    cases.forEach((tc) => {
      it(tc.name, () => {
        if (tc.expected) {
          expect(parseKVYAML(tc.input)).to.eql(tc.expected);
        } else if (tc.error) {
          expect(() => {
            parseKVYAML(tc.input);
          }).to.throw(tc.error);
        }
      });
    });
  });

  describe('#parseKVFile', () => {
    it('reads the file as json', async () => {
      const filepath = randomFilepath();
      await fs.writeFile(filepath, `{"FOO": "bar"}`);

      const result = parseKVFile(filepath);
      expect(result).to.eql({ FOO: 'bar' });
    });

    it('reads the file as yaml', async () => {
      const filepath = randomFilepath();
      await fs.writeFile(filepath, `FOO: 'bar'`);

      const result = parseKVFile(filepath);
      expect(result).to.eql({ FOO: 'bar' });
    });

    it('throws an error when the file does not exist', () => {
      try {
        parseKVFile('/path/that/definitely/does/not/exist');
        throw new Error(`error should have been thrown`);
      } catch (err) {
        expect(`${err}`).to.include('Failed to read file');
      }
    });
  });

  describe('#parseKVStringAndFile', () => {
    it('handles null kvString and kvFilePath', () => {
      const kvString = '';
      const kvFile = '';

      const result = parseKVStringAndFile(kvString, kvFile);
      expect(result).to.eql({});
    });

    it('merges kvString and kvFile', async () => {
      const kvString = `FOO=other foo`;
      const kvFile = randomFilepath();
      await fs.writeFile(
        kvFile,
        `
        FOO: 'bar'
        ZIP: 'zap'
      `,
      );

      const result = parseKVStringAndFile(kvString, kvFile);
      expect(result).to.eql({ FOO: 'other foo', ZIP: 'zap' });
    });
  });
});
