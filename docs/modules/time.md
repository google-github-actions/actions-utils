[@google-github-actions/actions-utils](../README.md) / [Exports](../modules.md) / time

# Module: time

## Table of contents

### Functions

- [parseDuration](time.md#parseduration)
- [sleep](time.md#sleep)

## Functions

### parseDuration

▸ **parseDuration**(`input`): `number`

parseDuration parses a user-supplied string duration with optional suffix and
returns a number representing the number of seconds. It returns 0 when given
the empty string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` | Duration string |

#### Returns

`number`

#### Defined in

[time.ts:24](https://github.com/google-github-actions/actions-utils/blob/main/src/time.ts#L24)

___

### sleep

▸ **sleep**(`ms?`): `Promise`\<`void`\>

sleep waits for a specified duration in milliseconds as a promise.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `ms` | `number` | `0` | Duration in milliseconds to sleep. |

#### Returns

`Promise`\<`void`\>

#### Defined in

[time.ts:85](https://github.com/google-github-actions/actions-utils/blob/main/src/time.ts#L85)
