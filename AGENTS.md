# Hybrid Athlete Training Platform — Agent Instructions

## Project Overview
All-in-one fitness app: running + strength + nutrition with trainer web portal.
Replaces Runna, Hevy, Cronometer, Cal AI.

## Source of Truth
All spec documents are in `/docs/`:
- `product-vision.md` — full product vision
- `mvp-spec.md` — MVP features and exclusions
- `mvp-build-phases.md` — 4-phase build plan
- `screen-map.md` — every screen (athlete + coach)
- `trainer-input.md` — expert trainer feedback
- `architecture.md` — tech stack, system design, folder structure

**Read these before writing any code.**

## Current Phase: Phase 1 — Platform Foundation

Phase 1 scope ONLY:
- User accounts (athlete + coach roles)
- Coach–athlete relationships
- Module configuration (running / strength / nutrition)
- Onboarding flow
- Integration setup (Strava / Apple Health)

DO NOT BUILD (later phases):
- Workout execution or strength logging
- Nutrition tracking or food database
- Training Brain / AI briefing
- Race-specific training
- GPS run tracking

## Tech Stack
- **Mobile:** React Native + Expo (Expo Router)
- **Coach Portal:** Next.js 14 (App Router)
- **Backend:** Supabase (Auth, PostgreSQL, Realtime, Edge Functions, Storage)
- **Monorepo:** pnpm + Turborepo
- **UI (mobile):** NativeWind (Tailwind for RN)
- **UI (web):** Tailwind CSS + shadcn/ui
- **Deploy:** Render (for now)

## Project Structure
```
hybrid-athlete-platform/
├── apps/
│   ├── mobile/          # React Native (Expo) — Athlete App
│   └── coach-portal/    # Next.js — Coach Web Portal
├── packages/
│   ├── shared/          # Shared types, constants, utils
│   └── supabase/        # Migrations, edge functions, seed data
└── docs/                # Spec documents (source of truth)
```

## Rules
- Follow MVP spec exactly — no scope creep
- Complete Phase 1 before moving to Phase 2
- Use TypeScript everywhere
- All tables need Row Level Security (RLS)
- Test everything end-to-end before marking done
