[**@google-github-actions/actions-utils**](../../README.md)

***

[@google-github-actions/actions-utils](../../modules.md) / [kv](../README.md) / joinKVStringForGCloud

# Function: joinKVStringForGCloud()

> **joinKVStringForGCloud**(`input`, `chars`): `string`

Defined in: [kv.ts:50](https://github.com/google-github-actions/actions-utils/blob/main/src/kv.ts#L50)

joinKVStringForGCloud creates a string suitable for using with gcloud by
choosing a custom escape delimiter sequence that does not exist in the input
string.

## Parameters

### input

[`KVPair`](../type-aliases/KVPair.md)

KVPair to serialize.

### chars

`string` = ',.!@#$%&\*()\_=+~\`\[\]\{\}\|:;\<\>?🚀🍪🐼\u200B'

String of characters to use.

## Returns

`string`
