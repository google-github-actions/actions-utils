[**@google-github-actions/actions-utils**](../../README.md) • **Docs**

***

[@google-github-actions/actions-utils](../../modules.md) / [auth](../README.md) / ExternalAccount

# Type alias: ExternalAccount

> **ExternalAccount**: `object`

ExternalAccount is an exported credential for an external account
like a workload identity pool.

## Type declaration

### audience

> **audience**: `string`

### client\_id?

> `optional` **client\_id**: `string`

### client\_secret?

> `optional` **client\_secret**: `string`

### credential\_source

> **credential\_source**: `object`

### credential\_source.environment\_id?

> `optional` **environment\_id**: `string`

### credential\_source.file?

> `optional` **file**: `string`

### credential\_source.format?

> `optional` **format**: `object`

### credential\_source.format.subject\_token\_field\_name?

> `optional` **subject\_token\_field\_name**: `string`

### credential\_source.format.type

> **type**: `"json"` \| `"text"`

### credential\_source.headers?

> `optional` **headers**: `object`

#### Index signature

 \[`key`: `string`\]: `string`

### credential\_source.region\_url?

> `optional` **region\_url**: `string`

### credential\_source.regional\_cred\_verification\_url

> **regional\_cred\_verification\_url**: `string`

### credential\_source.url?

> `optional` **url**: `string`

### quota\_project\_id?

> `optional` **quota\_project\_id**: `string`

### service\_account\_impersonation\_url?

> `optional` **service\_account\_impersonation\_url**: `string`

### subject\_token\_type

> **subject\_token\_type**: `string`

### token\_info\_url?

> `optional` **token\_info\_url**: `string`

### token\_url

> **token\_url**: `string`

### type

> **type**: `string`

### workforce\_pool\_user\_project?

> `optional` **workforce\_pool\_user\_project**: `string`

## Source

[auth.ts:45](https://github.com/google-github-actions/actions-utils/blob/main/src/auth.ts#L45)
