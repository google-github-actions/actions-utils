[**@google-github-actions/actions-utils**](../../README.md) • **Docs**

***

[@google-github-actions/actions-utils](../../modules.md) / [validations](../README.md) / presence

# Function: presence()

> **presence**(`input`): `string` \| `undefined`

presence takes the given string and converts it to undefined iff it's null,
undefined, or the empty string. Otherwise, it returns the trimmed string.

## Parameters

• **input**: `undefined` \| `null` \| `string`

The string to check.

## Returns

`string` \| `undefined`

The trimmed string or undefined.

## Source

[validations.ts:27](https://github.com/google-github-actions/actions-utils/blob/main/src/validations.ts#L27)
