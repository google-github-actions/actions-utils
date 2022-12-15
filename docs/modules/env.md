[@google-github-actions/actions-utils](../README.md) / [Exports](../modules.md) / env

# Module: env

## Table of contents

### Type Aliases

- [ProcessEnv](env.md#processenv)

### Functions

- [stubEnv](env.md#stubenv)

## Type Aliases

### ProcessEnv

Ƭ **ProcessEnv**: `Record`<`string`, `string` \| `undefined`\>

ProcessEnv is a wrapper that defines an environment structure.

#### Defined in

[env.ts:20](https://github.com/google-github-actions/actions-utils/blob/main/src/env.ts#L20)

## Functions

### stubEnv

▸ **stubEnv**(`input`, `target?`): () => `void`

stubEnv accepts an input dictionary and sets the provided environment
variables in the current process environment. Values set to "undefined" are
deleted from the environment.

The function is only safe for concurrent use if the target is safe for
concurrent use. The function itself provides no locking.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `input` | [`ProcessEnv`](env.md#processenv) | `undefined` | Map of string value pairs to set in the new environment. |
| `target` | [`ProcessEnv`](env.md#processenv) | `process.env` | Target map to set and restore (defaults to `process.env`). |

#### Returns

`fn`

Function that restores the environment.

▸ (): `void`

##### Returns

`void`

#### Defined in

[env.ts:35](https://github.com/google-github-actions/actions-utils/blob/main/src/env.ts#L35)
