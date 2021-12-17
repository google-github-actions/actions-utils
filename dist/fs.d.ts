/// <reference types="node" />
/**
 * writeSecureFile writes a file to disk with 0640 permissions and locks the
 * file during writing.
 *
 * @param outputPath Path in which to create random file in.
 * @param data Data to write to file.
 *
 * @returns Path to written file.
 */
export declare function writeSecureFile(outputPath: string, data: string | Buffer): Promise<string>;
/**
 * removeFile removes the file at the given path. If the file does not exist, it
 * does nothing.
 *
 * @param filePath Path of the file on disk to delete.
 *
 * @returns A boolean, true if the file was deleted, false otherwise.
 */
export declare function removeFile(filePath: string): Promise<boolean>;
