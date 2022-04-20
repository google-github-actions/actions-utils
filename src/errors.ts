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
 * errorMessage extracts the error message from the given error. It does this
 * via best effort and makes the error embeddable in other errors. It discards
 * any error details including stacktraces.
 *
 * @param err Error input.
 *
 * @return Error information as a string.
 */
export function errorMessage(err: unknown): string {
  let msgText: string;
  if (err === null) {
    msgText = 'null';
  } else if (err === undefined || typeof err === 'undefined') {
    msgText = 'undefined';
  } else if (typeof err === 'bigint' || err instanceof BigInt) {
    msgText = err.toString();
  } else if (typeof err === 'boolean' || err instanceof Boolean) {
    msgText = err.toString();
  } else if (err instanceof Error) {
    msgText = err.message;
  } else if (typeof err === 'function' || err instanceof Function) {
    msgText = errorMessage(err());
  } else if (typeof err === 'number' || err instanceof Number) {
    msgText = err.toString();
  } else if (typeof err === 'string' || err instanceof String) {
    msgText = err.toString();
  } else if (typeof err === 'symbol' || err instanceof Symbol) {
    msgText = err.toString();
  } else if (typeof err === 'object' || err instanceof Object) {
    msgText = JSON.stringify(err);
  } else {
    msgText = String(`[${typeof err}] ${err}`);
  }

  const msg = msgText.trim().replace('Error: ', '').trim();
  if (!msg) return '';

  // If the first letter is a capital letter and the second letter is not a
  // capital letter, downcase the first letter.
  if (msg.length > 1 && isUpper(msg[0]) && !isUpper(msg[1])) {
    return msg[0].toLowerCase() + msg.slice(1);
  }

  // If we got this far, it means the message has less than two characters or
  // there are multiple capital letters (e.g. ERRNOFILE).
  return msg;
}

/**
 * isNotFoundError determines if the given error is "not found". Since there's
 * literally no way to actually do this in Node, it inspects the string output
 * for "ENOENT".
 *
 * @param err The error result to check.
 *
 * @return Boolean, true if the error represents NotFound, false otherwise.
 */
export function isNotFoundError(err: unknown): boolean {
  const msg = errorMessage(err);
  return msg.toUpperCase().includes('ENOENT');
}

/**
 * isUpper returns true if the given string is uppercase.
 *
 * @param str String or character to check.
 *
 * @return True if the input is uppercase, false otherwise.
 */
function isUpper(str: string): boolean {
  return str === str.toUpperCase();
}
