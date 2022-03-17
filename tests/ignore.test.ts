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

import { promises as fs } from 'fs';
import { tmpdir } from 'os';
import { join as pathjoin } from 'path';

import { errorMessage } from '../src/errors';
import { writeSecureFile } from '../src/fs';
import { randomFilepath, randomFilename } from '../src/random';

import { parseGcloudIgnore } from '../src/ignore';

describe('ignore', () => {
  describe('#parseGcloudIgnore', () => {
    const cases: {
      only?: boolean;
      name: string;
      contents?: string;
      extraContents?: string;
      expected: string[];
    }[] = [
      {
        name: 'non-existent file',
        contents: undefined,
        expected: [],
      },
      {
        name: 'empty file',
        contents: ``,
        expected: [],
      },
      {
        name: 'regular file',
        contents: `
          # This is a comment
          *.js

          # Ignore php
          *.php
        `,
        expected: ['*.js', '*.php'],
      },
      {
        name: 'included files',
        contents: `
          # This is a comment
          *.js

          # Ignore php
          *.php
          #!include: .gitignore
          /node_modules
          other_folder/
        `,
        extraContents: `
          .idea
        `,
        expected: ['*.js', '*.php', '.idea', '/node_modules', 'other_folder/'],
      },
    ];

    beforeEach(async function () {
      this.dir = pathjoin(tmpdir(), randomFilename());
      await fs.mkdir(this.dir, { recursive: true });
    });

    afterEach(async function () {
      try {
        await fs.rm(this.dir, { force: true, recursive: true });
      } catch (err) {
        if (!errorMessage(err).toUpperCase().includes('ENOENT')) {
          throw err;
        }
      }
    });

    cases.forEach((tc) => {
      const runTest = tc.only ? it.only : it;
      runTest(tc.name, async function () {
        const pth = randomFilepath(this.dir);
        if (tc.contents) {
          await writeSecureFile(pth, tc.contents);
        }

        if (tc.extraContents) {
          await writeSecureFile(pathjoin(this.dir, '.gitignore'), tc.extraContents);
        }

        const result = await parseGcloudIgnore(pth);
        expect(result).to.eql(tc.expected);
      });
    });
  });
});
