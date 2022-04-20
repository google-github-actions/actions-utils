/**
 * setInput sets the given name as a GitHub Actions input. It uses the reverse
 * logic for how GitHub Actions searches for a named input.
 *
 * @param name Name of the input.
 * @param value String value of the input.
 */
export declare function setInput(name: string, value: string): void;
/**
 * setInputs sets the list of GitHub Actions inputs. See #setInput for more
 * information.
 *
 * @param inputs List of inputs.
 */
export declare function setInputs(inputs: Record<string, string>): void;
/**
 * clearInputs removes any GitHub Actions inputs set on the environment.
 */
export declare function clearInputs(): void;
/**
 * clearEnv deletes any keys from the environment for which the function returns
 * true.
 *
 * @param fn Function to determine whether a variable should be deleted.
 */
export declare function clearEnv(fn: (key: string, value?: string) => boolean): void;
