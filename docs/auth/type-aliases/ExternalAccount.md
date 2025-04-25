[**@google-github-actions/actions-utils**](../../README.md)

***

[@google-github-actions/actions-utils](../../modules.md) / [auth](../README.md) / ExternalAccount

# Type Alias: ExternalAccount

> **ExternalAccount** = `object`

Defined in: [auth.ts:45](https://github.com/google-github-actions/actions-utils/blob/main/src/auth.ts#L45)

ExternalAccount is an exported credential for an external account
like a workload identity pool.

## Properties

### audience

> **audience**: `string`

Defined in: [auth.ts:47](https://github.com/google-github-actions/actions-utils/blob/main/src/auth.ts#L47)

***

### client\_id?

> `optional` **client\_id**: `string`

Defined in: [auth.ts:52](https://github.com/google-github-actions/actions-utils/blob/main/src/auth.ts#L52)

***

### client\_secret?

> `optional` **client\_secret**: `string`

Defined in: [auth.ts:53](https://github.com/google-github-actions/actions-utils/blob/main/src/auth.ts#L53)

***

### credential\_source

> **credential\_source**: `object`

Defined in: [auth.ts:57](https://github.com/google-github-actions/actions-utils/blob/main/src/auth.ts#L57)

#### environment\_id?

> `optional` **environment\_id**: `string`

#### file?

> `optional` **file**: `string`

#### format?

> `optional` **format**: `object`

##### format.subject\_token\_field\_name?

> `optional` **subject\_token\_field\_name**: `string`

##### format.type

> **type**: `"json"` \| `"text"`

#### headers?

> `optional` **headers**: `object`

##### Index Signature

\[`key`: `string`\]: `string`

#### region\_url?

> `optional` **region\_url**: `string`

#### regional\_cred\_verification\_url

> **regional\_cred\_verification\_url**: `string`

#### url?

> `optional` **url**: `string`

***

### quota\_project\_id?

> `optional` **quota\_project\_id**: `string`

Defined in: [auth.ts:54](https://github.com/google-github-actions/actions-utils/blob/main/src/auth.ts#L54)

***

### service\_account\_impersonation\_url?

> `optional` **service\_account\_impersonation\_url**: `string`

Defined in: [auth.ts:49](https://github.com/google-github-actions/actions-utils/blob/main/src/auth.ts#L49)

***

### subject\_token\_type

> **subject\_token\_type**: `string`

Defined in: [auth.ts:48](https://github.com/google-github-actions/actions-utils/blob/main/src/auth.ts#L48)

***

### token\_info\_url?

> `optional` **token\_info\_url**: `string`

Defined in: [auth.ts:51](https://github.com/google-github-actions/actions-utils/blob/main/src/auth.ts#L51)

***

### token\_url

> **token\_url**: `string`

Defined in: [auth.ts:50](https://github.com/google-github-actions/actions-utils/blob/main/src/auth.ts#L50)

***

### type

> **type**: `string`

Defined in: [auth.ts:46](https://github.com/google-github-actions/actions-utils/blob/main/src/auth.ts#L46)

***

### workforce\_pool\_user\_project?

> `optional` **workforce\_pool\_user\_project**: `string`

Defined in: [auth.ts:55](https://github.com/google-github-actions/actions-utils/blob/main/src/auth.ts#L55)
