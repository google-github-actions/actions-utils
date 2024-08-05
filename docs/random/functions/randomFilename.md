[**@google-github-actions/actions-utils**](../../README.md) • **Docs**

***

[@google-github-actions/actions-utils](../../modules.md) / [random](../README.md) / randomFilename

# Function: randomFilename()

> **randomFilename**(`length`): `string`

randomFilename creates a cryptographically random name suitable for use as a
filename. It does not create the file.

## Parameters

• **length**: `number` = `12`

Optional length of the filename to create. By default, this
creates a filename with 96 bits of entropy to minimize probability of
exceeding Windows filepaths lengths.

## Returns

`string`

Name of the file.

## Defined in

[random.ts:31](https://github.com/google-github-actions/actions-utils/blob/main/src/random.ts#L31)
