[**@google-github-actions/actions-utils**](../../README.md)

***

[@google-github-actions/actions-utils](../../modules.md) / [warnings](../README.md) / pinnedToHeadWarning

# Function: pinnedToHeadWarning()

> **pinnedToHeadWarning**(`recommended`): `string`

Defined in: [warnings.ts:41](https://github.com/google-github-actions/actions-utils/blob/main/src/warnings.ts#L41)

pinnedToHeadWarning builds a message you can use to emit a consistent warning
about an action being pinned to HEAD. It extracts the action name and
reference from the environment and returns the compiled string.

Note it does not actually emit the warning, it just constructs a warning
string.

## Parameters

### recommended

`string`

String value for the recommended pinned version (e.g.
"v0")

## Returns

`string`

String warning message.
