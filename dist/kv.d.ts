/**
 * KVPair represents a key=value pair of strings.
 */
export type KVPair = Record<string, string>;
/**
 * joinKVString joins the given KVPair using the provided separator.
 *
 * @param input KVPair to serialize.
 * @param separator Join separator.
 */
export declare function joinKVString(input: KVPair, separator?: string): string;
/**
 * joinKVStringForGCloud creates a string suitable for using with gcloud by
 * choosing a custom escape delimiter sequence that does not exist in the input
 * string.
 *
 * @param input KVPair to serialize.
 */
export declare function joinKVStringForGCloud(input: KVPair): string;
/**
 * parseKVString parses a string of the format "KEY1=VALUE1,KEY2=VALUE2" or
 * "KEY1=VALUE1\nKEY2=VALUE2". Keys or values that contain a separator must be
 * escaped with a backslash ("\,", "\\n"). All leading and trailing whitespace
 * is trimmed.
 *
 * @param input String with key/value pairs to parse.
 */
export declare function parseKVString(input: string): KVPair;
/**
 * Read and parse an env var file. If the file contents begin with a curly
 * brace, the content is assumed to be JSON and is parsed as JSON. Otherwise,
 * the contents are parsed as a subset of YAML.
 *
 * @param filePath Path to the file on disk to parse.
 */
export declare function parseKVFile(filePath: string): KVPair;
/**
 * parseKVJSON parses the given string as a set of key=value pairs expressed as
 * JSON. If the input is not valid JSON, it errors. If the keys and values are
 * not both string types, it errors. Entries are returned in the order in which
 * they appeared in the JSON input.
 *
 * This is mostly exposed for testing. Callers should probably use #parseKVFile
 * instead.
 *
 * @param str JSON string to parse.
 *
 * @return List of key=value pairs.
 */
export declare function parseKVJSON(str: string): KVPair;
/**
 * Read and parse contents of the string as YAML. This is mostly just exposed
 * for testing.
 *
 * @param str YAML content to parse as K=V pairs.
 */
export declare function parseKVYAML(str: string): KVPair;
/**
 * parseKVStringAndFile parses the given KV string and KV file, merging the
 * results (with kvString taking precedence).
 *
 * @param kvString String of KEY=VALUE pairs.
 * @param kvFilePath Path on disk to a YAML file of KEY: VALUE pairs.
 */
export declare function parseKVStringAndFile(kvString?: string, kvFilePath?: string): KVPair;
