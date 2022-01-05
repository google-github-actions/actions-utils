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
 * isPinnedToHead is a boolean which returns true if the given GitHub action is
 * pinned to HEAD ("master" or "main"), false otherwise.
 *
 * @return boolean indicating whether the action is pinned to HEAD.
 */
export function isPinnedToHead(): boolean {
  const actionRef = process.env.GITHUB_ACTION_REF;
  return actionRef === 'master' || actionRef === 'main';
}

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
export function pinnedToHeadWarning(recommended: string): string {
  const actionRef = process.env.GITHUB_ACTION_REF;
  const actionRepo = process.env.GITHUB_ACTION_REPOSITORY;

  return (
    `${actionRepo} is pinned at "${actionRef}". We strongly advise against ` +
    `pinning to "@${actionRef}" as it may be unstable. Please update your ` +
    `GitHub Action YAML from:\n` +
    `\n` +
    `    uses: '${actionRepo}@${actionRef}'\n` +
    `\n` +
    `to:\n` +
    `\n` +
    `    uses: '${actionRepo}@${recommended}'\n` +
    `\n` +
    `Alternatively, you can pin to any git tag or git SHA in the repository.`
  );
}
