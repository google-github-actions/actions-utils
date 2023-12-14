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

import { deepClone } from '../src/clone';

describe('clone', { concurrency: true }, async () => {
  test('#deepClone', async (suite) => {
    const cases = [
      {
        name: 'null',
        input: null,
        expected: null,
      },
      {
        name: 'undefined',
        input: undefined,
        expected: undefined,
      },
      {
        name: 'object',
        input: {},
        expected: {},
      },
      {
        name: 'deep_object',
        input: {
          foo: {
            bar: {
              baz: {},
            },
          },
        },
        expected: {
          foo: {
            bar: {
              baz: {},
            },
          },
        },
      },
    ];

    for await (const tc of cases) {
      await suite.test(tc.name, async () => {
        assert.deepStrictEqual(deepClone(tc.input, true), tc.expected);
        assert.deepStrictEqual(deepClone(tc.input, false), tc.expected);
      });
    }

    await suite.test('copies deeply nested fields with structuredClone', async () => {
      const input = { foo: { bar: 'baz' } };
      const copied = deepClone(input, true);
      copied.foo.bar = 'zoo';

      assert.deepStrictEqual(input, { foo: { bar: 'baz' } });
      assert.deepStrictEqual(copied, { foo: { bar: 'zoo' } });

      input.foo.bar = 'zap';
      assert.deepStrictEqual(input.foo.bar, 'zap');
      assert.deepStrictEqual(copied.foo.bar, 'zoo');
    });

    await suite.test('copies deeply nested fields without structuredClone', async () => {
      const input = { foo: { bar: 'baz' } };
      const copied = deepClone(input, false);
      copied.foo.bar = 'zoo';

      assert.deepStrictEqual(input, { foo: { bar: 'baz' } });
      assert.deepStrictEqual(copied, { foo: { bar: 'zoo' } });

      input.foo.bar = 'zap';
      assert.deepStrictEqual(input.foo.bar, 'zap');
      assert.deepStrictEqual(copied.foo.bar, 'zoo');
    });
  });
});
