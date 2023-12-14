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

import { withRetries } from '../src/retry';

describe('retry', { concurrency: true }, async () => {
  test('#withRetries', async (suite) => {
    const cases = [
      {
        name: 'uses defaults',
        input: { retries: 1 },
        expCalls: 2,
        expDuration: [100, 200],
      },
      {
        name: 'success',
        input: { retries: 5, backoff: 100 },
        expCalls: 6,
        expDuration: [1200, 1500],
      },
      {
        name: 'negative retries',
        input: { retries: -1, backoff: 100 },
        expCalls: 1,
        expDuration: [0, 50],
      },
      {
        name: 'zero retries',
        input: { retries: 0, backoff: 100 },
        expCalls: 1,
        expDuration: [0, 50],
      },
      {
        name: 'one retry',
        input: { retries: 1, backoff: 100 },
        expCalls: 2,
        expDuration: [100, 300],
      },
      {
        name: 'negative backoff',
        input: { retries: 1, backoff: -100 },
        expCalls: 2,
        expDuration: [0, 150],
      },
      {
        name: 'zero backoff',
        input: { retries: 4, backoff: 0 },
        expCalls: 5,
        expDuration: [0, 150],
      },
      {
        name: 'limits backoff',
        input: { retries: 4, backoff: 100, backoffLimit: 50 },
        expCalls: 5,
        expDuration: [200, 400],
      },
      {
        name: 'negative backoff limit',
        input: { retries: 4, backoff: 100, backoffLimit: -500 },
        expCalls: 5,
        expDuration: [0, 200],
      },
      {
        name: 'zero backoff limit',
        input: { retries: 4, backoff: 100, backoffLimit: 0 },
        expCalls: 5,
        expDuration: [0, 200],
      },
      {
        name: 'end in failure',
        input: { retries: 3, backoff: 500 },
        error: 'retry function failed after 4 attempts: failed!',
        expCalls: 4,
        expDuration: [2000, 2300],
      },
    ];

    for await (const tc of cases) {
      await suite.test(tc.name, async () => {
        if (tc.error) {
          let start = 0;
          let count = 0;
          try {
            const fn = async () => {
              count++;
              throw new Error('failed!');
            };

            const run = withRetries(fn, tc.input);

            start = new Date().getTime();
            await run();
          } catch (e: unknown) {
            const end = new Date().getTime();

            assert.deepStrictEqual((e as Error).message, tc.error);
            assert.deepStrictEqual(count, tc.expCalls);
            if (tc.expDuration) {
              const diff = end - start;
              assert.ok(diff >= tc.expDuration[0]);
              assert.ok(diff <= tc.expDuration[1]);
            }
          }
        } else {
          let count = 0;
          const fn = async () => {
            count++;
            if (count < tc.input.retries + 1) {
              throw new Error('failed!');
            }
          };

          const run = withRetries(fn, tc.input);

          const start = new Date().getTime();
          await run();
          const end = new Date().getTime();

          assert.deepStrictEqual(count, tc.expCalls);
          if (tc.expDuration) {
            const diff = end - start;
            assert.ok(diff >= tc.expDuration[0]);
            assert.ok(diff <= tc.expDuration[1]);
          }
        }
      });
    }
  });
});
