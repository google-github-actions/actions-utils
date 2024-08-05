/**
 * toBase64 base64 encodes the input as URL-encoded, unpadded.
 *
 * @param input String or Buffer to encode as base64.
 *
 * @return URL-encoded, unpadded base64 string.
 */
export declare function toBase64(input: string | Buffer): string;
/**
 * fromBase64 base64 decodes the input, handling URL vs standard encoding and
 * padded vs unpadded. This should only be used to decode string values - the
 * return result is a string and therefore this will not work with binary data.
 *
 * @param input Base64-encoded string.
 *
 * @return Decoded string.
 */
export declare function fromBase64(input: string): string;
