[**@google-github-actions/actions-utils**](../../README.md) • **Docs**

***

[@google-github-actions/actions-utils](../../modules.md) / [fs](../README.md) / removeFile

# Function: ~~removeFile()~~

> **removeFile**(`filePath`): `Promise`\<`boolean`\>

removeFile removes the file at the given path. If the file does not exist, it
does nothing.

## Parameters

• **filePath**: `PathLike`

Path of the file on disk to delete.

## Returns

`Promise`\<`boolean`\>

A boolean, true if the file was deleted, false otherwise.

## Deprecated

Use #forceRemove instead.

## Defined in

[fs.ts:92](https://github.com/google-github-actions/actions-utils/blob/main/src/fs.ts#L92)
