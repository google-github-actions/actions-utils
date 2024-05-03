[@google-github-actions/actions-utils](../README.md) / [Exports](../modules.md) / universe

# Module: universe

## Table of contents

### Functions

- [expandUniverseEndpoints](universe.md#expanduniverseendpoints)

## Functions

### expandUniverseEndpoints

▸ **expandUniverseEndpoints**\<`T`\>(`endpoints?`, `universe?`): \{ [K in keyof T]: string }

expandUniverseEndpoints takes a list of universe endpoints using the
{universe} template and returns the interolated values.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`\<`string`, `string`\> |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `endpoints?` | `T` | `undefined` | is an array of endpoints to universify |
| `universe` | `string` | `'googleapis.com'` | is the universe to use |

#### Returns

\{ [K in keyof T]: string }

#### Defined in

[universe.ts:24](https://github.com/google-github-actions/actions-utils/blob/main/src/universe.ts#L24)
