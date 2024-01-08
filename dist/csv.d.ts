/**
 * parseCSV accepts a comma-separated list of items. Whitespace around entries
 * is removed.
 *
 * @param input String representing a list.
 *
 * @returns Array of strings, in the same order they were supplied.
 */
export declare function parseCSV(input: string): string[];
/**
 * parseMultilineCSV parses a CSV input where entries can be separated by
 * newlines. This is specific for GitHub Actions, since the YAML syntax does not
 * allow complex types, and sometimes splitting long entries over multiple lines
 * assists with readability.
 *
 * @param input String representing a comma-separated list
 *
 * @returns Array of strings, in the same order they were supplied.
 */
export declare function parseMultilineCSV(input: string): string[];
