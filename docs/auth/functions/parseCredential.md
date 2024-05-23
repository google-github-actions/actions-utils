[**@google-github-actions/actions-utils**](../../README.md) • **Docs**

***

[@google-github-actions/actions-utils](../../modules.md) / [auth](../README.md) / parseCredential

# Function: parseCredential()

> **parseCredential**(`input`): [`Credential`](../type-aliases/Credential.md)

parseCredential attempts to parse the given string as a service account key
JSON or external account credentials. It handles if the input is
base64-encoded.

## Parameters

• **input**: `string`

String that is an exported JSON service account key or external
account credentials file (or base64-encoded).

## Returns

[`Credential`](../type-aliases/Credential.md)

The parsed credential. It could be a service account key or an
external credentials file.

## Source

[auth.ts:86](https://github.com/google-github-actions/actions-utils/blob/main/src/auth.ts#L86)
