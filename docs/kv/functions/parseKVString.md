[**@google-github-actions/actions-utils**](../../README.md)

***

[@google-github-actions/actions-utils](../../modules.md) / [kv](../README.md) / parseKVString

# Function: parseKVString()

> **parseKVString**(`input`): `undefined` \| [`KVPair`](../type-aliases/KVPair.md)

Defined in: [kv.ts:94](https://github.com/google-github-actions/actions-utils/blob/main/src/kv.ts#L94)

parseKVString parses a string of the format "KEY1=VALUE1,KEY2=VALUE2" or
"KEY1=VALUE1\nKEY2=VALUE2". Keys or values that contain a separator must be
escaped with a backslash ("\,", "\\n"). All leading and trailing whitespace
is trimmed.

If the input is the literal string "{}", this returns the empty object. This
is useful when trying to delete all upstream values.

## Parameters

### input

`string`

String with key/value pairs to parse.

## Returns

`undefined` \| [`KVPair`](../type-aliases/KVPair.md)
