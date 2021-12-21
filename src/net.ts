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

import { URL } from 'url';
import http from 'http';
import https, { RequestOptions } from 'https';

/**
 * request is a higher-level helper that accepts an HTTP method and URL, parses
 * the URL, and calls rawRequest.
 *
 * @param method HTTP method to use for the request.
 * @param url URL as a string, including any query parameters.
 * @param data Optional data to send along with the request.
 * @param opts Optional more specific request options.
 *
 * @return String response body.
 */
export function request(
  method: string,
  url: string,
  data?: any,
  opts?: RequestOptions,
): Promise<string> {
  method = (method || 'GET').toUpperCase();

  const parsed = new URL(url);

  opts ||= {};
  opts.protocol ||= parsed.protocol;
  opts.hostname ||= parsed.hostname;
  opts.port ||= parsed.port;
  opts.path ||= parsed.pathname + parsed.search;
  opts.method ||= method;

  return rawRequest(opts, data);
}

/**
 * rawRequest is a low-level helper that returns a promise from the executed
 * request. It throws an error if the response is unsuccessful.
 *
 * Callers should generally define their own helper that wraps request which
 * injects their own custom values such as a user-agent header.
 *
 * @param opts Request options. See https.RequestOptions for available values.
 * @param data Optional request body. This can be a string, Buffer, or
 * streamable.
 *
 * @return String body response.
 */
export function rawRequest(opts: RequestOptions, data?: any): Promise<string> {
  // If the protocol is http, use the http package. Otherwise, use https.
  const fn = opts?.protocol === 'http' || opts?.protocol === 'http:' ? http.request : https.request;

  return new Promise((resolve, reject) => {
    const req = fn(opts, (res) => {
      res.setEncoding('utf8');

      let body = '';
      res.on('data', (data) => {
        body += data;
      });

      res.on('end', () => {
        const code = res.statusCode;
        if (code && code >= 400) {
          let err = `Unuccessful HTTP response: ${code}`;
          if (body) {
            err = `${err}, body: ${body}`;
          }

          return reject(err);
        } else {
          return resolve(body);
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    switch (true) {
      case data === null:
      case data === undefined:
        req.end();
        break;
      case typeof data === 'string':
      case data instanceof Buffer:
        req.write(data);
        req.end();
        break;
      case data instanceof String:
        req.write(data.valueOf());
        req.end();
        break;
      default:
        data.pipe(req);
    }
  });
}

export default { request, rawRequest };
