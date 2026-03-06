-- Phase 1: Coach-athlete relationships with invite codes

CREATE TABLE public.coach_athlete_relationships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coach_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  athlete_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  status public.relationship_status NOT NULL DEFAULT 'pending',
  invite_code TEXT UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(6), 'hex'),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_car_coach_id ON public.coach_athlete_relationships(coach_id);
CREATE INDEX idx_car_athlete_id ON public.coach_athlete_relationships(athlete_id);
CREATE INDEX idx_car_invite_code ON public.coach_athlete_relationships(invite_code);
CREATE INDEX idx_car_status ON public.coach_athlete_relationships(status);

-- Auto-update updated_at
CREATE TRIGGER set_car_updated_at
  BEFORE UPDATE ON public.coach_athlete_relationships
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- RLS
ALTER TABLE public.coach_athlete_relationships ENABLE ROW LEVEL SECURITY;

-- Coaches can see their own relationships
CREATE POLICY "Coaches can read own relationships"
  ON public.coach_athlete_relationships FOR SELECT
  USING (coach_id = auth.uid());

-- Athletes can see their own relationships
CREATE POLICY "Athletes can read own relationships"
  ON public.coach_athlete_relationships FOR SELECT
  USING (athlete_id = auth.uid());

-- Coaches can create invite relationships
CREATE POLICY "Coaches can create relationships"
  ON public.coach_athlete_relationships FOR INSERT
  WITH CHECK (coach_id = auth.uid());

-- Coaches can update their own relationships (revoke, etc)
CREATE POLICY "Coaches can update own relationships"
  ON public.coach_athlete_relationships FOR UPDATE
  USING (coach_id = auth.uid());

-- Athletes can update relationships they're part of (accept invite)
CREATE POLICY "Athletes can accept invites"
  ON public.coach_athlete_relationships FOR UPDATE
  USING (athlete_id = auth.uid())
  WITH CHECK (athlete_id = auth.uid());

-- Anyone authenticated can look up an invite code (to accept it)
CREATE POLICY "Authenticated users can lookup invite codes"
  ON public.coach_athlete_relationships FOR SELECT
  USING (
    auth.uid() IS NOT NULL
    AND status = 'pending'
    AND athlete_id IS NULL
  );
