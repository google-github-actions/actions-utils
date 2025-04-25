[**@google-github-actions/actions-utils**](../../README.md)

***

[@google-github-actions/actions-utils](../../modules.md) / [validations](../README.md) / presence

# Function: presence()

> **presence**(`input`): `undefined` \| `string`

Defined in: [validations.ts:25](https://github.com/google-github-actions/actions-utils/blob/main/src/validations.ts#L25)

presence takes the given string and converts it to undefined iff it's null,
undefined, or the empty string. Otherwise, it returns the trimmed string.

## Parameters

### input

The string to check.

`undefined` | `null` | `string`

## Returns

`undefined` \| `string`

The trimmed string or undefined.
