[**@google-github-actions/actions-utils**](../../README.md)

***

[@google-github-actions/actions-utils](../../modules.md) / [errors](../README.md) / isNotFoundError

# Function: isNotFoundError()

> **isNotFoundError**(`err`): `boolean`

Defined in: [errors.ts:75](https://github.com/google-github-actions/actions-utils/blob/main/src/errors.ts#L75)

isNotFoundError determines if the given error is "not found". Since there's
literally no way to actually do this in Node, it inspects the string output
for "ENOENT".

## Parameters

### err

`unknown`

The error result to check.

## Returns

`boolean`

Boolean, true if the error represents NotFound, false otherwise.
