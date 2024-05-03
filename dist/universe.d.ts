/**
 * expandUniverseEndpoints takes a list of universe endpoints using the
 * {universe} template and returns the interolated values.
 *
 * @param endpoints is an array of endpoints to universify
 * @param universe is the universe to use
 */
export declare function expandUniverseEndpoints<T extends Record<string, string>>(endpoints?: T, universe?: string): {
    [K in keyof T]: string;
};
