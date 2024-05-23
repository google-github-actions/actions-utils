[**@google-github-actions/actions-utils**](../../README.md) • **Docs**

***

[@google-github-actions/actions-utils](../../modules.md) / [csv](../README.md) / parseMultilineCSV

# Function: parseMultilineCSV()

> **parseMultilineCSV**(`input`): `string`[]

parseMultilineCSV parses a CSV input where entries can be separated by
newlines. This is specific for GitHub Actions, since the YAML syntax does not
allow complex types, and sometimes splitting long entries over multiple lines
assists with readability.

## Parameters

• **input**: `string`

String representing a comma-separated list

## Returns

`string`[]

Array of strings, in the same order they were supplied.

## Source

[csv.ts:48](https://github.com/google-github-actions/actions-utils/blob/main/src/csv.ts#L48)
