[**@google-github-actions/actions-utils**](../../README.md)

***

[@google-github-actions/actions-utils](../../modules.md) / [env](../README.md) / stubEnv

# Function: stubEnv()

> **stubEnv**(`input`, `target`): () => `void`

Defined in: [env.ts:35](https://github.com/google-github-actions/actions-utils/blob/main/src/env.ts#L35)

stubEnv accepts an input dictionary and sets the provided environment
variables in the current process environment. Values set to "undefined" are
deleted from the environment.

The function is only safe for concurrent use if the target is safe for
concurrent use. The function itself provides no locking.

## Parameters

### input

[`ProcessEnv`](../type-aliases/ProcessEnv.md)

Map of string value pairs to set in the new environment.

### target

[`ProcessEnv`](../type-aliases/ProcessEnv.md) = `process.env`

Target map to set and restore (defaults to `process.env`).

## Returns

Function that restores the environment.

> (): `void`

### Returns

`void`
