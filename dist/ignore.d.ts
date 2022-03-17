/**
 * parseGcloudIgnore parses a gcloud ignore at the given filepath. It follows
 * the parsing rules defined at
 * https://cloud.google.com/sdk/gcloud/reference/topic/gcloudignore, including
 * parsing any included files.
 *
 * @param pth Path to the gcloudignore file.
 * @return Ordered list of strings from the various ignore files.
 */
export declare function parseGcloudIgnore(pth: string): Promise<string[]>;
