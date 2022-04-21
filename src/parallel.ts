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

/**
 * InParallelOptions are optional input parameters to inParallel.
 */
export interface InParallelOptions {
  /**
   * concurrency controls the number of concurrent executions.
   */
  concurrency?: number;
}

/**
 * inParallel executes the given function in parallel, up to max concurrency.
 *
 * @param fn The function to invoke, must be async.
 * @param args An array of array of parameters to invoke fn.
 * @param opts Optional configuration.
 *
 * @return Array of results in the order of args.
 */
export async function inParallel<
  F extends (...args: any[]) => Promise<Awaited<R>>, // eslint-disable-line @typescript-eslint/no-explicit-any
  P extends Parameters<F>,
  R extends ReturnType<F>,
>(fn: F, args: P[], opts?: InParallelOptions): Promise<Awaited<R>[]> {
  // Concurrency is the minimum of the number of arguments or concurrency. This
  // prevents additional undefined entries in the results array.
  const concurrency = Math.min(opts?.concurrency || oscpus().length - 1);
  if (concurrency < 1) {
    throw new Error(`concurrency must be at least 1`);
  }

  // Convert inputs to keep track of indicies.
  const inputs = args.map((args, idx) => ({ args, idx }));
  const results: Awaited<R>[] = new Array(args.length);
  const promises = new Array(concurrency).fill(Promise.resolve());

  const sub = async (p: Promise<Awaited<R>>): Promise<Awaited<R>> => {
    const nextArgs = inputs.pop();
    if (nextArgs === undefined) {
      return p;
    }

    await p;
    const next = fn.apply(fn, nextArgs.args);
    next.then((r: Awaited<R>) => {
      results[nextArgs.idx] = r;
    });
    return sub(next);
  };

  await Promise.all(promises.map(sub));

  return results;
}
