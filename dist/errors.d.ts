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
