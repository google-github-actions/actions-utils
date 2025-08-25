#!/usr/bin/env node

/*
 * Copyright 2024 Google LLC
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

import { readFile, writeFile } from 'fs/promises';
import * as YAML from 'yaml';

type CommonOption = {
  required: boolean;
  description?: string;
};

type InputOption = CommonOption & {
  default: string;
};

type OutputOption = CommonOption & {};

type Branding = {
  icon: string;
  color: string;
};

type ActionYML = {
  name: string;
  description: string;
  inputs?: Record<string, InputOption>;
  outputs?: Record<string, OutputOption | undefined>;
  branding?: Branding;
};

/**
 * actionsGenReadme parses the action.yml file and auto-generates README.md
 * inputs and outputs in a consistent format.
 */
export async function actionsGenReadme(dir = '') {
  // For testing
  if (dir) {
    process.chdir(dir);
  }

  const readmeContents = (await readFile('README.md', 'utf8')).split('\n');

  const actionContents = await readFile('action.yml', 'utf8');
  const action = YAML.parse(actionContents) as ActionYML;

  const actionInputs = Object.entries(action.inputs || {});
  if (actionInputs.length === 0) console.warn(`action.yml inputs are empty`);
  const inputs = [];
  for (const [input, opts] of actionInputs) {
    const required = opts.required ? 'Required' : 'Optional';
    const description = (opts.description || '')
      .split('\n')
      .map((line) => (line.trim() === '' ? '' : `    ${line}`))
      .join('\n')
      .trim();
    if (description === '') {
      throw new Error(`Input "${input}" is missing a description`);
    }
    const def = opts.default ? `, default: \`${opts.default}\`` : '';
    inputs.push(
      `-   <a name="__input_${input}"></a><a href="#user-content-__input_${input}"><code>${input}</code></a>: _(${required}${def})_ ${description}\n`,
    );
  }
  const startInputs = readmeContents.indexOf('<!-- BEGIN_AUTOGEN_INPUTS -->');
  const endInputs = readmeContents.indexOf('<!-- END_AUTOGEN_INPUTS -->');
  readmeContents.splice(startInputs + 1, endInputs - startInputs - 1, '', ...inputs, '');

  const actionOutputs = Object.entries(action.outputs || {});
  if (actionOutputs.length === 0) console.warn(`action.yml outputs are empty`);
  const outputs = [];
  for (const [output, opts] of actionOutputs) {
    const description = (opts?.description || '')
      .split('\n')
      .map((line) => (line.trim() === '' ? '' : `    ${line}`))
      .join('\n')
      .trim();
    if (description === '') {
      throw new Error(`Output "${output}" is missing a description`);
    }
    outputs.push(
      `-   <a name="__output_${output}"></a><a href="#user-content-__output_${output}"><code>${output}</code></a>: ${description}\n`,
    );
  }
  const startOutputs = readmeContents.indexOf('<!-- BEGIN_AUTOGEN_OUTPUTS -->');
  const endOutputs = readmeContents.indexOf('<!-- END_AUTOGEN_OUTPUTS -->');
  readmeContents.splice(startOutputs + 1, endOutputs - startOutputs - 1, '', ...outputs, '');

  await writeFile('README.md', readmeContents.join('\n'), 'utf8');
}
