[**@google-github-actions/actions-utils**](../../README.md)

***

[@google-github-actions/actions-utils](../../modules.md) / [path](../README.md) / toWin32Path

# Function: toWin32Path()

> **toWin32Path**(`pth`): `string`

Defined in: [path.ts:37](https://github.com/google-github-actions/actions-utils/blob/main/src/path.ts#L37)

toWin32Path converts the given path to the win32 form. On Linux, / will be
replaced with \\.

## Parameters

### pth

`string`

Path to transform.

## Returns

`string`

string Win32 path.
