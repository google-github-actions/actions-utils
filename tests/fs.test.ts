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

import 'mocha';
import { expect } from 'chai';

import { tmpdir } from 'os';

import { promises as fs } from 'fs';
import { constants as fsconstants } from 'fs';
import { randomFilepath } from '../src/random';
import { errorMessage, isNotFoundError } from '../src/errors';

import { isEmptyDir, forceRemove, removeFile, writeSecureFile } from '../src/fs';

describe('fs', () => {
  describe('#forceRemove', () => {
    it('deletes a file', async () => {
      const filepath = randomFilepath();
      await fs.writeFile(filepath, 'my data');
      await forceRemove(filepath);

      try {
        await fs.access(filepath, fsconstants.F_OK);
        throw new Error(`expected error to be thrown`);
      } catch (err) {
        const msg = errorMessage(err);
        expect(msg).to.include('ENOENT');
      }
    });

    it('does nothing when a file does not exist', async () => {
      const filepath = '/not/a/file.txt';
      await forceRemove(filepath);
    });

    it('does nothing when a directory does not exist', async () => {
      const filepath = '/not/a/file/directory';
      await forceRemove(filepath);
    });
  });

  describe('#isEmptyDir', async () => {
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

    cases.forEach((tc) => {
      it(tc.name, async () => {
        const isEmpty = await isEmptyDir(tc.dir);
        expect(isEmpty).to.eq(tc.exp);
      });
    });
  });

  describe('#removeFile', () => {
    it('deletes the file', async () => {
      const filepath = randomFilepath();
      await fs.writeFile(filepath, 'my data');
      const deleted = await removeFile(filepath);
      expect(deleted).to.be.true;

      try {
        await fs.access(filepath, fsconstants.F_OK);
        throw new Error(`expected error to be thrown`);
      } catch (err) {
        expect(`${err}`).to.include('ENOENT');
      }
    });

    it('does nothing when the file does not exist', async () => {
      const filepath = '/not/a/file';
      const deleted = await removeFile(filepath);
      expect(deleted).to.be.false;
    });
  });

  describe('#writeSecureFile', () => {
    it('writes a file', async () => {
      const filepath = randomFilepath();
      const result = await writeSecureFile(filepath, 'my data');
      expect(filepath).to.eq(result);

      const accessed = await fs.readFile(filepath, 'utf8');
      expect(accessed).to.eq('my data');
    });
  });
});
