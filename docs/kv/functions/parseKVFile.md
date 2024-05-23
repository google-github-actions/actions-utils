[**@google-github-actions/actions-utils**](../../README.md) • **Docs**

***

[@google-github-actions/actions-utils](../../modules.md) / [kv](../README.md) / parseKVFile

# Function: parseKVFile()

> **parseKVFile**(`filePath`): [`KVPair`](../type-aliases/KVPair.md)

Read and parse an env var file. If the file contents begin with a curly
brace, the content is assumed to be JSON and is parsed as JSON. Otherwise,
the contents are parsed as a subset of YAML.

## Parameters

• **filePath**: `string`

Path to the file on disk to parse.

## Returns

[`KVPair`](../type-aliases/KVPair.md)

## Source

[kv.ts:167](https://github.com/google-github-actions/actions-utils/blob/main/src/kv.ts#L167)
