/*
 * Copyright 2022 Google LLC
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

import 'mocha';
import { expect } from 'chai';

import { setInput, setInputs, clearInputs, clearEnv } from '../src/testing';

describe('testing', () => {
  afterEach(() => {
    clearInputs();
  });

  describe('#setInput', () => {
    it('sets a single input', () => {
      setInput('foo', 'bar');
      expect(process.env['INPUT_FOO']).to.eql('bar');
    });

    it('sets an input with special characters', () => {
      setInput('apple pie', 'bar');
      expect(process.env['INPUT_APPLE_PIE']).to.eql('bar');
    });
  });

  describe('#setInputs', () => {
    it('sets multiple inputs', () => {
      setInputs({
        foo: 'bar',
        zip: 'zap',
      });
      expect(process.env['INPUT_FOO']).to.eql('bar');
      expect(process.env['INPUT_ZIP']).to.eql('zap');
    });
  });

  describe('#clearInputs', () => {
    it('clears inputs', () => {
      process.env['INPUT_A'] = 'foo';
      process.env['INPUT_B'] = 'foo';
      process.env['NOT_INPUT_C'] = 'foo';

      clearInputs();

      expect(process.env['INPUT_A']).to.eql(undefined);
      expect(process.env['INPUT_B']).to.eql(undefined);
      expect(process.env['NOT_INPUT_C']).to.eql('foo');
    });
  });

  describe('#clearEnv', () => {
    it('clears matching inputs', () => {
      process.env['INPUT_A'] = 'foo';
      process.env['INPUT_B'] = 'bar';
      process.env['NOT_INPUT_C'] = 'foo';

      clearEnv((key, value) => {
        return key.startsWith('NOT_') || value === 'bar';
      });

      expect(process.env['INPUT_A']).to.eql('foo');
      expect(process.env['INPUT_B']).to.eql(undefined);
      expect(process.env['NOT_INPUT_C']).to.eql(undefined);
    });
  });
});
