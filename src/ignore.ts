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

import { promises as fs } from 'fs';
import { dirname, join as pathjoin } from 'path';

import { isNotFoundError } from './errors';

/**
 * parseGcloudIgnore parses a gcloud ignore at the given filepath. It follows
 * the parsing rules defined at
 * https://cloud.google.com/sdk/gcloud/reference/topic/gcloudignore, including
 * parsing any included files.
 *
 * @param pth Path to the gcloudignore file.
 * @return Ordered list of strings from the various ignore files.
 */
export async function parseGcloudIgnore(pth: string): Promise<string[]> {
  const parentDir = dirname(pth);

  let ignoreContents: string[] = [];
  try {
    ignoreContents = (await fs.readFile(pth, { encoding: 'utf-8' }))
      .toString()
      .split(/\r?\n/)
      .filter(shouldKeepIgnoreLine)
      .map((line) => line.trim());
  } catch (err) {
    if (!isNotFoundError(err)) {
      throw err;
    }
  }

  // Iterate through each line and parse any includes.
  for (let i = 0; i < ignoreContents.length; i++) {
    const line = ignoreContents[i];
    if (line.startsWith('#!include:')) {
      const includeName = line.substring(10).trim();

      const includePth = pathjoin(parentDir, includeName);
      const subIgnoreContents = (await fs.readFile(includePth, { encoding: 'utf-8' }))
        .toString()
        .split(/\r?\n/)
        .filter(shouldKeepIgnoreLine)
        .map((line) => line.trim());

      ignoreContents.splice(i, 1, ...subIgnoreContents);
      i += subIgnoreContents.length;
    }
  }

  return ignoreContents;
}

/**
 * shouldKeepIgnoreLine is a helper that returns true if the given line is not
 * blank or a comment.
 *
 * @param line The line to check.
 * @return boolean
 */
function shouldKeepIgnoreLine(line: string): boolean {
  const trimmed = (line || '').trim();
  if (trimmed === '') {
    return false;
  }

  if (trimmed.startsWith('#') && !trimmed.startsWith('#!')) {
    return false;
  }

  return true;
}
