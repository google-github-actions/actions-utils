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

import { inParallel } from '../src/parallel';

describe('parallel', { concurrency: true }, async () => {
  test('#inParallel', async (suite) => {
    await suite.test('executes tasks in parallel', async () => {
      const task = async (a: number): Promise<number> => {
        await new Promise((resolve) => setTimeout(resolve, a * 10));
        return a;
      };

      const start = Date.now();

      const tasks = [6, 9, 3, 3, 1, 1, 1].map((x) => async (): Promise<number> => {
        return await task(x);
      });
      const result = await inParallel(tasks, 3);

      const duration = Date.now() - start;

      assert.deepStrictEqual(result, [6, 9, 3, 3, 1, 1, 1]);

      // Ideally this would be exactly 100 (array.pop() is from the end):
      // - [1,1,1] execute in parallel for 10
      // - [3,3,9] execute in parallel for 30
      // - [9(-3),6] execute in parallel for 60
      //
      // However, there's a 100% buffer since other operations could cause some
      // latency (cough OSX). If there was no parallelization, this would be at
      // least 240.
      const expected = 200;
      assert.ok(duration < expected, `expected ${duration} to be less than ${expected}`);
    });

    await suite.test('uses a default concurrency', async () => {
      // Just check type signature
      await inParallel([async () => {}]);
    });
  });
});
