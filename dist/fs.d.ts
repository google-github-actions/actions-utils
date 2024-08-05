import { PathLike, ObjectEncodingOptions, Mode, OpenMode } from 'fs';
/**
 * forceRemove forcibly removes a file or directory (recursively). If the file
 * or directory does not exist, it does nothing. This is functionally equivalent
 * to fs.rm, but avoids the need to handle errors for when the target file or
 * directory does not exist.
 *
 * @param pth Path to the file or directory to remove.
 */
export declare function forceRemove(pth: PathLike): Promise<void>;
/**
 * isEmptyDir returns true if the given directory does not exist, or exists but
 * contains no files. It also returns true if the current user does not have
 * permission to read the directory, since it is effectively empty from the
 * viewpoint of the caller.
 *
 * @param dir Path to a directory.
 */
export declare function isEmptyDir(dir: PathLike): Promise<boolean>;
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
export declare function writeSecureFile<T extends PathLike>(outputPath: T, data: string | Buffer, options?: ObjectEncodingOptions & {
    mode?: Mode;
    flag?: OpenMode;
    flush?: boolean;
}): Promise<T>;
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
export declare function removeFile(filePath: PathLike): Promise<boolean>;
