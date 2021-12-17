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

import 'mocha';
import { expect } from 'chai';

import { AddressInfo } from 'net';
import http from 'http';
import { createReadStream } from 'fs';

import { randomFilepath } from '../src/random';
import { removeFile, writeSecureFile } from '../src/fs';

import { request } from '../src/net';

describe('net', () => {
  describe('#request', async function () {
    this.timeout(2_000);

    const filename = randomFilepath();
    await writeSecureFile(filename, 'this is my data');

    beforeEach(async function () {
      const server = http.createServer();

      const address: string = await new Promise((resolve, reject) => {
        try {
          server.listen(0, '127.0.0.1', () => {
            const addr = server.address() as AddressInfo;
            if (!addr) return reject(`Address is null`);
            return resolve(`http://${addr.address}:${addr.port}`);
          });
        } catch (err) {
          reject(err);
        }
      });

      this.server = server;
      this.address = address;
    });

    afterEach(async function () {
      const server = this.server;
      if (!server) return;

      server.emit('close');
      await new Promise((resolve, reject) => {
        const t = setTimeout(() => reject(new Error('timeout')), 5_000);
        this.server.close(() => {
          clearTimeout(t);
          return resolve(true);
        });
      });
    });

    after(async function () {
      await removeFile(filename);
    });

    const cases = [
      {
        name: 'errors on 500',
        handler: ((req, res) => {
          res.writeHead(500);
          res.write('Internal server error');
          res.end();
        }) as http.RequestListener,
        error: 'Internal server error',
      },
      {
        name: 'errors on 400',
        handler: ((req, res) => {
          res.writeHead(400);
          res.end();
        }) as http.RequestListener,
        error: '400',
      },
      {
        name: 'returns the response',
        handler: ((req, res) => {
          res.write('Hello world!');
          res.end();
        }) as http.RequestListener,
        expected: 'Hello world!',
      },
      {
        name: 'handles a request body as a string',
        method: 'POST',
        body: 'foo=bar&zip=zap',
        handler: ((req, res) => {
          let body = '';
          req.on('data', (data) => {
            body += data;
          });
          req.on('end', () => {
            res.write(body);
            res.end();
          });
        }) as http.RequestListener,
        expected: 'foo=bar&zip=zap',
      },
      {
        name: 'handles a request body as a Buffer',
        method: 'POST',
        body: Buffer.from(`{"foo":"bar", "zip":"zap"}`),
        handler: ((req, res) => {
          let body = '';
          req.on('data', (data) => {
            body += data;
          });
          req.on('end', () => {
            res.write(body);
            res.end();
          });
        }) as http.RequestListener,
        expected: `{"foo":"bar", "zip":"zap"}`,
      },
      {
        name: 'handles a request body as a String',
        method: 'POST',
        body: new String('one two three'),
        handler: ((req, res) => {
          let body = '';
          req.on('data', (data) => {
            body += data;
          });
          req.on('end', () => {
            res.write(body);
            res.end();
          });
        }) as http.RequestListener,
        expected: 'one two three',
      },
      {
        name: 'handles a request body as a Stream',
        method: 'POST',
        body: createReadStream(filename),
        handler: ((req, res) => {
          let body = '';
          req.on('data', (data) => {
            body += data;
          });
          req.on('end', () => {
            res.write(body);
            res.end();
          });
        }) as http.RequestListener,
        expected: 'one two three',
      },
    ];

    cases.forEach((tc) => {
      it(tc.name, async function () {
        const address = this.address;
        const method = tc.method || 'GET';
        const body = tc.body || null;

        this.server.on('request', tc.handler);

        if (tc.expected) {
          expect(await request(method, address, body)).to.eq(tc.expected);
        } else if (tc.error) {
          try {
            await request(method, address, body);
            throw new Error(`expected error to be thrown`);
          } catch (err) {
            expect(`${err}`).to.include(tc.error);
          }
        }
      });
    });
  });
});
