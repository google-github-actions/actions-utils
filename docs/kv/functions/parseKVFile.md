[**@google-github-actions/actions-utils**](../../README.md)

***

[@google-github-actions/actions-utils](../../modules.md) / [kv](../README.md) / parseKVFile

# Function: parseKVFile()

> **parseKVFile**(`filePath`): `undefined` \| [`KVPair`](../type-aliases/KVPair.md)

Defined in: [kv.ts:167](https://github.com/google-github-actions/actions-utils/blob/main/src/kv.ts#L167)

Read and parse an env var file. If the file contents begin with a curly
brace, the content is assumed to be JSON and is parsed as JSON. Otherwise,
the contents are parsed as a subset of YAML.

## Parameters

### filePath

`string`

Path to the file on disk to parse.

## Returns

`undefined` \| [`KVPair`](../type-aliases/KVPair.md)
