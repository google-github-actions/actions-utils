/**
 * InParallelOptions are optional input parameters to inParallel.
 */
export interface InParallelOptions {
    /**
     * concurrency controls the number of concurrent executions.
     */
    concurrency?: number;
}
/**
 * inParallel executes the given function in parallel, up to max concurrency.
 * There are no guarantees on the order in which promises start.
 *
 * @param fn The function to invoke, must be async.
 * @param args An array of array of parameters to invoke fn.
 * @param opts Optional configuration.
 *
 * @return Array of results in the order of args.
 */
export declare function inParallel<F extends (...args: any[]) => Promise<Awaited<R>>, // eslint-disable-line @typescript-eslint/no-explicit-any
P extends Parameters<F>, R extends ReturnType<F>>(fn: F, args: P[], opts?: InParallelOptions): Promise<Awaited<R>[]>;
