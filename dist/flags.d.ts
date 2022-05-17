/**
 * parseFlags takes an input string and parses it as posix-compliant flags.
 *
 * @param input Flag string input.
 * @return Array of strings in the order in which they were defined as flags.
 */
export declare function parseFlags(input: string): string[];
/**
 * readUntil reads up to and including the given character and returns the
 * result. It ignores escaped versions of the character if they are preceeded by
 * with "\". If ch is not found, it returns null.
 *
 * This is a utility function, but it is exported for testing.
 *
 * @param input The input string.
 * @param ch The character to search.
 *
 * @return the string up to and including the search character, or null if no
 * match is found.
 */
export declare function readUntil(input: string, ch: string): string | null;
