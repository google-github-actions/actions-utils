/**
 * ProcessEnv is a wrapper that defines an environment structure.
 */
export type ProcessEnv = Record<string, string | undefined>;
/**
 * stubEnv accepts an input dictionary and sets the provided environment
 * variables in the current process environment. Values set to "undefined" are
 * deleted from the environment.
 *
 * The function is only safe for concurrent use if the target is safe for
 * concurrent use. The function itself provides no locking.
 *
 * @param input Map of string value pairs to set in the new environment.
 * @param target Target map to set and restore (defaults to `process.env`).
 *
 * @return Function that restores the environment.
 */
export declare function stubEnv(input: ProcessEnv, target?: ProcessEnv): () => void;
