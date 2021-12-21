[actions-utils](../README.md) / [Exports](../modules.md) / errors

# Module: errors

## Table of contents

### Functions

- [errorMessage](errors.md#errormessage)

## Functions

### errorMessage

▸ **errorMessage**(`err`): `string`

errorMessage extracts the error message from the given error. It does this
via best effort and makes the error embeddable in other errors. It discards
any error details including stacktraces.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `err` | `unknown` | Error input. |

#### Returns

`string`

Error information as a string.

#### Defined in

[errors.ts:26](https://github.com/google-github-actions/actions-utils/blob/main/src/errors.ts#L26)
