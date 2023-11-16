[@google-github-actions/actions-utils](../README.md) / [Exports](../modules.md) / ignore

# Module: ignore

## Table of contents

### Functions

- [parseGcloudIgnore](ignore.md#parsegcloudignore)

## Functions

### parseGcloudIgnore

▸ **parseGcloudIgnore**(`pth`): `Promise`\<`string`[]\>

parseGcloudIgnore parses a gcloud ignore at the given filepath. It follows
the parsing rules defined at
https://cloud.google.com/sdk/gcloud/reference/topic/gcloudignore, including
parsing any included files.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pth` | `string` | Path to the gcloudignore file. |

#### Returns

`Promise`\<`string`[]\>

Ordered list of strings from the various ignore files.

#### Defined in

[ignore.ts:31](https://github.com/google-github-actions/actions-utils/blob/main/src/ignore.ts#L31)
