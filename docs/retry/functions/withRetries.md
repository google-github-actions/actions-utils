[**@google-github-actions/actions-utils**](../../README.md)

***

[@google-github-actions/actions-utils](../../modules.md) / [retry](../README.md) / withRetries

# Function: withRetries()

> **withRetries**\<`T`\>(`fn`, `opts`): () => `Promise`\<`T`\>

Defined in: [retry.ts:51](https://github.com/google-github-actions/actions-utils/blob/main/src/retry.ts#L51)

withRetry implements a retry mechanism with fibonacci backoff

## Type Parameters

• **T**

## Parameters

### fn

() => `Promise`\<`T`\>

A function to retry on failure

### opts

[`RetryOptions`](../interfaces/RetryOptions.md)

The retry options

## Returns

`Function`

fn. A function to start the retry process as a promise

### Returns

`Promise`\<`T`\>

## Throws
