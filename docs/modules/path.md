[@google-github-actions/actions-utils](../README.md) / [Exports](../modules.md) / path

# Module: path

## Table of contents

### Functions

- [toPlatformPath](path.md#toplatformpath)
- [toPosixPath](path.md#toposixpath)
- [toWin32Path](path.md#towin32path)

## Functions

### toPlatformPath

▸ **toPlatformPath**(`pth`): `string`

toPlatformPath converts the given path to a platform-specific path. It does
this by replacing instances of / and \ with the platform-specific path
separator.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pth` | `string` | The path to platformize. |

#### Returns

`string`

string The platform-specific path.

#### Defined in

[path.ts:49](https://github.com/google-github-actions/actions-utils/blob/main/src/path.ts#L49)

___

### toPosixPath

▸ **toPosixPath**(`pth`): `string`

toPosixPath converts the given path to the posix form. On Windows, \\ will be
replaced with /.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pth` | `string` | Path to transform. |

#### Returns

`string`

string Posix path.

#### Defined in

[path.ts:26](https://github.com/google-github-actions/actions-utils/blob/main/src/path.ts#L26)

___

### toWin32Path

▸ **toWin32Path**(`pth`): `string`

toWin32Path converts the given path to the win32 form. On Linux, / will be
replaced with \\.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pth` | `string` | Path to transform. |

#### Returns

`string`

string Win32 path.

#### Defined in

[path.ts:37](https://github.com/google-github-actions/actions-utils/blob/main/src/path.ts#L37)
