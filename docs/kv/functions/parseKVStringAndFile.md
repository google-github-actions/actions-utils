[**@google-github-actions/actions-utils**](../../README.md)

***

[@google-github-actions/actions-utils](../../modules.md) / [kv](../README.md) / parseKVStringAndFile

# Function: parseKVStringAndFile()

> **parseKVStringAndFile**(`kvString?`, `kvFilePath?`): `undefined` \| [`KVPair`](../type-aliases/KVPair.md)

Defined in: [kv.ts:284](https://github.com/google-github-actions/actions-utils/blob/main/src/kv.ts#L284)

parseKVStringAndFile parses the given KV string and KV file, merging the
results (with kvString taking precedence).

## Parameters

### kvString?

`string`

String of KEY=VALUE pairs.

### kvFilePath?

`string`

Path on disk to a YAML file of KEY: VALUE pairs.

## Returns

`undefined` \| [`KVPair`](../type-aliases/KVPair.md)
