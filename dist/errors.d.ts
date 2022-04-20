/**
 * errorMessage extracts the error message from the given error. It does this
 * via best effort and makes the error embeddable in other errors. It discards
 * any error details including stacktraces.
 *
 * @param err Error input.
 *
 * @return Error information as a string.
 */
export declare function errorMessage(err: unknown): string;
/**
 * isNotFoundError determines if the given error is "not found". Since there's
 * literally no way to actually do this in Node, it inspects the string output
 * for "ENOENT".
 *
 * @param err The error result to check.
 *
 * @return Boolean, true if the error represents NotFound, false otherwise.
 */
export declare function isNotFoundError(err: unknown): boolean;
