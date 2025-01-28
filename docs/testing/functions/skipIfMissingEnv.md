[**@google-github-actions/actions-utils**](../../README.md)

***

[@google-github-actions/actions-utils](../../modules.md) / [testing](../README.md) / skipIfMissingEnv

# Function: skipIfMissingEnv()

> **skipIfMissingEnv**(...`envs`): `string` \| `boolean`

Defined in: [testing.ts:70](https://github.com/google-github-actions/actions-utils/blob/main/src/testing.ts#L70)

skipIfMissingEnv is a helper function for skipping a test if an environment
variable is missing (unset).

## Parameters

### envs

...`string`[]

List of environment variables

## Returns

`string` \| `boolean`

false or string indicating the test was skipped
