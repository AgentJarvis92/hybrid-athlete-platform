-- Phase 1: Integration connections (Strava, Apple Health)

CREATE TABLE public.integration_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  provider TEXT NOT NULL CHECK (provider IN ('strava', 'apple_health')),
  access_token TEXT,
  refresh_token TEXT,
  token_expires_at TIMESTAMPTZ,
  external_user_id TEXT,
  connected BOOLEAN NOT NULL DEFAULT FALSE,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, provider)
);

-- Indexes
CREATE INDEX idx_ic_user_id ON public.integration_connections(user_id);
CREATE INDEX idx_ic_provider ON public.integration_connections(provider);

-- Auto-update updated_at
CREATE TRIGGER set_ic_updated_at
  BEFORE UPDATE ON public.integration_connections
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- RLS
ALTER TABLE public.integration_connections ENABLE ROW LEVEL SECURITY;

-- Users can read their own connections
CREATE POLICY "Users can read own connections"
  ON public.integration_connections FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own connections
CREATE POLICY "Users can insert own connections"
  ON public.integration_connections FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own connections
CREATE POLICY "Users can update own connections"
  ON public.integration_connections FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own connections
CREATE POLICY "Users can delete own connections"
  ON public.integration_connections FOR DELETE
  USING (auth.uid() = user_id);
