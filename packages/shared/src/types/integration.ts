import { IntegrationProvider } from './enums';

export interface IntegrationConnection {
  id: string;
  user_id: string;
  provider: IntegrationProvider;
  access_token: string | null;
  refresh_token: string | null;
  token_expires_at: string | null;
  external_user_id: string | null;
  connected: boolean;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface IntegrationConnectionInsert {
  user_id: string;
  provider: IntegrationProvider;
  access_token?: string | null;
  refresh_token?: string | null;
  token_expires_at?: string | null;
  external_user_id?: string | null;
  connected?: boolean;
  metadata?: Record<string, unknown>;
}

export interface IntegrationConnectionUpdate {
  access_token?: string | null;
  refresh_token?: string | null;
  token_expires_at?: string | null;
  external_user_id?: string | null;
  connected?: boolean;
  metadata?: Record<string, unknown>;
}
