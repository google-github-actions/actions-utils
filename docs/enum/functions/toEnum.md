[**@google-github-actions/actions-utils**](../../README.md) • **Docs**

***

[@google-github-actions/actions-utils](../../modules.md) / [enum](../README.md) / toEnum

# Function: toEnum()

> **toEnum**\<`E`\>(`e`, `s`): `E`\[keyof `E`\]

toEnum converts the input value to the best enum value. If no enum value
exists, it throws an error.

## Type parameters

• **E** *extends* `Record`\<`string`, `string`\>

## Parameters

• **e**: `E`

Enum to check against.

• **s**: `string`

String to enumerize.

## Returns

`E`\[keyof `E`\]

string

## Source

[enum.ts:25](https://github.com/google-github-actions/actions-utils/blob/main/src/enum.ts#L25)
