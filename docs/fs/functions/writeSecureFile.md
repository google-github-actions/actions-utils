[**@google-github-actions/actions-utils**](../../README.md)

***

[@google-github-actions/actions-utils](../../modules.md) / [fs](../README.md) / writeSecureFile

# Function: writeSecureFile()

> **writeSecureFile**\<`T`\>(`outputPath`, `data`, `options`?): `Promise`\<`T`\>

Defined in: [fs.ts:68](https://github.com/google-github-actions/actions-utils/blob/main/src/fs.ts#L68)

writeSecureFile writes a file to disk with 0640 permissions and locks the
file during writing.

## Type Parameters

• **T** *extends* `PathLike`

## Parameters

### outputPath

`T`

Path in which to create the secure file.

### data

Data to write to file.

`string` | `Buffer`

### options?

`ObjectEncodingOptions` & `object`

additional options to pass to writeFile. The default options
are permissions of 0640, write-exclusive, and flush-on-success.

## Returns

`Promise`\<`T`\>

Path to written file.
