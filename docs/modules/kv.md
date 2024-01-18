[@google-github-actions/actions-utils](../README.md) / [Exports](../modules.md) / kv

# Module: kv

## Table of contents

### Type Aliases

- [KVPair](kv.md#kvpair)

### Functions

- [joinKVString](kv.md#joinkvstring)
- [joinKVStringForGCloud](kv.md#joinkvstringforgcloud)
- [parseKVFile](kv.md#parsekvfile)
- [parseKVJSON](kv.md#parsekvjson)
- [parseKVString](kv.md#parsekvstring)
- [parseKVStringAndFile](kv.md#parsekvstringandfile)
- [parseKVYAML](kv.md#parsekvyaml)

## Type Aliases

### KVPair

Ƭ **KVPair**: `Record`\<`string`, `string`\>

KVPair represents a key=value pair of strings.

#### Defined in

[kv.ts:27](https://github.com/google-github-actions/actions-utils/blob/main/src/kv.ts#L27)

## Functions

### joinKVString

▸ **joinKVString**(`input`, `separator?`): `string`

joinKVString joins the given KVPair using the provided separator.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `input` | [`KVPair`](kv.md#kvpair) | `undefined` | KVPair to serialize. |
| `separator` | `string` | `','` | Join separator. |

#### Returns

`string`

#### Defined in

[kv.ts:35](https://github.com/google-github-actions/actions-utils/blob/main/src/kv.ts#L35)

___

### joinKVStringForGCloud

▸ **joinKVStringForGCloud**(`input`): `string`

joinKVStringForGCloud creates a string suitable for using with gcloud by
choosing a custom escape delimiter sequence that does not exist in the input
string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | [`KVPair`](kv.md#kvpair) | KVPair to serialize. |

#### Returns

`string`

#### Defined in

[kv.ts:50](https://github.com/google-github-actions/actions-utils/blob/main/src/kv.ts#L50)

___

### parseKVFile

▸ **parseKVFile**(`filePath`): [`KVPair`](kv.md#kvpair)

Read and parse an env var file. If the file contents begin with a curly
brace, the content is assumed to be JSON and is parsed as JSON. Otherwise,
the contents are parsed as a subset of YAML.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filePath` | `string` | Path to the file on disk to parse. |

#### Returns

[`KVPair`](kv.md#kvpair)

#### Defined in

[kv.ts:158](https://github.com/google-github-actions/actions-utils/blob/main/src/kv.ts#L158)

___

### parseKVJSON

▸ **parseKVJSON**(`str`): [`KVPair`](kv.md#kvpair)

parseKVJSON parses the given string as a set of key=value pairs expressed as
JSON. If the input is not valid JSON, it errors. If the keys and values are
not both string types, it errors. Entries are returned in the order in which
they appeared in the JSON input.

This is mostly exposed for testing. Callers should probably use #parseKVFile
instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | JSON string to parse. |

#### Returns

[`KVPair`](kv.md#kvpair)

List of key=value pairs.

#### Defined in

[kv.ts:193](https://github.com/google-github-actions/actions-utils/blob/main/src/kv.ts#L193)

___

### parseKVString

▸ **parseKVString**(`input`): [`KVPair`](kv.md#kvpair)

parseKVString parses a string of the format "KEY1=VALUE1,KEY2=VALUE2" or
"KEY1=VALUE1\nKEY2=VALUE2". Keys or values that contain a separator must be
escaped with a backslash ("\,", "\\n"). All leading and trailing whitespace
is trimmed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` | String with key/value pairs to parse. |

#### Returns

[`KVPair`](kv.md#kvpair)

#### Defined in

[kv.ts:89](https://github.com/google-github-actions/actions-utils/blob/main/src/kv.ts#L89)

___

### parseKVStringAndFile

▸ **parseKVStringAndFile**(`kvString?`, `kvFilePath?`): [`KVPair`](kv.md#kvpair)

parseKVStringAndFile parses the given KV string and KV file, merging the
results (with kvString taking precedence).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `kvString?` | `string` | String of KEY=VALUE pairs. |
| `kvFilePath?` | `string` | Path on disk to a YAML file of KEY: VALUE pairs. |

#### Returns

[`KVPair`](kv.md#kvpair)

#### Defined in

[kv.ts:264](https://github.com/google-github-actions/actions-utils/blob/main/src/kv.ts#L264)

___

### parseKVYAML

▸ **parseKVYAML**(`str`): [`KVPair`](kv.md#kvpair)

Read and parse contents of the string as YAML. This is mostly just exposed
for testing.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | YAML content to parse as K=V pairs. |

#### Returns

[`KVPair`](kv.md#kvpair)

#### Defined in

[kv.ts:237](https://github.com/google-github-actions/actions-utils/blob/main/src/kv.ts#L237)
