-- Phase 1: User module settings (running, strength, nutrition toggles)

CREATE TABLE public.user_module_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module public.module_type NOT NULL,
  enabled BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, module)
);

-- Indexes
CREATE INDEX idx_ums_user_id ON public.user_module_settings(user_id);

-- Auto-update updated_at
CREATE TRIGGER set_ums_updated_at
  BEFORE UPDATE ON public.user_module_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- RLS
ALTER TABLE public.user_module_settings ENABLE ROW LEVEL SECURITY;

-- Users can read their own module settings
CREATE POLICY "Users can read own module settings"
  ON public.user_module_settings FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own module settings
CREATE POLICY "Users can insert own module settings"
  ON public.user_module_settings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own module settings
CREATE POLICY "Users can update own module settings"
  ON public.user_module_settings FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Coaches can read module settings of their assigned athletes
CREATE POLICY "Coaches can read assigned athlete module settings"
  ON public.user_module_settings FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.coach_athlete_relationships
      WHERE coach_id = auth.uid()
        AND athlete_id = user_module_settings.user_id
        AND status = 'active'
    )
  );
