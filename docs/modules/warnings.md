[@google-github-actions/actions-utils](../README.md) / [Exports](../modules.md) / warnings

# Module: warnings

## Table of contents

### Functions

- [isPinnedToHead](warnings.md#ispinnedtohead)
- [pinnedToHeadWarning](warnings.md#pinnedtoheadwarning)

## Functions

### isPinnedToHead

▸ **isPinnedToHead**(): `boolean`

isPinnedToHead is a boolean which returns true if the given GitHub action is
pinned to HEAD ("master" or "main"), false otherwise.

#### Returns

`boolean`

boolean indicating whether the action is pinned to HEAD.

#### Defined in

[warnings.ts:23](https://github.com/google-github-actions/actions-utils/blob/main/src/warnings.ts#L23)

___

### pinnedToHeadWarning

▸ **pinnedToHeadWarning**(`recommended`): `string`

pinnedToHeadWarning builds a message you can use to emit a consistent warning
about an action being pinned to HEAD. It extracts the action name and
reference from the environment and returns the compiled string.

Note it does not actually emit the warning, it just constructs a warning
string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `recommended` | `string` | String value for the recommended pinned version (e.g. "v0") |

#### Returns

`string`

String warning message.

#### Defined in

[warnings.ts:41](https://github.com/google-github-actions/actions-utils/blob/main/src/warnings.ts#L41)
