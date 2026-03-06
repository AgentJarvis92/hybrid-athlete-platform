import { UserRole } from './enums';

export interface UserProfile {
  id: string;
  full_name: string;
  role: UserRole;
  avatar_url: string | null;
  timezone: string;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserProfileInsert {
  id: string;
  full_name?: string;
  role?: UserRole;
  avatar_url?: string | null;
  timezone?: string;
  onboarding_completed?: boolean;
}

export interface UserProfileUpdate {
  full_name?: string;
  role?: UserRole;
  avatar_url?: string | null;
  timezone?: string;
  onboarding_completed?: boolean;
}
