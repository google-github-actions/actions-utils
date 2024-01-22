[@google-github-actions/actions-utils](../README.md) / [Exports](../modules.md) / testing

# Module: testing

## Table of contents

### Functions

- [assertMembers](testing.md#assertmembers)
- [clearEnv](testing.md#clearenv)
- [clearInputs](testing.md#clearinputs)
- [setInput](testing.md#setinput)
- [setInputs](testing.md#setinputs)
- [skipIfMissingEnv](testing.md#skipifmissingenv)

## Functions

### assertMembers

▸ **assertMembers**\<`T`\>(`actual`, `expected`): `void`

assertMembers is an assertion that verifies the expected contains all of the
given members, in the order in which they were expected.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `actual` | `T`[] | The value to check again |
| `expected` | `T`[] | The subset of values to assert |

#### Returns

`void`

#### Defined in

[testing.ts:86](https://github.com/google-github-actions/actions-utils/blob/main/src/testing.ts#L86)

___

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

[testing.ts:54](https://github.com/google-github-actions/actions-utils/blob/main/src/testing.ts#L54)

___

### clearInputs

▸ **clearInputs**(): `void`

clearInputs removes any GitHub Actions inputs set on the environment.

#### Returns

`void`

#### Defined in

[testing.ts:44](https://github.com/google-github-actions/actions-utils/blob/main/src/testing.ts#L44)

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

[testing.ts:26](https://github.com/google-github-actions/actions-utils/blob/main/src/testing.ts#L26)

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

[testing.ts:37](https://github.com/google-github-actions/actions-utils/blob/main/src/testing.ts#L37)

___

### skipIfMissingEnv

▸ **skipIfMissingEnv**(`...envs`): `string` \| `boolean`

skipIfMissingEnv is a helper function for skipping a test if an environment
variable is missing (unset).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...envs` | `string`[] | List of environment variables |

#### Returns

`string` \| `boolean`

false or string indicating the test was skipped

#### Defined in

[testing.ts:69](https://github.com/google-github-actions/actions-utils/blob/main/src/testing.ts#L69)
