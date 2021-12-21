/**
 * presence takes the given string and converts it to undefined iff it's null,
 * undefined, or the empty string. Otherwise, it returns the trimmed string.
 *
 * @param input The string to check.
 *
 * @return The trimmed string or undefined.
 */
export declare function presence(input: string | null | undefined): string | undefined;
/**
 * exactlyOneOf iterates over the inputs and ensures one and only one of the
 * elements is truthy. If more than one element is truthy, it returns false. If
 * no elements are truthy, it returns false.
 *
 * @param inputs Arbitrary list of inputs.
 *
 * @return Boolean indicating whether exactly one element was truthy.
 */
export declare function exactlyOneOf(...inputs: any[]): boolean;
/**
 * allOf iterates over the inputs and ensures all of the elements are truthy. If
 * any elements are falsey, it returns false. If no inputs are given, the result
 * is true.
 *
 * @param inputs Arbitrary list of inputs.
 *
 * @return Boolean indicating whether all elements were truthy.
 */
export declare function allOf(...inputs: any[]): boolean;
