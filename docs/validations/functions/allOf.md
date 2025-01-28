[**@google-github-actions/actions-utils**](../../README.md)

***

[@google-github-actions/actions-utils](../../modules.md) / [validations](../README.md) / allOf

# Function: allOf()

> **allOf**(...`inputs`): `boolean`

Defined in: [validations.ts:68](https://github.com/google-github-actions/actions-utils/blob/main/src/validations.ts#L68)

allOf iterates over the inputs and ensures all of the elements are truthy. If
any elements are falsey, it returns false. If no inputs are given, the result
is true.

## Parameters

### inputs

...`any`[]

Arbitrary list of inputs.

## Returns

`boolean`

Boolean indicating whether all elements were truthy.
