[@google-github-actions/actions-utils](../README.md) / [Exports](../modules.md) / net

# Module: net

## Table of contents

### Properties

- [default](net.md#default)

### Functions

- [rawRequest](net.md#rawrequest)
- [request](net.md#request)

## Properties

### default

• **default**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `rawRequest` | (`opts`: `RequestOptions`, `data?`: `any`) => `Promise`<`string`\> |
| `request` | (`method`: `string`, `url`: `string`, `data?`: `any`, `opts?`: `RequestOptions`) => `Promise`<`string`\> |

## Functions

### rawRequest

▸ **rawRequest**(`opts`, `data?`): `Promise`<`string`\>

rawRequest is a low-level helper that returns a promise from the executed
request. It throws an error if the response is unsuccessful.

Callers should generally define their own helper that wraps request which
injects their own custom values such as a user-agent header.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opts` | `RequestOptions` | Request options. See https.RequestOptions for available values. |
| `data?` | `any` | Optional request body. This can be a string, Buffer, or streamable. |

#### Returns

`Promise`<`string`\>

String body response.

#### Defined in

[net.ts:67](https://github.com/google-github-actions/actions-utils/blob/main/src/net.ts#L67)

___

### request

▸ **request**(`method`, `url`, `data?`, `opts?`): `Promise`<`string`\>

request is a higher-level helper that accepts an HTTP method and URL, parses
the URL, and calls rawRequest.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `method` | `string` | HTTP method to use for the request. |
| `url` | `string` | URL as a string, including any query parameters. |
| `data?` | `any` | Optional data to send along with the request. |
| `opts?` | `RequestOptions` | Optional more specific request options. |

#### Returns

`Promise`<`string`\>

String response body.

#### Defined in

[net.ts:34](https://github.com/google-github-actions/actions-utils/blob/main/src/net.ts#L34)
