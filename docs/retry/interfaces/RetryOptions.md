[**@google-github-actions/actions-utils**](../../README.md) • **Docs**

***

[@google-github-actions/actions-utils](../../modules.md) / [retry](../README.md) / RetryOptions

# Interface: RetryOptions

RetryOptions are the config options for the withRetry function.

## Properties

### backoff?

> `optional` **backoff**: `number`

backoff is the starting backoff time, in milliseconds.

#### Source

[retry.ts:35](https://github.com/google-github-actions/actions-utils/blob/main/src/retry.ts#L35)

***

### backoffLimit?

> `optional` **backoffLimit**: `number`

backoffLimit is the maximum backoff time, in milliseconds.

#### Source

[retry.ts:40](https://github.com/google-github-actions/actions-utils/blob/main/src/retry.ts#L40)

***

### retries

> **retries**: `number`

retries is the number of _retries_ not the number of attempts. The number
of attempts will be retries + 1. This must be zero or a positive number.

#### Source

[retry.ts:30](https://github.com/google-github-actions/actions-utils/blob/main/src/retry.ts#L30)
