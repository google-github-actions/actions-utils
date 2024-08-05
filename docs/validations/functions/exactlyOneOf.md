[**@google-github-actions/actions-utils**](../../README.md) • **Docs**

***

[@google-github-actions/actions-utils](../../modules.md) / [validations](../README.md) / exactlyOneOf

# Function: exactlyOneOf()

> **exactlyOneOf**(...`inputs`): `boolean`

exactlyOneOf iterates over the inputs and ensures one and only one of the
elements is truthy. If more than one element is truthy, it returns false. If
no elements are truthy, it returns false.

## Parameters

• ...**inputs**: `any`[]

Arbitrary list of inputs.

## Returns

`boolean`

Boolean indicating whether exactly one element was truthy.

## Defined in

[validations.ts:38](https://github.com/google-github-actions/actions-utils/blob/main/src/validations.ts#L38)
