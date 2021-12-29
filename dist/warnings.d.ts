/**
 * isPinnedToHead is a boolean which returns true if the given GitHub action is
 * pinned to HEAD ("master" or "main"), false otherwise.
 *
 * @return boolean indicating whether the action is pinned to HEAD.
 */
export declare function isPinnedToHead(): boolean;
/**
 * pinnedToHeadWarning builds a message you can use to emit a consistent warning
 * about an action being pinned to HEAD. It extracts the action name and
 * reference from the environment and returns the compiled string.
 *
 * Note it does not actually emit the warning, it just constructs a warning
 * string.
 *
 * @param recommended String value for the recommended pinned version (e.g.
 * "v0")
 *
 * @return String warning message.
 */
export declare function pinnedToHeadWarning(recommended: string): string;
