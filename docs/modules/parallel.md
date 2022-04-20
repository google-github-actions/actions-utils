[@google-github-actions/actions-utils](../README.md) / [Exports](../modules.md) / parallel

# Module: parallel

## Table of contents

### Interfaces

- [InParallelOptions](../interfaces/parallel.InParallelOptions.md)

### Functions

- [inParallel](parallel.md#inparallel)

## Functions

### inParallel

▸ **inParallel**<`F`, `P`, `R`\>(`fn`, `args`, `opts?`): `Promise`<`Awaited`<`R`\>[]\>

inParallel executes the given function in parallel, up to max concurrency.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `F` | extends (...`args`: `any`[]) => `Promise`<`Awaited`<`R`\>\> |
| `P` | extends `any`[] |
| `R` | extends `Promise`<`Awaited`<`R`\>, `R`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fn` | `F` | The function to invoke, must be async. |
| `args` | `P`[] | An array of array of parameters to invoke fn. |
| `opts?` | [`InParallelOptions`](../interfaces/parallel.InParallelOptions.md) | Optional configuration. |

#### Returns

`Promise`<`Awaited`<`R`\>[]\>

Array of results in the order of args.

#### Defined in

[parallel.ts:38](https://github.com/google-github-actions/actions-utils/blob/main/src/parallel.ts#L38)
