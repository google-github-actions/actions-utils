[@google-github-actions/actions-utils](../README.md) / [Exports](../modules.md) / auth

# Module: auth

## Table of contents

### Type Aliases

- [Credential](auth.md#credential)
- [ExternalAccount](auth.md#externalaccount)
- [ServiceAccountKey](auth.md#serviceaccountkey)

### Variables

- [default](auth.md#default)

### Functions

- [isExternalAccount](auth.md#isexternalaccount)
- [isServiceAccountKey](auth.md#isserviceaccountkey)
- [parseCredential](auth.md#parsecredential)

## Type Aliases

### Credential

Ƭ **Credential**: [`ServiceAccountKey`](auth.md#serviceaccountkey) \| [`ExternalAccount`](auth.md#externalaccount)

Credential is a generic exported credential.

#### Defined in

[auth.ts:23](https://github.com/google-github-actions/actions-utils/blob/main/src/auth.ts#L23)

___

### ExternalAccount

Ƭ **ExternalAccount**: `Object`

ExternalAccount is an exported credential for an external account
like a workload identity pool.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `audience` | `string` |
| `client_id?` | `string` |
| `client_secret?` | `string` |
| `credential_source` | { `environment_id?`: `string` ; `file?`: `string` ; `format?`: { `subject_token_field_name?`: `string` ; `type`: ``"json"`` \| ``"text"``  } ; `headers?`: { `[key: string]`: `string`;  } ; `region_url?`: `string` ; `regional_cred_verification_url`: `string` ; `url?`: `string`  } |
| `credential_source.environment_id?` | `string` |
| `credential_source.file?` | `string` |
| `credential_source.format?` | { `subject_token_field_name?`: `string` ; `type`: ``"json"`` \| ``"text"``  } |
| `credential_source.format.subject_token_field_name?` | `string` |
| `credential_source.format.type` | ``"json"`` \| ``"text"`` |
| `credential_source.headers?` | { `[key: string]`: `string`;  } |
| `credential_source.region_url?` | `string` |
| `credential_source.regional_cred_verification_url` | `string` |
| `credential_source.url?` | `string` |
| `quota_project_id?` | `string` |
| `service_account_impersonation_url?` | `string` |
| `subject_token_type` | `string` |
| `token_info_url?` | `string` |
| `token_url` | `string` |
| `type` | `string` |
| `workforce_pool_user_project?` | `string` |

#### Defined in

[auth.ts:45](https://github.com/google-github-actions/actions-utils/blob/main/src/auth.ts#L45)

___

### ServiceAccountKey

Ƭ **ServiceAccountKey**: `Object`

ServiceAccountKeyCredential is an exported credential for a service account key.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `auth_provider_x509_cert_url` | `string` |
| `auth_uri` | `string` |
| `client_email` | `string` |
| `client_id` | `string` |
| `client_x509_cert_url` | `string` |
| `private_key` | `string` |
| `private_key_id` | `string` |
| `project_id` | `string` |
| `token_uri` | `string` |
| `type` | `string` |

#### Defined in

[auth.ts:28](https://github.com/google-github-actions/actions-utils/blob/main/src/auth.ts#L28)

## Variables

### default

• **default**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `isExternalAccount` | (`credential`: [`Credential`](auth.md#credential)) => credential is ExternalAccount |
| `isServiceAccountKey` | (`credential`: [`Credential`](auth.md#credential)) => credential is ServiceAccountKey |
| `parseCredential` | (`input`: `string`) => [`Credential`](auth.md#credential) |

#### Defined in

[auth.ts:127](https://github.com/google-github-actions/actions-utils/blob/main/src/auth.ts#L127)

## Functions

### isExternalAccount

▸ **isExternalAccount**(`credential`): credential is ExternalAccount

isExternalAccount returns true if the given interface is a ExternalAccount,
false otherwise.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `credential` | [`Credential`](auth.md#credential) | Credential to check if is an external account |

#### Returns

credential is ExternalAccount

#### Defined in

[auth.ts:123](https://github.com/google-github-actions/actions-utils/blob/main/src/auth.ts#L123)

___

### isServiceAccountKey

▸ **isServiceAccountKey**(`credential`): credential is ServiceAccountKey

isServiceAccountKey returns true if the given interface is a
ServiceAccountKey, false otherwise.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `credential` | [`Credential`](auth.md#credential) | Credential to check if is a service account key. |

#### Returns

credential is ServiceAccountKey

#### Defined in

[auth.ts:113](https://github.com/google-github-actions/actions-utils/blob/main/src/auth.ts#L113)

___

### parseCredential

▸ **parseCredential**(`input`): [`Credential`](auth.md#credential)

parseCredential attempts to parse the given string as a service account key
JSON or external account credentials. It handles if the input is
base64-encoded.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` | String that is an exported JSON service account key or external account credentials file (or base64-encoded). |

#### Returns

[`Credential`](auth.md#credential)

The parsed credential. It could be a service account key or an
external credentials file.

#### Defined in

[auth.ts:86](https://github.com/google-github-actions/actions-utils/blob/main/src/auth.ts#L86)
