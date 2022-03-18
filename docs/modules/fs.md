[@google-github-actions/actions-utils](../README.md) / [Exports](../modules.md) / fs

# Module: fs

## Table of contents

### Functions

- [isEmptyDir](fs.md#isemptydir)
- [removeFile](fs.md#removefile)
- [writeSecureFile](fs.md#writesecurefile)

## Functions

### isEmptyDir

▸ **isEmptyDir**(`dir`): `Promise`<`boolean`\>

isEmptyDir returns true if the given directory does not exist, or exists but
contains no files. It also returns true if the current user does not have
permission to read the directory, since it is effectively empty from the
viewpoint of the caller.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dir` | `string` | Path to a directory. |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[fs.ts:29](https://github.com/google-github-actions/actions-utils/blob/main/src/fs.ts#L29)

___

### removeFile

▸ **removeFile**(`filePath`): `Promise`<`boolean`\>

removeFile removes the file at the given path. If the file does not exist, it
does nothing.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filePath` | `string` | Path of the file on disk to delete. |

#### Returns

`Promise`<`boolean`\>

A boolean, true if the file was deleted, false otherwise.

#### Defined in

[fs.ts:60](https://github.com/google-github-actions/actions-utils/blob/main/src/fs.ts#L60)

___

### writeSecureFile

▸ **writeSecureFile**(`outputPath`, `data`): `Promise`<`string`\>

writeSecureFile writes a file to disk with 0640 permissions and locks the
file during writing.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `outputPath` | `string` | Path in which to create the secure file. |
| `data` | `string` \| `Buffer` | Data to write to file. |

#### Returns

`Promise`<`string`\>

Path to written file.

#### Defined in

[fs.ts:47](https://github.com/google-github-actions/actions-utils/blob/main/src/fs.ts#L47)
