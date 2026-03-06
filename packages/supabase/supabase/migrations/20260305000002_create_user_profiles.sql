-- Phase 1: User profiles extending Supabase auth.users

CREATE TABLE public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL DEFAULT '',
  role public.user_role NOT NULL DEFAULT 'athlete',
  avatar_url TEXT,
  timezone TEXT NOT NULL DEFAULT 'UTC',
  onboarding_completed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for role-based queries
CREATE INDEX idx_user_profiles_role ON public.user_profiles(role);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "Users can read own profile"
  ON public.user_profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.user_profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Users can insert their own profile (during onboarding)
CREATE POLICY "Users can insert own profile"
  ON public.user_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Coaches can read profiles of their assigned athletes
CREATE POLICY "Coaches can read assigned athlete profiles"
  ON public.user_profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.coach_athlete_relationships
      WHERE coach_id = auth.uid()
        AND athlete_id = user_profiles.id
        AND status = 'active'
    )
  );
