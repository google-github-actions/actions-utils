[**@google-github-actions/actions-utils**](../../README.md)

***

[@google-github-actions/actions-utils](../../modules.md) / [errors](../README.md) / errorMessage

# Function: errorMessage()

> **errorMessage**(`err`): `string`

Defined in: [errors.ts:26](https://github.com/google-github-actions/actions-utils/blob/main/src/errors.ts#L26)

errorMessage extracts the error message from the given error. It does this
via best effort and makes the error embeddable in other errors. It discards
any error details including stacktraces.

## Parameters

### err

`unknown`

Error input.

## Returns

`string`

Error information as a string.
