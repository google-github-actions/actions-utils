/*
 * Copyright 2025 Google LLC
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

import { describe, test } from 'node:test';
import assert from 'node:assert/strict';

import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { actionsGenReadme } from '../src/actions-gen-readme';
import { writeSecureFile } from '../src/fs';

describe('actions-gen-readme', { concurrency: true }, async () => {
  test('#actionsGenReadme', async (suite) => {
    let scratchDir = '';

    // Ignore warnings and log messages in test output
    suite.mock.method(console, 'log', () => {});
    suite.mock.method(console, 'warn', () => {});

    suite.beforeEach(async () => {
      scratchDir = await fs.mkdtemp(path.join(os.tmpdir(), 'actions-gen-readme-'));
    });

    suite.afterEach(async () => {
      if (scratchDir) {
        // For some unknown reason, Windows will sometimes fail these tests. To
        // make things less flakey, retry.
        for (let i = 0; i < 5; i++) {
          try {
            await fs.rm(scratchDir, { recursive: true, force: true });
          } catch {
            await new Promise((r) => setTimeout(r, i * 500));
          }
        }
      }
    });

    const cases = [
      {
        name: 'input missing description',
        error: 'Input "foo" is missing a description',
        actionYAML: `
          name: 'my-action'
          inputs:
            foo:
              required: true
        `,
      },
      {
        name: 'output missing description',
        error: 'Output "foo" is missing a description',
        actionYAML: `
          name: 'my-action'
          outputs:
            foo:
        `,
      },
      {
        name: 'generates',
        actionYAML: `
          name: 'my-action'
          inputs:
            foo:
              description: |-
                This is the description of foo.
              default: '55'
              required: true
          outputs:
            foo:
              description: |-
                The space between.
        `,
        expectedReadme: `
          ## Inputs
          <!-- BEGIN_AUTOGEN_INPUTS -->

          -   <a name="__input_foo"></a><a href="#user-content-__input_foo"><code>foo</code></a>: _(Required, default: \`55\`)_ This is the description of foo.


          <!-- END_AUTOGEN_INPUTS -->

          ## Outputs
          <!-- BEGIN_AUTOGEN_OUTPUTS -->

          -   <a name="__output_foo"></a><a href="#user-content-__output_foo"><code>foo</code></a>: The space between.


          <!-- END_AUTOGEN_OUTPUTS -->
        `,
      },
    ];

    for await (const tc of cases) {
      await suite.test(tc.name, async () => {
        const readmePath = path.join(scratchDir, 'README.md');
        await writeSecureFile(
          readmePath,
          trimLeft(
            `
          ## Inputs
          <!-- BEGIN_AUTOGEN_INPUTS -->
          <!-- END_AUTOGEN_INPUTS -->

          ## Outputs
          <!-- BEGIN_AUTOGEN_OUTPUTS -->
          <!-- END_AUTOGEN_OUTPUTS -->
        `,
            10,
          ),
        );

        // Create the yaml contents
        if (tc.actionYAML) {
          await writeSecureFile(path.join(scratchDir, 'action.yml'), trimLeft(tc.actionYAML, 10));
        }

        if (tc.error) {
          await assert.rejects(async () => {
            await actionsGenReadme(scratchDir);
          }, new RegExp(tc.error));
        } else {
          // Success output
          await actionsGenReadme(scratchDir);

          const readmeContents = await fs.readFile(readmePath, { encoding: 'utf8' });
          const expectedReadme = trimLeft(tc.expectedReadme || '', 10);
          assert.equal(readmeContents, expectedReadme);
        }
      });
    }
  });
});

function trimLeft(s: string, align: number): string {
  return s
    .split('\n')
    .map((l) => l.slice(align))
    .join('\n')
    .trim();
}
