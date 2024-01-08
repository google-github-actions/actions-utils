[@google-github-actions/actions-utils](../README.md) / [Exports](../modules.md) / csv

# Module: csv

## Table of contents

### Functions

- [parseCSV](csv.md#parsecsv)
- [parseMultilineCSV](csv.md#parsemultilinecsv)

## Functions

### parseCSV

▸ **parseCSV**(`input`): `string`[]

parseCSV accepts a comma-separated list of items. Whitespace around entries
is removed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` | String representing a list. |

#### Returns

`string`[]

Array of strings, in the same order they were supplied.

#### Defined in

[csv.ts:25](https://github.com/google-github-actions/actions-utils/blob/main/src/csv.ts#L25)

___

### parseMultilineCSV

▸ **parseMultilineCSV**(`input`): `string`[]

parseMultilineCSV parses a CSV input where entries can be separated by
newlines. This is specific for GitHub Actions, since the YAML syntax does not
allow complex types, and sometimes splitting long entries over multiple lines
assists with readability.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` | String representing a comma-separated list |

#### Returns

`string`[]

Array of strings, in the same order they were supplied.

#### Defined in

[csv.ts:48](https://github.com/google-github-actions/actions-utils/blob/main/src/csv.ts#L48)
