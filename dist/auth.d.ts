/**
 * Credential is a generic exported credential.
 */
export declare type Credential = ServiceAccountKey | ExternalAccount;
/**
 * ServiceAccountKeyCredential is an exported credential for a service account key.
 */
export declare type ServiceAccountKey = {
    type: string;
    project_id: string;
    private_key_id: string;
    private_key: string;
    client_email: string;
    client_id: string;
    auth_uri: string;
    token_uri: string;
    auth_provider_x509_cert_url: string;
    client_x509_cert_url: string;
};
/**
 * ExternalAccount is an exported credential for an external account
 * like a workload identity pool.
 */
export declare type ExternalAccount = {
    type: string;
    audience: string;
    subject_token_type: string;
    service_account_impersonation_url?: string;
    token_url: string;
    token_info_url?: string;
    client_id?: string;
    client_secret?: string;
    quota_project_id?: string;
    workforce_pool_user_project?: string;
    credential_source: {
        file?: string;
        url?: string;
        headers?: {
            [key: string]: string;
        };
        format?: {
            type: 'json' | 'text';
            subject_token_field_name?: string;
        };
        environment_id?: string;
        region_url?: string;
        regional_cred_verification_url: string;
    };
};
/**
 * parseCredential attempts to parse the given string as a service account key
 * JSON or external account credentials. It handles if the input is
 * base64-encoded.
 *
 * @param input String that is an exported JSON service account key or external
 * account credentials file (or base64-encoded).
 *
 * @return The parsed credential. It could be a service account key or an
 * external credentials file.
 */
export declare function parseCredential(input: string): Credential;
/**
 * isServiceAccountKey returns true if the given interface is a
 * ServiceAccountKey, false otherwise.
 *
 * @param credential Credential to check if is a service account key.
 */
export declare function isServiceAccountKey(credential: Credential): credential is ServiceAccountKey;
/**
 * isExternalAccount returns true if the given interface is a ExternalAccount,
 * false otherwise.
 *
 * @param credential Credential to check if is an external account
 */
export declare function isExternalAccount(credential: Credential): credential is ExternalAccount;
declare const _default: {
    parseCredential: typeof parseCredential;
    isServiceAccountKey: typeof isServiceAccountKey;
    isExternalAccount: typeof isExternalAccount;
};
export default _default;
