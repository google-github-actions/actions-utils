/**
 * parseDuration parses a user-supplied string duration with optional suffix and
 * returns a number representing the number of seconds. It returns 0 when given
 * the empty string.
 *
 * @param input Duration string
 */
export declare function parseDuration(input: string): number;
/**
 * sleep waits for a specified duration in milliseconds as a promise.
 *
 * @param ms Duration in milliseconds to sleep.
 */
export declare function sleep(ms?: number): Promise<void>;
