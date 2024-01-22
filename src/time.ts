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
 * parseDuration parses a user-supplied string duration with optional suffix and
 * returns a number representing the number of seconds. It returns 0 when given
 * the empty string.
 *
 * @param input Duration string
 */
export function parseDuration(input: string): number {
  input = (input || '').trim();
  if (!input) {
    return 0;
  }

  let total = 0;
  let curr = '';
  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    switch (ch) {
      case ' ':
        continue;
      case ',':
        continue;
      case 's': {
        total += +curr;
        curr = '';
        break;
      }
      case 'm': {
        total += +curr * 60;
        curr = '';
        break;
      }
      case 'h': {
        total += +curr * 60 * 60;
        curr = '';
        break;
      }

      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        curr += ch;
        break;
      default:
        throw new SyntaxError(`Unsupported character "${ch}" at position ${i}`);
    }
  }

  // Anything left over is seconds
  if (curr) {
    total += +curr;
  }

  return total;
}

/**
 * sleep waits for a specified duration in milliseconds as a promise.
 *
 * @param ms Duration in milliseconds to sleep.
 */
export async function sleep(ms = 0): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
