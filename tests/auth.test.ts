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

import { isExternalAccount, isServiceAccountKey, parseCredential } from '../src/auth';

describe('auth', { concurrency: true }, async () => {
  test('#parseCredential', async (suite) => {
    const cases = [
      {
        name: 'empty string',
        input: '',
        error: 'Missing service account key JSON',
      },
      {
        name: 'empty string trim',
        input: '   ',
        error: 'Missing service account key JSON',
      },
      {
        name: 'invalid json',
        input: `{"x}`,
        error: 'Failed to parse service account key JSON credentials',
      },
      {
        name: 'parses service account key json',
        input: `{"client_email": "foo@bar.com"}`,
        expected: {
          client_email: 'foo@bar.com',
        },
      },
      {
        name: 'parses base64 encoded service account key json',
        input: Buffer.from(`{"client_email": "foo@bar.com"}`).toString('base64'),
        expected: {
          client_email: 'foo@bar.com',
        },
      },
      {
        name: 'parses external account credentials',
        input: `{"credential_source": {"file": "/foo/bar"}}`,
        expected: {
          credential_source: {
            file: '/foo/bar',
          },
        },
      },
      {
        name: 'parses base64 encoded external account credentials',
        input: Buffer.from(`{"credential_source": {"file": "/foo/bar"}}`).toString('base64'),
        expected: {
          credential_source: {
            file: '/foo/bar',
          },
        },
      },
    ];

    for await (const tc of cases) {
      await suite.test(tc.name, async () => {
        if (tc.expected) {
          const actual = parseCredential(tc.input);
          assert.deepStrictEqual(actual, tc.expected);
        } else if (tc.error) {
          await assert.rejects(async () => {
            parseCredential(tc.input);
          }, new RegExp(tc.error));
        }
      });
    }
  });

  test('#isServiceAccountKey', async (suite) => {
    const cases = [
      {
        name: 'returns true for service account keys',
        input: `{"type": "service_account"}`,
        expected: true,
      },
      {
        name: 'returns false for account credentials',
        input: `{"type": "external_account"}`,
        expected: false,
      },
    ];

    for await (const tc of cases) {
      await suite.test(tc.name, async () => {
        const credential = parseCredential(tc.input);
        const actual = isServiceAccountKey(credential);
        assert.deepStrictEqual(actual, tc.expected);
      });
    }
  });

  test('#isExternalAccount', async (suite) => {
    const cases = [
      {
        name: 'returns true for account credentials',
        input: `{"type": "external_account"}`,
        expected: false,
      },
      {
        name: 'returns false for service account keys',
        input: `{"type": "service_account"}`,
        expected: true,
      },
    ];

    for await (const tc of cases) {
      await suite.test(tc.name, async () => {
        const credential = parseCredential(tc.input);
        const actual = isExternalAccount(credential);
        assert.deepStrictEqual(actual, tc.expected);
      });
    }
  });
});
