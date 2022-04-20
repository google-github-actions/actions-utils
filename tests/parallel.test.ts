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

import { inParallel } from '../src/parallel';

describe('#inParallel', () => {
  it('executes tasks in parallel', async () => {
    const task = async (a: number): Promise<number> => {
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 100));
      return a;
    };
    const result = await inParallel(task, [[1], [3], [5], [7], [9], [11], [13]], {
      concurrency: 3,
    });
    expect(result).to.eql([1, 3, 5, 7, 9, 11, 13]);
  });
});
