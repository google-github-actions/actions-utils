/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * toBase64 base64 encodes the input as URL-encoded, unpadded.
 *
 * @param input String or Buffer to encode as base64.
 *
 * @return URL-encoded, unpadded base64 string.
 */
export function toBase64(input: string | Buffer): string {
  return Buffer.from(input)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * fromBase64 base64 decodes the input, handling URL vs standard encoding and
 * padded vs unpadded. This should only be used to decode string values - the
 * return result is a string and therefore this will not work with binary data.
 *
 * @param input Base64-encoded string.
 *
 * @return Decoded string.
 */
export function fromBase64(input: string): string {
  let str = input.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  return Buffer.from(str, 'base64').toString('utf8');
}
