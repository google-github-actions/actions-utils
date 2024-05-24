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

import { promises as fs, PathLike, ObjectEncodingOptions, Mode, OpenMode } from 'fs';

import { errorMessage, isNotFoundError } from './errors';

/**
 * forceRemove forcibly removes a file or directory (recursively). If the file
 * or directory does not exist, it does nothing. This is functionally equivalent
 * to fs.rm, but avoids the need to handle errors for when the target file or
 * directory does not exist.
 *
 * @param pth Path to the file or directory to remove.
 */
export async function forceRemove(pth: PathLike): Promise<void> {
  try {
    await fs.rm(pth, { force: true, recursive: true });
  } catch (err: unknown) {
    if (!isNotFoundError(err)) {
      const msg = errorMessage(err);
      throw new Error(`Failed to remove "${pth}": ${msg}`);
    }
  }
}

/**
 * isEmptyDir returns true if the given directory does not exist, or exists but
 * contains no files. It also returns true if the current user does not have
 * permission to read the directory, since it is effectively empty from the
 * viewpoint of the caller.
 *
 * @param dir Path to a directory.
 */
export async function isEmptyDir(dir: PathLike): Promise<boolean> {
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
 * @param outputPath Path in which to create the secure file.
 * @param data Data to write to file.
 * @param options additional options to pass to writeFile. The default options
 * are permissions of 0640, write-exclusive, and flush-on-success.
 *
 * @returns Path to written file.
 */
export async function writeSecureFile<T extends PathLike>(
  outputPath: T,
  data: string | Buffer,
  options?: ObjectEncodingOptions & {
    mode?: Mode;
    flag?: OpenMode;
    flush?: boolean;
  },
): Promise<T> {
  const opts = Object.assign({}, { mode: 0o640, flag: 'wx', flush: true }, options);
  await fs.writeFile(outputPath, data, opts);
  return outputPath;
}

/**
 * removeFile removes the file at the given path. If the file does not exist, it
 * does nothing.
 *
 * @param filePath Path of the file on disk to delete.
 *
 * @returns A boolean, true if the file was deleted, false otherwise.
 *
 * @deprecated Use #forceRemove instead.
 */
export async function removeFile(filePath: PathLike): Promise<boolean> {
  try {
    await fs.unlink(filePath);
    return true;
  } catch (err) {
    if (isNotFoundError(err)) {
      return false;
    }

    const msg = errorMessage(err);
    throw new Error(`Failed to remove "${filePath}": ${msg}`);
  }
}
