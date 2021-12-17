[actions-utils](../README.md) / [Exports](../modules.md) / random

# Module: random

## Table of contents

### Properties

- [default](random.md#default)

### Functions

- [randomFilename](random.md#randomfilename)
- [randomFilepath](random.md#randomfilepath)

## Properties

### default

• **default**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `randomFilename` | (`length`: `number`) => `string` |
| `randomFilepath` | (`parent`: `string`, `length`: `number`) => `string` |

## Functions

### randomFilename

▸ **randomFilename**(`length?`): `string`

randomFilename creates a cryptographically random name suitable for use as a
filename. It does not create the file.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `length` | `number` | `12` | Optional length of the filename to create. By default, this creates a filename with 96 bits of entropy to minimize probability of exceeding Windows filepaths lengths. |

#### Returns

`string`

Name of the file.

#### Defined in

[random.ts:31](https://github.com/googlestaging/actions-utils/blob/main/src/random.ts#L31)

___

### randomFilepath

▸ **randomFilepath**(`parent?`, `length?`): `string`

randomFilepath creates a cryptographically random filename inside the given
parent. If no parent is given, it defaults to os.tmpdir(). It does not create
the file.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `parent` | `string` | `undefined` | Optional parent directory for the filepath. If not given, os.tmpdir() is used. |
| `length` | `number` | `12` | Optional length of the filename to create. By default, this creates a filename with 96 bits of entropy to minimize probability of exceeding Windows filepaths lengths. |

#### Returns

`string`

Full file path.

#### Defined in

[random.ts:48](https://github.com/googlestaging/actions-utils/blob/main/src/random.ts#L48)
