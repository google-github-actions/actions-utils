[@google-github-actions/actions-utils](../README.md) / [Exports](../modules.md) / fs

# Module: fs

## Table of contents

### Functions

- [forceRemove](fs.md#forceremove)
- [isEmptyDir](fs.md#isemptydir)
- [removeFile](fs.md#removefile)
- [writeSecureFile](fs.md#writesecurefile)

## Functions

### forceRemove

▸ **forceRemove**(`pth`): `Promise`<`void`\>

forceRemove forcibly removes a file or directory (recursively). If the file
or directory does not exist, it does nothing. This is functionally equivalent
to fs.rm, but avoids the need to handle errors for when the target file or
directory does not exist.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pth` | `PathLike` | Path to the file or directory to remove. |

#### Returns

`Promise`<`void`\>

#### Defined in

[fs.ts:29](https://github.com/google-github-actions/actions-utils/blob/main/src/fs.ts#L29)

___

### isEmptyDir

▸ **isEmptyDir**(`dir`): `Promise`<`boolean`\>

isEmptyDir returns true if the given directory does not exist, or exists but
contains no files. It also returns true if the current user does not have
permission to read the directory, since it is effectively empty from the
viewpoint of the caller.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dir` | `PathLike` | Path to a directory. |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[fs.ts:48](https://github.com/google-github-actions/actions-utils/blob/main/src/fs.ts#L48)

___

### removeFile

▸ **removeFile**(`filePath`): `Promise`<`boolean`\>

removeFile removes the file at the given path. If the file does not exist, it
does nothing.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filePath` | `PathLike` | Path of the file on disk to delete. |

#### Returns

`Promise`<`boolean`\>

A boolean, true if the file was deleted, false otherwise.

**`Deprecated`**

Use #forceRemove instead.

#### Defined in

[fs.ts:84](https://github.com/google-github-actions/actions-utils/blob/main/src/fs.ts#L84)

___

### writeSecureFile

▸ **writeSecureFile**<`T`\>(`outputPath`, `data`): `Promise`<`T`\>

writeSecureFile writes a file to disk with 0640 permissions and locks the
file during writing.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `PathLike` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `outputPath` | `T` | Path in which to create the secure file. |
| `data` | `string` \| `Buffer` | Data to write to file. |

#### Returns

`Promise`<`T`\>

Path to written file.

#### Defined in

[fs.ts:66](https://github.com/google-github-actions/actions-utils/blob/main/src/fs.ts#L66)
