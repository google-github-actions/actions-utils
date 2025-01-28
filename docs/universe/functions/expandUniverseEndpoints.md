[**@google-github-actions/actions-utils**](../../README.md)

***

[@google-github-actions/actions-utils](../../modules.md) / [universe](../README.md) / expandUniverseEndpoints

# Function: expandUniverseEndpoints()

> **expandUniverseEndpoints**\<`T`\>(`endpoints`?, `universe`?): `{ [K in keyof T]: string }`

Defined in: [universe.ts:24](https://github.com/google-github-actions/actions-utils/blob/main/src/universe.ts#L24)

expandUniverseEndpoints takes a list of universe endpoints using the
{universe} template and returns the interolated values.

## Type Parameters

• **T** *extends* `Record`\<`string`, `string`\>

## Parameters

### endpoints?

`T`

is an array of endpoints to universify

### universe?

`string` = `'googleapis.com'`

is the universe to use

## Returns

`{ [K in keyof T]: string }`
