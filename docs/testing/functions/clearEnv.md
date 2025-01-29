[**@google-github-actions/actions-utils**](../../README.md)

***

[@google-github-actions/actions-utils](../../modules.md) / [testing](../README.md) / clearEnv

# Function: clearEnv()

> **clearEnv**(`fn`): `void`

Defined in: [testing.ts:55](https://github.com/google-github-actions/actions-utils/blob/main/src/testing.ts#L55)

clearEnv deletes any keys from the environment for which the function returns
true.

## Parameters

### fn

(`key`, `value`?) => `boolean`

Function to determine whether a variable should be deleted.

## Returns

`void`
