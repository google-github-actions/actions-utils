[@google-github-actions/actions-utils](../README.md) / [Exports](../modules.md) / testing

# Module: testing

## Table of contents

### Functions

- [clearEnv](testing.md#clearenv)
- [clearInputs](testing.md#clearinputs)
- [setInput](testing.md#setinput)
- [setInputs](testing.md#setinputs)

## Functions

### clearEnv

▸ **clearEnv**(`fn`): `void`

clearEnv deletes any keys from the environment for which the function returns
true.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fn` | (`key`: `string`, `value?`: `string`) => `boolean` | Function to determine whether a variable should be deleted. |

#### Returns

`void`

#### Defined in

[testing.ts:52](https://github.com/google-github-actions/actions-utils/blob/main/src/testing.ts#L52)

___

### clearInputs

▸ **clearInputs**(): `void`

clearInputs removes any GitHub Actions inputs set on the environment.

#### Returns

`void`

#### Defined in

[testing.ts:42](https://github.com/google-github-actions/actions-utils/blob/main/src/testing.ts#L42)

___

### setInput

▸ **setInput**(`name`, `value`): `void`

setInput sets the given name as a GitHub Actions input. It uses the reverse
logic for how GitHub Actions searches for a named input.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Name of the input. |
| `value` | `string` | String value of the input. |

#### Returns

`void`

#### Defined in

[testing.ts:24](https://github.com/google-github-actions/actions-utils/blob/main/src/testing.ts#L24)

___

### setInputs

▸ **setInputs**(`inputs`): `void`

setInputs sets the list of GitHub Actions inputs. See #setInput for more
information.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `inputs` | `Record`\<`string`, `string`\> | List of inputs. |

#### Returns

`void`

#### Defined in

[testing.ts:35](https://github.com/google-github-actions/actions-utils/blob/main/src/testing.ts#L35)
