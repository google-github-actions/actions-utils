[@google-github-actions/actions-utils](../README.md) / [Exports](../modules.md) / clone

# Module: clone

## Table of contents

### Functions

- [deepClone](clone.md#deepclone)

## Functions

### deepClone

▸ **deepClone**\<`T`\>(`input`, `useStructuredClone?`): `T`

deepClone builds a deep copy (clone) of the given input. By default, it uses
structuredClone if defined. Otherwise, it uses v8 to serialize and
deserialize the input.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `input` | `T` | `undefined` | Object to deep clone. |
| `useStructuredClone` | `boolean` | `true` | Use structuredClone method (defaults to true). |

#### Returns

`T`

Deep copy of input.

#### Defined in

[clone.ts:28](https://github.com/google-github-actions/actions-utils/blob/main/src/clone.ts#L28)
