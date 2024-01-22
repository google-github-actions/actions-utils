/**
 * RetryOptions are the config options for the withRetry function.
 */
export interface RetryOptions {
    /**
     * retries is the number of _retries_ not the number of attempts. The number
     * of attempts will be retries + 1. This must be zero or a positive number.
     */
    retries: number;
    /**
     * backoff is the starting backoff time, in milliseconds.
     */
    backoff?: number;
    /**
     * backoffLimit is the maximum backoff time, in milliseconds.
     */
    backoffLimit?: number;
}
/**
 * withRetry implements a retry mechanism with fibonacci backoff
 *
 * @param fn A function to retry on failure
 * @param opts The retry options
 * @returns fn. A function to start the retry process as a promise
 * @throws {Error}
 */
export declare function withRetries<T>(fn: () => Promise<T>, opts: RetryOptions): () => Promise<T>;
