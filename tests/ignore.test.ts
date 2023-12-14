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

import { promises as fs } from 'fs';
import { tmpdir } from 'os';
import { join as pathjoin } from 'path';

import { forceRemove, writeSecureFile } from '../src/fs';
import { randomFilepath, randomFilename } from '../src/random';

import { parseGcloudIgnore } from '../src/ignore';

describe('ignore', { concurrency: true }, async () => {
  let dir: string;

  test('#parseGcloudIgnore', async (suite) => {
    const cases = [
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

    suite.beforeEach(async () => {
      dir = pathjoin(tmpdir(), randomFilename());
      await fs.mkdir(dir, { recursive: true });
    });

    suite.afterEach(async () => {
      await forceRemove(dir);
    });

    for await (const tc of cases) {
      await suite.test(tc.name, async () => {
        const pth = randomFilepath(dir);
        if (tc.contents) {
          await writeSecureFile(pth, tc.contents);
        }

        if (tc.extraContents) {
          await writeSecureFile(pathjoin(dir, '.gitignore'), tc.extraContents);
        }

        const result = await parseGcloudIgnore(pth);
        assert.deepStrictEqual(result, tc.expected);
      });
    }
  });
});
