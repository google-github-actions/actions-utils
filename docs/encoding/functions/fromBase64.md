[**@google-github-actions/actions-utils**](../../README.md) • **Docs**

***

[@google-github-actions/actions-utils](../../modules.md) / [encoding](../README.md) / fromBase64

# Function: fromBase64()

> **fromBase64**(`input`): `string`

fromBase64 base64 decodes the input, handling URL vs standard encoding and
padded vs unpadded. This should only be used to decode string values - the
return result is a string and therefore this will not work with binary data.

## Parameters

• **input**: `string`

Base64-encoded string.

## Returns

`string`

Decoded string.

## Source

[encoding.ts:41](https://github.com/google-github-actions/actions-utils/blob/main/src/encoding.ts#L41)
