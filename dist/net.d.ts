/// <reference types="node" />
import { RequestOptions } from 'https';
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
export declare function request(method: string, url: string, data?: any, opts?: RequestOptions): Promise<string>;
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
export declare function rawRequest(opts: RequestOptions, data?: any): Promise<string>;
declare const _default: {
    request: typeof request;
    rawRequest: typeof rawRequest;
};
export default _default;
