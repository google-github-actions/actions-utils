[**@google-github-actions/actions-utils**](../../README.md)

***

[@google-github-actions/actions-utils](../../modules.md) / [random](../README.md) / randomFilepath

# Function: randomFilepath()

> **randomFilepath**(`parent`, `length`): `string`

Defined in: [random.ts:48](https://github.com/google-github-actions/actions-utils/blob/main/src/random.ts#L48)

randomFilepath creates a cryptographically random filename inside the given
parent. If no parent is given, it defaults to os.tmpdir(). It does not create
the file.

## Parameters

### parent

`string` = `...`

Optional parent directory for the filepath. If not given,
os.tmpdir() is used.

### length

`number` = `12`

Optional length of the filename to create. By default, this
creates a filename with 96 bits of entropy to minimize probability of
exceeding Windows filepaths lengths.

## Returns

`string`

Full file path.
