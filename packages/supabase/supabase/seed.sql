-- Phase 1 Seed Data
-- NOTE: These seed users require corresponding auth.users entries.
-- When running locally with `supabase start`, create test users via the Auth UI
-- or use the SQL below after creating auth users.

-- Test UUIDs (deterministic for dev convenience)
-- Coach: 00000000-0000-0000-0000-000000000001
-- Athlete: 00000000-0000-0000-0000-000000000002

-- Insert test auth users (only works in local dev with supabase start)
INSERT INTO auth.users (
  id, instance_id, aud, role, email, encrypted_password,
  email_confirmed_at, created_at, updated_at, confirmation_token, raw_app_meta_data, raw_user_meta_data
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000000',
  'authenticated', 'authenticated',
  'coach@test.com',
  crypt('password123', gen_salt('bf')),
  now(), now(), now(), '',
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Joel Coach"}'
), (
  '00000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000000',
  'authenticated', 'authenticated',
  'athlete@test.com',
  crypt('password123', gen_salt('bf')),
  now(), now(), now(), '',
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Kevin Athlete"}'
) ON CONFLICT (id) DO NOTHING;

-- Insert identities for auth (required by Supabase Auth)
INSERT INTO auth.identities (
  id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000001',
  jsonb_build_object('sub', '00000000-0000-0000-0000-000000000001', 'email', 'coach@test.com'),
  'email', '00000000-0000-0000-0000-000000000001',
  now(), now(), now()
), (
  '00000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000002',
  jsonb_build_object('sub', '00000000-0000-0000-0000-000000000002', 'email', 'athlete@test.com'),
  'email', '00000000-0000-0000-0000-000000000002',
  now(), now(), now()
) ON CONFLICT (provider_id, provider) DO NOTHING;

-- Coach profile
INSERT INTO public.user_profiles (id, full_name, role, timezone, onboarding_completed)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Joel Coach',
  'coach',
  'America/New_York',
  TRUE
) ON CONFLICT (id) DO NOTHING;

-- Athlete profile
INSERT INTO public.user_profiles (id, full_name, role, timezone, onboarding_completed)
VALUES (
  '00000000-0000-0000-0000-000000000002',
  'Kevin Athlete',
  'athlete',
  'America/New_York',
  TRUE
) ON CONFLICT (id) DO NOTHING;

-- Coach-athlete relationship (active)
INSERT INTO public.coach_athlete_relationships (coach_id, athlete_id, status, invite_code)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000002',
  'active',
  'test-invite-001'
) ON CONFLICT DO NOTHING;

-- Module settings for coach (all enabled)
INSERT INTO public.user_module_settings (user_id, module, enabled) VALUES
  ('00000000-0000-0000-0000-000000000001', 'running', TRUE),
  ('00000000-0000-0000-0000-000000000001', 'strength', TRUE),
  ('00000000-0000-0000-0000-000000000001', 'nutrition', TRUE)
ON CONFLICT (user_id, module) DO NOTHING;

-- Module settings for athlete (all enabled)
INSERT INTO public.user_module_settings (user_id, module, enabled) VALUES
  ('00000000-0000-0000-0000-000000000002', 'running', TRUE),
  ('00000000-0000-0000-0000-000000000002', 'strength', TRUE),
  ('00000000-0000-0000-0000-000000000002', 'nutrition', TRUE)
ON CONFLICT (user_id, module) DO NOTHING;
