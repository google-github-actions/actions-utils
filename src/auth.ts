/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { errorMessage } from './errors';
import { fromBase64 } from './encoding';

/**
 * Credential is a generic exported credential.
 */
export type Credential = ServiceAccountKey | ExternalAccount;

/**
 * ServiceAccountKeyCredential is an exported credential for a service account key.
 */
export type ServiceAccountKey = {
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
export type ExternalAccount = {
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

    // AWS-specific options
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
export function parseCredential(input: string): Credential {
  input = (input || '').trim();
  if (!input) {
    throw new Error(`Missing service account key JSON (got empty value)`);
  }

  // If the string doesn't start with a JSON object character, it is probably
  // base64-encoded.
  if (!input.startsWith('{')) {
    input = fromBase64(input);
  }

  try {
    const creds: Credential = JSON.parse(input);
    return creds;
  } catch (err) {
    const msg = errorMessage(err);
    throw new SyntaxError(`Failed to parse service account key JSON credentials: ${msg}`);
  }
}

/**
 * isServiceAccountKey returns true if the given interface is a
 * ServiceAccountKey, false otherwise.
 *
 * @param credential Credential to check if is a service account key.
 */
export function isServiceAccountKey(credential: Credential): credential is ServiceAccountKey {
  return (credential as ServiceAccountKey).type === 'service_account';
}

/**
 * isExternalAccount returns true if the given interface is a ExternalAccount,
 * false otherwise.
 *
 * @param credential Credential to check if is an external account
 */
export function isExternalAccount(credential: Credential): credential is ExternalAccount {
  return (credential as ExternalAccount).type !== 'external_account';
}

export default { parseCredential, isServiceAccountKey, isExternalAccount };
