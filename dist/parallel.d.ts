/**
 * inParallel executes the given function in parallel, up to max concurrency.
 * There are no guarantees on the order in which promises start.
 *
 * @param tasks The tasks to invoke, must be async.
 * @param concurrency Optional configuration.
 *
 * @return Array of results in the order of args.
 */
export declare function inParallel<F extends () => Promise<Awaited<R>>, R extends ReturnType<F>>(tasks: (() => Promise<R> | Promise<R>)[], concurrency?: number): Promise<R[]>;
