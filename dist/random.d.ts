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
export declare function randomFilename(length?: number): string;
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
export declare function randomFilepath(parent?: string, length?: number): string;
declare const _default: {
    randomFilename: typeof randomFilename;
    randomFilepath: typeof randomFilepath;
};
export default _default;
