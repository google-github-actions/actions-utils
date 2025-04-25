[**@google-github-actions/actions-utils**](../../README.md)

***

[@google-github-actions/actions-utils](../../modules.md) / [flags](../README.md) / readUntil

# Function: readUntil()

> **readUntil**(`input`, `ch`): `null` \| `string`

Defined in: [flags.ts:126](https://github.com/google-github-actions/actions-utils/blob/main/src/flags.ts#L126)

readUntil reads up to and including the given character and returns the
result. It ignores escaped versions of the character if they are preceeded by
with "\". If ch is not found, it returns null.

This is a utility function, but it is exported for testing.

## Parameters

### input

`string`

The input string.

### ch

`string`

The character to search.

## Returns

`null` \| `string`

the string up to and including the search character, or null if no
match is found.
