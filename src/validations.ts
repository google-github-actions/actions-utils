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

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * presence takes the given string and converts it to undefined iff it's null,
 * undefined, or the empty string. Otherwise, it returns the trimmed string.
 *
 * @param input The string to check.
 *
 * @return The trimmed string or undefined.
 */
export function presence(input: string | null | undefined): string | undefined {
  return (input || '').trim() || undefined;
}

/**
 * exactlyOneOf iterates over the inputs and ensures one and only one of the
 * elements is truthy. If more than one element is truthy, it returns false. If
 * no elements are truthy, it returns false.
 *
 * @param inputs Arbitrary list of inputs.
 *
 * @return Boolean indicating whether exactly one element was truthy.
 */
export function exactlyOneOf(...inputs: any[]): boolean {
  inputs = inputs || [];

  let foundOne = false;
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i]) {
      if (foundOne) {
        return false;
      } else {
        foundOne = true;
      }
    }
  }

  if (!foundOne) {
    return false;
  }

  return true;
}

/**
 * allOf iterates over the inputs and ensures all of the elements are truthy. If
 * any elements are falsey, it returns false. If no inputs are given, the result
 * is true.
 *
 * @param inputs Arbitrary list of inputs.
 *
 * @return Boolean indicating whether all elements were truthy.
 */
export function allOf(...inputs: any[]): boolean {
  inputs = inputs || [];

  for (let i = 0; i < inputs.length; i++) {
    if (!inputs[i]) return false;
  }

  return true;
}
