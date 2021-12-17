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

import { join as pathjoin } from 'path';
import { randomBytes } from 'crypto';
import { tmpdir } from 'os';

/**
 * randomFilename creates a cryptographically random name suitable for use as a
 * filename. It does not create the file.
 *
 * @param length Optional length of the filename to create. By default, this
 * creates a filename with 96 bits of entropy to minimize probability of
 * exceeding Windows filepaths lengths.
 *
 * @return Name of the file.
 */
export function randomFilename(length = 12): string {
  return randomBytes(length).toString('hex');
}

/**
 * randomFilepath creates a cryptographically random filename inside the given
 * parent. If no parent is given, it defaults to os.tmpdir(). It does not create
 * the file.
 *
 * @param parent Optional parent directory for the filepath. If not given,
 * os.tmpdir() is used.
 * @param length Optional length of the filename to create. By default, this
 * creates a filename with 96 bits of entropy to minimize probability of
 * exceeding Windows filepaths lengths.
 *
 * @return Full file path.
 */
export function randomFilepath(parent = tmpdir(), length = 12): string {
  return pathjoin(parent, randomFilename(length));
}

export default { randomFilename, randomFilepath };
