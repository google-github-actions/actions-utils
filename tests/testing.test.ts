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

import { afterEach, describe, test } from 'node:test';
import assert from 'node:assert/strict';

import { setInput, setInputs, clearInputs, clearEnv } from '../src/testing';

describe('testing', { concurrency: true }, async () => {
  afterEach(async () => {
    clearInputs();
  });

  test('#setInput', async (suite) => {
    await suite.test('sets a single input', async () => {
      setInput('foo', 'bar');
      assert.deepStrictEqual(process.env['INPUT_FOO'], 'bar');
    });

    await suite.test('sets an input with special characters', async () => {
      setInput('apple pie', 'bar');
      assert.deepStrictEqual(process.env['INPUT_APPLE_PIE'], 'bar');
    });
  });

  test('#setInputs', async (suite) => {
    await suite.test('sets multiple inputs', async () => {
      setInputs({
        foo: 'bar',
        zip: 'zap',
      });
      assert.deepStrictEqual(process.env['INPUT_FOO'], 'bar');
      assert.deepStrictEqual(process.env['INPUT_ZIP'], 'zap');
    });
  });

  test('#clearInputs', async (suite) => {
    await suite.test('clears inputs', async () => {
      process.env['INPUT_A'] = 'foo';
      process.env['INPUT_B'] = 'foo';
      process.env['NOT_INPUT_C'] = 'foo';

      clearInputs();

      assert.deepStrictEqual(process.env['INPUT_A'], undefined);
      assert.deepStrictEqual(process.env['INPUT_B'], undefined);
      assert.deepStrictEqual(process.env['NOT_INPUT_C'], 'foo');
    });
  });

  test('#clearEnv', async (suite) => {
    await suite.test('clears matching inputs', async () => {
      process.env['INPUT_A'] = 'foo';
      process.env['INPUT_B'] = 'bar';
      process.env['NOT_INPUT_C'] = 'foo';

      clearEnv((key, value) => {
        return key.startsWith('NOT_') || value === 'bar';
      });

      assert.deepStrictEqual(process.env['INPUT_A'], 'foo');
      assert.deepStrictEqual(process.env['INPUT_B'], undefined);
      assert.deepStrictEqual(process.env['NOT_INPUT_C'], undefined);
    });
  });
});
