[**@google-github-actions/actions-utils**](../../README.md)

***

[@google-github-actions/actions-utils](../../modules.md) / [kv](../README.md) / parseKVJSON

# Function: parseKVJSON()

> **parseKVJSON**(`str`): `undefined` \| [`KVPair`](../type-aliases/KVPair.md)

Defined in: [kv.ts:202](https://github.com/google-github-actions/actions-utils/blob/main/src/kv.ts#L202)

parseKVJSON parses the given string as a set of key=value pairs expressed as
JSON. If the input is not valid JSON, it errors. If the keys and values are
not both string types, it errors. Entries are returned in the order in which
they appeared in the JSON input.

This is mostly exposed for testing. Callers should probably use #parseKVFile
instead.

## Parameters

### str

`string`

JSON string to parse.

## Returns

`undefined` \| [`KVPair`](../type-aliases/KVPair.md)

List of key=value pairs.
