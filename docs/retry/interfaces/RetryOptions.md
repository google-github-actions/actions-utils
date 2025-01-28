[**@google-github-actions/actions-utils**](../../README.md)

***

[@google-github-actions/actions-utils](../../modules.md) / [retry](../README.md) / RetryOptions

# Interface: RetryOptions

Defined in: [retry.ts:25](https://github.com/google-github-actions/actions-utils/blob/main/src/retry.ts#L25)

RetryOptions are the config options for the withRetry function.

## Properties

### backoff?

> `optional` **backoff**: `number`

Defined in: [retry.ts:35](https://github.com/google-github-actions/actions-utils/blob/main/src/retry.ts#L35)

backoff is the starting backoff time, in milliseconds.

***

### backoffLimit?

> `optional` **backoffLimit**: `number`

Defined in: [retry.ts:40](https://github.com/google-github-actions/actions-utils/blob/main/src/retry.ts#L40)

backoffLimit is the maximum backoff time, in milliseconds.

***

### retries

> **retries**: `number`

Defined in: [retry.ts:30](https://github.com/google-github-actions/actions-utils/blob/main/src/retry.ts#L30)

retries is the number of _retries_ not the number of attempts. The number
of attempts will be retries + 1. This must be zero or a positive number.
