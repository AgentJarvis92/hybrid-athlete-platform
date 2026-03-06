import { ModuleType } from './enums';

export interface UserModuleSettings {
  id: string;
  user_id: string;
  module: ModuleType;
  enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserModuleSettingsInsert {
  user_id: string;
  module: ModuleType;
  enabled?: boolean;
}

export interface UserModuleSettingsUpdate {
  enabled?: boolean;
}
