[**@google-github-actions/actions-utils**](../../README.md)

***

[@google-github-actions/actions-utils](../../modules.md) / [clone](../README.md) / deepClone

# Function: deepClone()

> **deepClone**\<`T`\>(`input`, `useStructuredClone`): `T`

Defined in: [clone.ts:28](https://github.com/google-github-actions/actions-utils/blob/main/src/clone.ts#L28)

deepClone builds a deep copy (clone) of the given input. By default, it uses
structuredClone if defined. Otherwise, it uses v8 to serialize and
deserialize the input.

## Type Parameters

• **T**

## Parameters

### input

`T`

Object to deep clone.

### useStructuredClone

`boolean` = `true`

Use structuredClone method (defaults to true).

## Returns

`T`

Deep copy of input.
