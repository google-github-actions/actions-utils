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

import { tmpdir } from 'os';

import { promises as fs } from 'fs';
import { constants as fsconstants } from 'fs';
import { randomFilepath } from '../src/random';

import { isEmptyDir, forceRemove, removeFile, writeSecureFile } from '../src/fs';

describe('fs', { concurrency: true }, async () => {
  test('#forceRemove', async (suite) => {
    await suite.test('deletes a file', async () => {
      const filepath = randomFilepath();
      await fs.writeFile(filepath, 'my data');
      await forceRemove(filepath);

      await assert.rejects(async () => {
        await fs.access(filepath, fsconstants.F_OK);
      }, /ENOENT/);
    });

    await suite.test('does nothing when a file does not exist', async () => {
      const filepath = '/not/a/file.txt';
      assert.doesNotReject(async () => {
        await forceRemove(filepath);
      });
    });

    await suite.test('does nothing when a directory does not exist', async () => {
      const filepath = '/not/a/file/directory';
      assert.doesNotReject(async () => {
        await forceRemove(filepath);
      });
    });
  });

  test('#isEmptyDir', async (suite) => {
    const cases = [
      {
        name: 'non-existent dir',
        dir: '/this/path/definitely/does/not/exist',
        exp: true,
      },
      {
        name: 'exists',
        dir: tmpdir(),
        exp: false,
      },
    ];

    for await (const tc of cases) {
      await suite.test(tc.name, async () => {
        const isEmpty = await isEmptyDir(tc.dir);
        assert.deepStrictEqual(isEmpty, tc.exp);
      });
    }
  });

  test('#removeFile', async (suite) => {
    await suite.test('deletes the file', async () => {
      const filepath = randomFilepath();
      await fs.writeFile(filepath, 'my data');
      const deleted = await removeFile(filepath);
      assert.deepStrictEqual(deleted, true);

      await assert.rejects(async () => {
        await fs.access(filepath, fsconstants.F_OK);
      }, /ENOENT/);
    });

    await suite.test('does nothing when the file does not exist', async () => {
      const filepath = '/not/a/file';
      const deleted = await removeFile(filepath);
      assert.deepStrictEqual(deleted, false);
    });
  });

  test('#writeSecureFile', async (suite) => {
    await suite.test('writes a file', async () => {
      const filepath = randomFilepath();
      const result = await writeSecureFile(filepath, 'my data');
      assert.deepStrictEqual(filepath, result);

      const accessed = await fs.readFile(filepath, 'utf8');
      assert.deepStrictEqual(accessed, 'my data');

      if (process.platform !== 'win32') {
        const stats = await fs.stat(filepath);
        assert.deepStrictEqual(stats.mode.toString(8), '100640');
      }
    });

    await suite.test('writes a file with custom options', async () => {
      const filepath = randomFilepath();
      const result = await writeSecureFile(filepath, 'my data', {
        mode: 0o600,
        encoding: 'utf8',
      });
      assert.deepStrictEqual(filepath, result);

      const accessed = await fs.readFile(filepath, 'utf8');
      assert.deepStrictEqual(accessed, 'my data');

      if (process.platform !== 'win32') {
        const stats = await fs.stat(filepath);
        assert.deepStrictEqual(stats.mode.toString(8), '100600');
      }
    });
  });
});
