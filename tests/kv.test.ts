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

import { describe, test } from 'node:test';
import assert from 'node:assert/strict';

import { promises as fs } from 'fs';
import { randomFilepath } from '../src/random';

import {
  joinKVString,
  joinKVStringForGCloud,
  parseKVString,
  parseKVFile,
  parseKVJSON,
  parseKVYAML,
  parseKVStringAndFile,
  KVPair,
} from '../src/kv';

describe('kv', { concurrency: true }, async () => {
  test('#joinKVString', async (suite) => {
    const cases = [
      {
        name: 'empty',
        input: {},
        expected: '',
      },
      {
        name: 'single entry',
        input: { FOO: 'bar' },
        expected: 'FOO=bar',
      },
      {
        name: 'multiple entries',
        input: { FOO: 'bar', ZIP: 'zap', BIZ: 'baz' },
        expected: 'FOO=bar,ZIP=zap,BIZ=baz',
      },
      {
        name: 'empty values',
        input: { FOO: '', ZIP: 'zap' },
        expected: 'FOO=,ZIP=zap',
      },
      {
        name: 'whitespace',
        input: { FOO: '   ', ZIP: 'zap\n' },
        expected: 'FOO=   ,ZIP=zap\n',
      },
    ];

    for await (const tc of cases) {
      await suite.test(tc.name, async () => {
        const actual = joinKVString(tc.input as KVPair);
        assert.deepStrictEqual(actual, tc.expected);
      });
    }
  });

  test('#joinKVStringForGCloud', async (suite) => {
    const cases = [
      {
        name: 'empty',
        input: {},
        expected: '',
      },
      {
        name: 'single entry',
        input: { FOO: 'bar' },
        expected: '^,^FOO=bar',
      },
      {
        name: 'value ends with delim',
        input: { HELLO: 'world,', GOODBYE: 'mars' },
        expected: '^.^HELLO=world,.GOODBYE=mars',
      },
      {
        name: 'iterates',
        input: { HELLO: ',.!@#$%&*()' },
        expected: '^_^HELLO=,.!@#$%&*()',
      },
    ];

    for await (const tc of cases) {
      await suite.test(tc.name, async () => {
        const actual = joinKVStringForGCloud(tc.input as KVPair);
        assert.deepStrictEqual(actual, tc.expected);
      });
    }
  });

  test('#parseKVString', async (suite) => {
    const cases = [
      {
        name: 'empty string',
        input: '',
        expected: undefined,
      },
      {
        name: 'braces',
        input: '{}',
        expected: {},
      },
      {
        name: 'no value',
        input: 'FOO',
        expected: { FOO: '' },
      },
      {
        name: 'empty value',
        input: 'FOO=',
        expected: { FOO: '' },
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
        input: '  FOO= bar, ZIP= zap ',
        expected: { FOO: 'bar', ZIP: 'zap' },
      },
      {
        name: 'returns empty for {}',
        input: '  {} ',
        expected: {},
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
        name: 'multiline trailing commas',
        input: `
          FOO=bar,
          ZIP=zap,
          BAZ=bam
        `,
        expected: { FOO: 'bar', ZIP: 'zap', BAZ: 'bam' },
      },
      {
        name: 'multiline escaped',
        input: `
          FOO=bar\\\nbaz
        `,
        expected: { FOO: 'bar\nbaz' },
      },
      {
        name: 'certificate',
        input: `
          FOO=-----BEGIN PRIVATE KEY-----\\\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDRJRbmz9Qi7or8\\\nG342x0t5eILuU/DmDz/K+aF+HCmKpiNMM3VVXop5r70jtuDwTg2Hj4Wq+/VUFy9m\\\n7N2c6NcjhekEZZbtGBoaiddffX7S54Y5La4ynJooLwkHm2mLp2et5gIjhwHiRvXa\\\nftyRyC/83GkAjs88l5eGxNE=\\\n-----END PRIVATE KEY-----
        `,
        expected: {
          FOO: `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDRJRbmz9Qi7or8
G342x0t5eILuU/DmDz/K+aF+HCmKpiNMM3VVXop5r70jtuDwTg2Hj4Wq+/VUFy9m
7N2c6NcjhekEZZbtGBoaiddffX7S54Y5La4ynJooLwkHm2mLp2et5gIjhwHiRvXa
ftyRyC/83GkAjs88l5eGxNE=
-----END PRIVATE KEY-----`,
        },
      },
      {
        name: 'escaped comma key',
        input: String.raw`FOO\,BAR=baz,ZIP=zap`,
        expected: { 'FOO,BAR': 'baz', 'ZIP': 'zap' },
      },
      {
        name: 'double escaped comma key',
        input: String.raw`FOO\\\,BAR=baz,ZIP=zap`,
        expected: { [String.raw`FOO\,BAR`]: 'baz', ZIP: 'zap' },
      },
      {
        name: 'escaped slash key',
        input: String.raw`FOO\\BAR=baz,ZIP=zap`,
        expected: { [String.raw`FOO\BAR`]: 'baz', ZIP: 'zap' },
      },
      {
        name: 'escaped comma value',
        input: 'FOO=bar\\,baz,ZIP=zap',
        expected: { FOO: 'bar,baz', ZIP: 'zap' },
      },
      {
        name: 'double escaped comma value',
        input: String.raw`FOO=bar\\\,baz,ZIP=zap`,
        expected: { FOO: String.raw`bar\,baz`, ZIP: 'zap' },
      },
      {
        name: 'escaped slash value',
        input: String.raw`FOO=BAR\\baz,ZIP=zap`,
        expected: { FOO: String.raw`BAR\baz`, ZIP: 'zap' },
      },
      {
        name: 'missing key',
        input: '=bar',
        error: 'Invalid start sequence for value',
      },
    ];

    for await (const tc of cases) {
      await suite.test(tc.name, async () => {
        if (tc.expected) {
          const actual = parseKVString(tc.input);
          assert.deepStrictEqual(actual, tc.expected);
        } else if (tc.error) {
          await assert.rejects(async () => {
            parseKVString(tc.input);
          }, new RegExp(tc.error));
        }
      });
    }
  });

  test('#parseKVJSON', async (suite) => {
    const cases = [
      {
        name: 'empty string',
        input: '',
        expected: undefined,
      },
      {
        name: 'braces',
        input: '{}',
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

    for await (const tc of cases) {
      await suite.test(tc.name, async () => {
        if (tc.expected) {
          const actual = parseKVJSON(tc.input);
          assert.deepStrictEqual(actual, tc.expected);
        } else if (tc.error) {
          await assert.rejects(async () => {
            parseKVJSON(tc.input);
          }, new RegExp(tc.error));
        }
      });
    }
  });

  test('#parseKVYAML', async (suite) => {
    const cases = [
      {
        name: 'empty string',
        input: '',
        expected: undefined,
      },
      {
        name: 'braces',
        input: '{}',
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

    for await (const tc of cases) {
      await suite.test(tc.name, async () => {
        if (tc.expected) {
          const actual = parseKVYAML(tc.input);
          assert.deepStrictEqual(actual, tc.expected);
        } else if (tc.error) {
          await assert.rejects(async () => {
            parseKVYAML(tc.input);
          }, new RegExp(tc.error));
        }
      });
    }
  });

  test('#parseKVFile', async (suite) => {
    await suite.test('reads the file as json', async () => {
      const filepath = randomFilepath();
      await fs.writeFile(filepath, `{"FOO": "bar", "ZIP": "zap"}`);

      const result = parseKVFile(filepath);
      assert.deepStrictEqual(result, { FOO: 'bar', ZIP: 'zap' });
    });

    await suite.test('reads the file as key=value lines', async () => {
      const filepath = randomFilepath();
      await fs.writeFile(filepath, `FOO=bar\nZIP=zap`);

      const result = parseKVFile(filepath);
      assert.deepStrictEqual(result, { FOO: 'bar', ZIP: 'zap' });
    });

    await suite.test('reads the file as yaml', async () => {
      const filepath = randomFilepath();
      await fs.writeFile(filepath, `FOO: 'bar'\nZIP: 'zap'`);

      const result = parseKVFile(filepath);
      assert.deepStrictEqual(result, { FOO: 'bar', ZIP: 'zap' });
    });

    await suite.test('throws an error when the file does not exist', async () => {
      await assert.rejects(async () => {
        parseKVFile('/path/that/definitely/does/not/exist');
      }, /failed to read file/i);
    });
  });

  test('#parseKVStringAndFile', async (suite) => {
    const cases = [
      {
        name: 'undefined kvstring and kvfile',
        kvString: undefined,
        kvFileContents: undefined,
        expected: undefined,
      },
      {
        name: 'empty kvstring and kvfile',
        kvString: '',
        kvFileContents: '',
        expected: undefined,
      },
      {
        name: 'braces kvstring and undefined kvfile',
        kvString: '{}',
        kvFileContents: undefined,
        expected: {},
      },
      {
        name: 'undefined kvstring and braces kvfile',
        kvString: undefined,
        kvFileContents: '{}',
        expected: {},
      },
      {
        name: 'braces kvstring and braces kvfile',
        kvString: '{}',
        kvFileContents: '{}',
        expected: {},
      },
      {
        name: 'partial kvstring and braces kvfile',
        kvString: 'FOO=bar',
        kvFileContents: '{}',
        expected: { FOO: 'bar' },
      },
      {
        name: 'braces kvstring and partial kvfile',
        kvString: '{}',
        kvFileContents: 'FOO=bar',
        expected: { FOO: 'bar' },
      },
      {
        name: 'merges with kvstring taking precedence',
        kvString: 'FOO=bar',
        kvFileContents: 'FOO=zap,ZIP=zap',
        expected: { FOO: 'bar', ZIP: 'zap' },
      },
    ];

    for await (const tc of cases) {
      await suite.test(tc.name, async () => {
        let kvFile = '';
        if (tc.kvFileContents !== undefined) {
          kvFile = randomFilepath();
          await fs.writeFile(kvFile, tc.kvFileContents);
        }

        const result = parseKVStringAndFile(tc.kvString, kvFile);
        assert.deepStrictEqual(result, tc.expected);
      });
    }
  });
});
