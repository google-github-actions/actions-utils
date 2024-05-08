[@google-github-actions/actions-utils](../README.md) / [Exports](../modules.md) / flags

# Module: flags

## Table of contents

### Functions

- [parseFlags](flags.md#parseflags)
- [readUntil](flags.md#readuntil)

## Functions

### parseFlags

▸ **parseFlags**(`input`): `string`[]

parseFlags takes an input string and parses it as posix-compliant flags.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` | Flag string input. |

#### Returns

`string`[]

Array of strings in the order in which they were defined as flags.

#### Defined in

[flags.ts:23](https://github.com/google-github-actions/actions-utils/blob/main/src/flags.ts#L23)

___

### readUntil

▸ **readUntil**(`input`, `ch`): `string` \| ``null``

readUntil reads up to and including the given character and returns the
result. It ignores escaped versions of the character if they are preceeded by
with "\". If ch is not found, it returns null.

This is a utility function, but it is exported for testing.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` | The input string. |
| `ch` | `string` | The character to search. |

#### Returns

`string` \| ``null``

the string up to and including the search character, or null if no
match is found.

#### Defined in

[flags.ts:126](https://github.com/google-github-actions/actions-utils/blob/main/src/flags.ts#L126)
