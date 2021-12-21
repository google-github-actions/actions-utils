[@google-github-actions/actions-utils](../README.md) / [Exports](../modules.md) / validations

# Module: validations

## Table of contents

### Functions

- [allOf](validations.md#allof)
- [exactlyOneOf](validations.md#exactlyoneof)
- [presence](validations.md#presence)

## Functions

### allOf

▸ **allOf**(...`inputs`): `boolean`

allOf iterates over the inputs and ensures all of the elements are truthy. If
any elements are falsey, it returns false. If no inputs are given, the result
is true.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...inputs` | `any`[] | Arbitrary list of inputs. |

#### Returns

`boolean`

Boolean indicating whether all elements were truthy.

#### Defined in

[validations.ts:70](https://github.com/google-github-actions/actions-utils/blob/main/src/validations.ts#L70)

___

### exactlyOneOf

▸ **exactlyOneOf**(...`inputs`): `boolean`

exactlyOneOf iterates over the inputs and ensures one and only one of the
elements is truthy. If more than one element is truthy, it returns false. If
no elements are truthy, it returns false.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...inputs` | `any`[] | Arbitrary list of inputs. |

#### Returns

`boolean`

Boolean indicating whether exactly one element was truthy.

#### Defined in

[validations.ts:40](https://github.com/google-github-actions/actions-utils/blob/main/src/validations.ts#L40)

___

### presence

▸ **presence**(`input`): `string` \| `undefined`

presence takes the given string and converts it to undefined iff it's null,
undefined, or the empty string. Otherwise, it returns the trimmed string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `undefined` \| ``null`` \| `string` | The string to check. |

#### Returns

`string` \| `undefined`

The trimmed string or undefined.

#### Defined in

[validations.ts:27](https://github.com/google-github-actions/actions-utils/blob/main/src/validations.ts#L27)
