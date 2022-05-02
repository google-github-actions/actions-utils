/**
 * deepClone builds a deep copy (clone) of the given input. By default, it uses
 * structuredClone if defined. Otherwise, it uses v8 to serialize and
 * deserialize the input.
 *
 * @param input Object to deep clone.
 * @param useStructuredClone Use structuredClone method (defaults to true).
 * @return Deep copy of input.
 */
export declare function deepClone<T>(input: T, useStructuredClone?: boolean): T;
