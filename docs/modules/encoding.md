[actions-utils](../README.md) / [Exports](../modules.md) / encoding

# Module: encoding

## Table of contents

### Functions

- [fromBase64](encoding.md#frombase64)
- [toBase64](encoding.md#tobase64)

## Functions

### fromBase64

▸ **fromBase64**(`input`): `string`

fromBase64 base64 decodes the input, handling URL vs standard encoding and
padded vs unpadded. This should only be used to decode string values - the
return result is a string and therefore this will not work with binary data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` | Base64-encoded string. |

#### Returns

`string`

Decoded string.

#### Defined in

[encoding.ts:41](https://github.com/googlestaging/actions-utils/blob/main/src/encoding.ts#L41)

___

### toBase64

▸ **toBase64**(`input`): `string`

toBase64 base64 encodes the input as URL-encoded, unpadded.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` \| `Buffer` | String or Buffer to encode as base64. |

#### Returns

`string`

URL-encoded, unpadded base64 string.

#### Defined in

[encoding.ts:24](https://github.com/googlestaging/actions-utils/blob/main/src/encoding.ts#L24)
