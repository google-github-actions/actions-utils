[@google-github-actions/actions-utils](../README.md) / [Exports](../modules.md) / retry

# Module: retry

## Table of contents

### Interfaces

- [RetryOptions](../interfaces/retry.RetryOptions.md)

### Functions

- [withRetries](retry.md#withretries)

## Functions

### withRetries

▸ **withRetries**<`T`\>(`fn`, `opts`): () => `Promise`<`T`\>

withRetry implements a retry mechanism with fibonacci backoff

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | () => `Promise`<`T`\> |
| `opts` | [`RetryOptions`](../interfaces/retry.RetryOptions.md) |

#### Returns

`fn`

fn. A function to start the retry process as a promise

▸ (): `Promise`<`T`\>

##### Returns

`Promise`<`T`\>

**`Throws`**

#### Defined in

[retry.ts:51](https://github.com/google-github-actions/actions-utils/blob/main/src/retry.ts#L51)
