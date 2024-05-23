/**
 * toEnum converts the input value to the best enum value. If no enum value
 * exists, it throws an error.
 *
 * @param e Enum to check against.
 * @param s String to enumerize.
 * @returns string
 */
export declare function toEnum<E extends Record<string, string>>(e: E, s: string): E[keyof E];
