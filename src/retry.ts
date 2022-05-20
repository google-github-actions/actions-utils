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

import { errorMessage as parseErrorMessage } from './errors';
import { sleep } from './time';

const DEFAULT_BACKOFF_MILLISECONDS = 100;

/**
 * RetryOptions are the config options for the withRetry function.
 */
export interface RetryOptions {
  /**
   * retries is the number of _retries_ not the number of attempts. The number
   * of attempts will be retries + 1. This must be zero or a positive number.
   */
  retries: number;

  /**
   * backoff is the starting backoff time, in milliseconds.
   */
  backoff?: number;

  /**
   * backoffLimit is the maximum backoff time, in milliseconds.
   */
  backoffLimit?: number;
}

/**
 * withRetry implements a retry mechanism with fibonacci backoff
 *
 * @param fn. A function to retry on failure
 * @param opts. The retry options
 * @returns fn. A function to start the retry process as a promise
 * @throws {Error}
 */
export function withRetries<T>(fn: () => Promise<T>, opts: RetryOptions): () => Promise<T> {
  const retries = opts.retries;
  const backoffLimit =
    typeof opts?.backoffLimit !== 'undefined' ? Math.max(opts.backoffLimit, 0) : undefined;

  // ensure backoff is limited to start
  let backoff = opts.backoff ?? DEFAULT_BACKOFF_MILLISECONDS;
  if (typeof backoffLimit !== 'undefined') {
    backoff = Math.min(backoff, backoffLimit);
  }

  return async function (): Promise<T> {
    let attemptLimit = retries + 1;
    let currentBackoff = backoff;
    const currentBackoffLimit = backoffLimit;
    let prevBackoff = 0;
    let errMessage = 'unknown';

    do {
      try {
        return await fn();
      } catch (err) {
        errMessage = parseErrorMessage(err);

        --attemptLimit;
        if (attemptLimit > 0) {
          await sleep(currentBackoff);

          let newBackoff = prevBackoff + currentBackoff;
          if (typeof currentBackoffLimit !== 'undefined') {
            newBackoff = Math.min(newBackoff, Number(currentBackoffLimit));
          }

          prevBackoff = currentBackoff;
          currentBackoff = newBackoff;
        }
      }
    } while (attemptLimit > 0);

    throw new Error(`retry function failed with ${opts.retries} attempts: ${errMessage}`);
  };
}
