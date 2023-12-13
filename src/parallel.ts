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

import { cpus as oscpus } from 'os';

import { errorMessage } from './errors';

/**
 * inParallel executes the given function in parallel, up to max concurrency.
 * There are no guarantees on the order in which promises start.
 *
 * @param tasks The tasks to invoke, must be async.
 * @param concurrency Optional configuration.
 *
 * @return Array of results in the order of args.
 */
export async function inParallel<F extends () => Promise<Awaited<R>>, R extends ReturnType<F>>(
  tasks: (() => Promise<R> | Promise<R>)[],
  concurrency: number | undefined,
): Promise<R[]> {
  // Concurrency is the minimum of the number of arguments or concurrency. This
  // prevents additional undefined entries in the results array.
  concurrency = Math.min(concurrency || oscpus().length - 1);
  if (concurrency < 1) {
    throw new Error(`concurrency must be at least 1`);
  }

  const results: R[] = [];
  const errors: string[] = [];

  const runTasks = async (iter: IterableIterator<[number, () => Promise<R> | Promise<R>]>) => {
    for (const [idx, task] of iter) {
      try {
        results[idx] = await task();
      } catch (err) {
        errors.push(errorMessage(err));
      }
    }
  };

  const workers = new Array(concurrency).fill(tasks.entries()).map(runTasks);
  await Promise.allSettled(workers);

  if (errors.length > 0) {
    throw new Error(errors.join('\n'));
  }

  return results;
}
