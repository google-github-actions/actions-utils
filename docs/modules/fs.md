[actions-utils](../README.md) / [Exports](../modules.md) / fs

# Module: fs

## Table of contents

### Functions

- [removeFile](fs.md#removefile)
- [writeSecureFile](fs.md#writesecurefile)

## Functions

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

[fs.ts:43](https://github.com/googlestaging/actions-utils/blob/main/src/fs.ts#L43)

___

### writeSecureFile

▸ **writeSecureFile**(`outputPath`, `data`): `Promise`<`string`\>

writeSecureFile writes a file to disk with 0640 permissions and locks the
file during writing.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `outputPath` | `string` | Path in which to create random file in. |
| `data` | `string` \| `Buffer` | Data to write to file. |

#### Returns

`Promise`<`string`\>

Path to written file.

#### Defined in

[fs.ts:30](https://github.com/googlestaging/actions-utils/blob/main/src/fs.ts#L30)
