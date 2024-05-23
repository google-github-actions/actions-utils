[**@google-github-actions/actions-utils**](../../README.md) • **Docs**

***

[@google-github-actions/actions-utils](../../modules.md) / [fs](../README.md) / isEmptyDir

# Function: isEmptyDir()

> **isEmptyDir**(`dir`): `Promise`\<`boolean`\>

isEmptyDir returns true if the given directory does not exist, or exists but
contains no files. It also returns true if the current user does not have
permission to read the directory, since it is effectively empty from the
viewpoint of the caller.

## Parameters

• **dir**: `PathLike`

Path to a directory.

## Returns

`Promise`\<`boolean`\>

## Source

[fs.ts:48](https://github.com/google-github-actions/actions-utils/blob/main/src/fs.ts#L48)
