[@google-github-actions/actions-utils](../README.md) / [Exports](../modules.md) / parallel

# Module: parallel

## Table of contents

### Functions

- [inParallel](parallel.md#inparallel)

## Functions

### inParallel

▸ **inParallel**\<`F`, `R`\>(`tasks`, `concurrency`): `Promise`\<`R`[]\>

inParallel executes the given function in parallel, up to max concurrency.
There are no guarantees on the order in which promises start.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `F` | extends () => `Promise`\<`Awaited`\<`R`\>\> |
| `R` | extends `Promise`\<`Awaited`\<`R`\>\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tasks` | () => `Promise`\<`R`\>[] | The tasks to invoke, must be async. |
| `concurrency` | `undefined` \| `number` | Optional configuration. |

#### Returns

`Promise`\<`R`[]\>

Array of results in the order of args.

#### Defined in

[parallel.ts:30](https://github.com/google-github-actions/actions-utils/blob/main/src/parallel.ts#L30)
