[**@google-github-actions/actions-utils**](../../README.md) • **Docs**

***

[@google-github-actions/actions-utils](../../modules.md) / [fs](../README.md) / writeSecureFile

# Function: writeSecureFile()

> **writeSecureFile**\<`T`\>(`outputPath`, `data`): `Promise`\<`T`\>

writeSecureFile writes a file to disk with 0640 permissions and locks the
file during writing.

## Type parameters

• **T** *extends* `PathLike`

## Parameters

• **outputPath**: `T`

Path in which to create the secure file.

• **data**: `string` \| `Buffer`

Data to write to file.

## Returns

`Promise`\<`T`\>

Path to written file.

## Source

[fs.ts:66](https://github.com/google-github-actions/actions-utils/blob/main/src/fs.ts#L66)
