[@google-github-actions/actions-utils](../README.md) / [Exports](../modules.md) / [retry](../modules/retry.md) / RetryOptions

# Interface: RetryOptions

[retry](../modules/retry.md).RetryOptions

RetryOptions are the config options for the withRetry function.

## Table of contents

### Properties

- [backoff](retry.RetryOptions.md#backoff)
- [backoffLimit](retry.RetryOptions.md#backofflimit)
- [retries](retry.RetryOptions.md#retries)

## Properties

### backoff

• `Optional` **backoff**: `number`

backoff is the starting backoff time, in milliseconds.

#### Defined in

[retry.ts:35](https://github.com/google-github-actions/actions-utils/blob/main/src/retry.ts#L35)

___

### backoffLimit

• `Optional` **backoffLimit**: `number`

backoffLimit is the maximum backoff time, in milliseconds.

#### Defined in

[retry.ts:40](https://github.com/google-github-actions/actions-utils/blob/main/src/retry.ts#L40)

___

### retries

• **retries**: `number`

retries is the number of _retries_ not the number of attempts. The number
of attempts will be retries + 1. This must be zero or a positive number.

#### Defined in

[retry.ts:30](https://github.com/google-github-actions/actions-utils/blob/main/src/retry.ts#L30)
