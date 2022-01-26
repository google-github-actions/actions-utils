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

import { promises as fs } from 'fs';

import { errorMessage } from './errors';

/**
 * isEmptyDir returns true if the given directory does not exist, or exists but
 * contains no files. It also returns true if the current user does not have
 * permission to read the directory, since it is effectively empty from the
 * viewpoint of the caller.
 *
 * @param dir Path to a directory.
 */
export async function isEmptyDir(dir: string): Promise<boolean> {
  try {
    const files = await fs.readdir(dir);
    return files.length <= 0;
  } catch (e) {
    return true;
  }
}

/**
 * writeSecureFile writes a file to disk with 0640 permissions and locks the
 * file during writing.
 *
 * @param outputPath Path in which to create random file in.
 * @param data Data to write to file.
 *
 * @returns Path to written file.
 */
export async function writeSecureFile(outputPath: string, data: string | Buffer): Promise<string> {
  await fs.writeFile(outputPath, data, { mode: 0o640, flag: 'wx' });
  return outputPath;
}

/**
 * removeFile removes the file at the given path. If the file does not exist, it
 * does nothing.
 *
 * @param filePath Path of the file on disk to delete.
 *
 * @returns A boolean, true if the file was deleted, false otherwise.
 */
export async function removeFile(filePath: string): Promise<boolean> {
  try {
    await fs.unlink(filePath);
    return true;
  } catch (err) {
    const msg = errorMessage(err);
    if (msg.toUpperCase().includes('ENOENT')) {
      return false;
    }

    throw new Error(`Failed to remove "${filePath}": ${msg}`);
  }
}
