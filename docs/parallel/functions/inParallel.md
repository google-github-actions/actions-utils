[**@google-github-actions/actions-utils**](../../README.md) • **Docs**

***

[@google-github-actions/actions-utils](../../modules.md) / [parallel](../README.md) / inParallel

# Function: inParallel()

> **inParallel**\<`F`, `R`\>(`tasks`, `concurrency`?): `Promise`\<`R`[]\>

inParallel executes the given function in parallel, up to max concurrency.
There are no guarantees on the order in which promises start.

## Type parameters

• **F** *extends* () => `Promise`\<`Awaited`\<`R`\>\>

• **R** *extends* `Promise`\<`Awaited`\<`R`\>\>

## Parameters

• **tasks**: () => `Promise`\<`R`\>[]

The tasks to invoke, must be async.

• **concurrency?**: `number`

Optional configuration.

## Returns

`Promise`\<`R`[]\>

Array of results in the order of args.

## Source

[parallel.ts:30](https://github.com/google-github-actions/actions-utils/blob/main/src/parallel.ts#L30)
