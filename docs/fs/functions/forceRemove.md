[**@google-github-actions/actions-utils**](../../README.md) • **Docs**

***

[@google-github-actions/actions-utils](../../modules.md) / [fs](../README.md) / forceRemove

# Function: forceRemove()

> **forceRemove**(`pth`): `Promise`\<`void`\>

forceRemove forcibly removes a file or directory (recursively). If the file
or directory does not exist, it does nothing. This is functionally equivalent
to fs.rm, but avoids the need to handle errors for when the target file or
directory does not exist.

## Parameters

• **pth**: `PathLike`

Path to the file or directory to remove.

## Returns

`Promise`\<`void`\>

## Source

[fs.ts:29](https://github.com/google-github-actions/actions-utils/blob/main/src/fs.ts#L29)
