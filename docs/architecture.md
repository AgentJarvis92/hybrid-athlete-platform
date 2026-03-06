# System Architecture — Hybrid Athlete Training Platform

**Created:** 2026-03-05
**Phase:** 1 — MVP Foundation

---

## 1. Technical Stack

### Mobile App (Athlete)
| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Framework | **React Native + Expo** | JS/TS ecosystem, OTA updates, Expo simplifies native modules |
| Navigation | React Navigation v7 | Standard for RN, supports tabs + stack |
| State | Zustand + React Query | Lightweight global state + server state/caching |
| UI | Tailwind (NativeWind) | Consistent styling, rapid iteration |
| Charts | Victory Native | Training progress visualizations |
| Barcode | expo-barcode-scanner | Nutrition barcode scanning |
| Health Data | react-native-health | Apple Health integration (sleep, HR, workouts) |

### Coach Portal (Web)
| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Framework | **Next.js 14** (App Router) | SSR, API routes, Kevin's team knows it |
| UI | Tailwind CSS + shadcn/ui | Rapid component development, clean design system |
| State | React Query + Zustand | Same pattern as mobile for shared mental model |
| Drag & Drop | dnd-kit | Program builder drag-and-drop (Joel's requirement) |
| Charts | Recharts | Athlete monitoring dashboards |
| Realtime | Supabase Realtime | Live messaging, workout updates |

### Backend
| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Database | **Supabase (PostgreSQL)** | Already in use for Maitreo/Salita, RLS, realtime built in |
| Auth | Supabase Auth | Email/password + OAuth (Google, Apple) |
| API | Supabase Edge Functions (Deno) | Serverless business logic, no separate backend to deploy |
| File Storage | Supabase Storage | Exercise demo videos, profile photos |
| Realtime | Supabase Realtime | Messaging, live workout sync, program push |
| Cron | Supabase pg_cron | Training Brain daily generation |

### AI & Data
| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Training Brain | **OpenAI GPT-4o** | Daily briefing generation from training context |
| Food Photo (Phase 2) | OpenAI GPT-4o Vision | Photo → calorie/macro estimation |
| Voice (Phase 2) | Whisper API | Voice → food item parsing |
| Food Database | **USDA FoodData Central** + **Open Food Facts** | Comprehensive, free, barcode support |

### Integrations
| Service | Method | Data |
|---------|--------|------|
| **Strava** | OAuth2 + Webhooks | Run imports (distance, pace, HR, splits) |
| **Apple Health** | HealthKit (on-device) | Sleep, resting HR, workout data |
| Garmin (Phase 2) | Garmin Connect API | Watch data |

### Hosting
| Component | Platform |
|-----------|---------|
| Supabase | Supabase Cloud (managed) |
| Coach Portal | **Vercel** (natural fit for Next.js) |
| Edge Functions | Supabase Edge (Deno Deploy) |
| Mobile | Expo EAS Build → App Store / TestFlight |

---

## 2. System Architecture

```
┌─────────────────────────────────────────────────────┐
│                    CLIENTS                           │
│                                                      │
│  ┌──────────────┐          ┌──────────────────┐     │
│  │ Athlete App  │          │  Coach Portal    │     │
│  │ React Native │          │  Next.js (Web)   │     │
│  │ + Expo       │          │  + Vercel        │     │
│  └──────┬───────┘          └────────┬─────────┘     │
│         │                           │                │
└─────────┼───────────────────────────┼────────────────┘
          │                           │
          ▼                           ▼
┌─────────────────────────────────────────────────────┐
│                 SUPABASE LAYER                       │
│                                                      │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────┐ │
│  │    Auth      │  │   Realtime   │  │  Storage   │ │
│  │ (JWT + RLS)  │  │ (WebSocket)  │  │ (Files)    │ │
│  └─────────────┘  └──────────────┘  └────────────┘ │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │           PostgreSQL Database                 │   │
│  │   (RLS policies per user role)                │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │          Edge Functions (Deno)                 │   │
│  │                                               │   │
│  │  • training-brain     (daily briefing gen)    │   │
│  │  • nutrition-targets  (training-aware macros) │   │
│  │  • strava-webhook     (run import handler)    │   │
│  │  • onboarding         (profile + plan setup)  │   │
│  │  • food-search        (USDA + OFF lookup)     │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  ┌──────────────┐                                   │
│  │   pg_cron    │ ← Triggers Training Brain daily   │
│  └──────────────┘                                   │
│                                                      │
└─────────────────────────────────────────────────────┘
          │                    │
          ▼                    ▼
┌──────────────┐     ┌──────────────────┐
│   Strava     │     │   OpenAI API     │
│   (OAuth +   │     │   (GPT-4o for    │
│   Webhooks)  │     │   Training Brain)│
└──────────────┘     └──────────────────┘
```

### Key Architecture Decisions

**Supabase as the entire backend.** No custom Node/Express server. Auth, database, realtime, storage, and serverless functions all from one platform. Reduces infrastructure complexity and cost.

**Row Level Security (RLS).** Every table has RLS policies. Athletes see only their data. Coaches see only their assigned athletes' data. No data leakage between users.

**Realtime for messaging and live updates.** Coach pushes a program → athlete sees it instantly via Supabase Realtime subscription. Messaging works the same way.

**Edge Functions for business logic.** Training Brain generation, nutrition target calculation, Strava webhook processing — all serverless. No always-on server cost.

**pg_cron for scheduled jobs.** Training Brain briefings generate daily at 5 AM user timezone. Triggered by pg_cron calling the edge function.

---

## 3. Project Folder Structure

```
hybrid-athlete-platform/
│
├── package.json                    # Monorepo root (pnpm workspaces)
├── pnpm-workspace.yaml
├── turbo.json                      # Turborepo config
├── .env.example
├── .gitignore
│
├── apps/
│   ├── mobile/                     # React Native (Expo) — Athlete App
│   │   ├── app/                    # Expo Router file-based routing
│   │   │   ├── (tabs)/             # Tab navigator
│   │   │   │   ├── today.tsx       # Screen 1: Today Dashboard
│   │   │   │   ├── training.tsx    # Screen 2: Training Calendar
│   │   │   │   ├── nutrition.tsx   # Screen 5: Nutrition Logger
│   │   │   │   ├── progress.tsx    # Screen 6: Progress Dashboard
│   │   │   │   └── messages.tsx    # Screen 7: Messages
│   │   │   ├── workout/
│   │   │   │   ├── [id].tsx        # Screen 3: Workout Details
│   │   │   │   └── execute/[id].tsx # Screen 4: Workout Execution
│   │   │   ├── settings.tsx        # Screen 8: Settings
│   │   │   ├── onboarding/         # Onboarding flow screens
│   │   │   └── _layout.tsx         # Root layout
│   │   ├── components/
│   │   │   ├── today/              # Dashboard cards
│   │   │   ├── workout/            # Exercise cards, set logger, rest timer
│   │   │   ├── nutrition/          # Food search, barcode, meal card
│   │   │   ├── calendar/           # Weekly view components
│   │   │   ├── messages/           # Chat components
│   │   │   └── ui/                 # Shared UI primitives
│   │   ├── hooks/                  # Custom hooks (useWorkout, useNutrition, etc.)
│   │   ├── lib/
│   │   │   ├── supabase.ts         # Supabase client
│   │   │   ├── strava.ts           # Strava OAuth helpers
│   │   │   └── health.ts           # Apple Health wrappers
│   │   ├── stores/                 # Zustand stores
│   │   ├── app.json
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── coach-portal/               # Next.js — Coach Web Portal
│       ├── app/
│       │   ├── (auth)/
│       │   │   ├── login/page.tsx
│       │   │   └── register/page.tsx
│       │   ├── (dashboard)/
│       │   │   ├── page.tsx          # Screen 1: Coach Dashboard
│       │   │   ├── athletes/
│       │   │   │   ├── page.tsx      # Screen 2: Athlete List
│       │   │   │   └── [id]/page.tsx # Screen 3: Athlete Profile
│       │   │   ├── programs/
│       │   │   │   ├── page.tsx      # Program list
│       │   │   │   ├── [id]/page.tsx # Screen 4: Program Builder
│       │   │   │   └── new/page.tsx
│       │   │   ├── workouts/
│       │   │   │   ├── [id]/page.tsx # Screen 5: Workout Builder
│       │   │   │   └── new/page.tsx
│       │   │   └── messages/
│       │   │       └── page.tsx      # Screen 6: Messaging
│       │   └── layout.tsx
│       ├── components/
│       │   ├── program-builder/      # Drag-and-drop weekly view
│       │   ├── workout-builder/      # Exercise selection, sections
│       │   ├── athlete/              # Profile cards, metrics
│       │   ├── messages/             # Chat interface
│       │   └── ui/                   # shadcn/ui components
│       ├── lib/
│       │   └── supabase.ts
│       ├── package.json
│       └── tsconfig.json
│
├── packages/
│   ├── shared/                      # Shared between mobile + web
│   │   ├── types/
│   │   │   ├── user.ts
│   │   │   ├── workout.ts
│   │   │   ├── nutrition.ts
│   │   │   ├── training-plan.ts
│   │   │   ├── recovery.ts
│   │   │   ├── message.ts
│   │   │   └── index.ts
│   │   ├── constants/
│   │   │   ├── exercises.ts          # Exercise definitions + metadata
│   │   │   ├── food-categories.ts
│   │   │   └── progression-models.ts
│   │   ├── utils/
│   │   │   ├── nutrition.ts          # Macro calculations
│   │   │   ├── training-load.ts      # Load scoring
│   │   │   └── readiness.ts          # Readiness score calculation
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── supabase/                    # Database + Edge Functions
│       ├── migrations/
│       │   ├── 001_auth_users.sql
│       │   ├── 002_training_plans.sql
│       │   ├── 003_strength_workouts.sql
│       │   ├── 004_runs.sql
│       │   ├── 005_nutrition.sql
│       │   ├── 006_recovery.sql
│       │   ├── 007_training_brain.sql
│       │   ├── 008_messaging.sql
│       │   └── 009_integrations.sql
│       ├── functions/
│       │   ├── training-brain/index.ts
│       │   ├── nutrition-targets/index.ts
│       │   ├── strava-webhook/index.ts
│       │   ├── onboarding/index.ts
│       │   └── food-search/index.ts
│       ├── seed/
│       │   ├── exercises.sql         # Seed exercise library
│       │   └── foods.sql             # Seed common foods
│       ├── config.toml
│       └── package.json
│
└── docs/                            # Spec docs (synced from workspace)
    ├── product-vision.md
    ├── mvp-spec.md
    ├── screen-map.md
    ├── trainer-input.md
    └── architecture.md
```

---

## 4. Phase 1 Development Plan

### Sprint 1 — Foundation (Week 1–2)
**Goal:** Project scaffolding + database + auth

| Task | Details |
|------|---------|
| Monorepo setup | pnpm workspaces + Turborepo |
| Supabase project | Create project, configure auth (email + Apple + Google) |
| DB schema | Write all MVP migrations (19 tables), apply with `supabase db push` |
| RLS policies | Row-level security for all tables (athlete/coach role separation) |
| Seed data | Exercise library (50+ exercises with categories + muscle groups) |
| Mobile scaffold | Expo project, tab navigation, Supabase client, auth screens |
| Coach portal scaffold | Next.js project, shadcn/ui, auth pages, dashboard layout |
| Shared types | TypeScript types matching DB schema |

**Deliverable:** Both apps running locally with auth working. Database fully migrated.

---

### Sprint 2 — Coach Portal Core (Week 3–4)
**Goal:** Coach can build and assign programs

| Task | Details |
|------|---------|
| Program Builder | Weekly view, assign sessions to days, drag-and-drop (dnd-kit) |
| Workout Builder | Section structure (warm-up/main/accessory/cool-down), exercise selection from library, set/rep/target configuration |
| Exercise library UI | Searchable, filterable, with descriptions |
| Athlete list | View all assigned athletes |
| Athlete profile | Training completion, mileage, strength, nutrition metrics (placeholder data) |
| Coach ↔ Athlete linking | Invite flow (code or email) |

**Deliverable:** Coach can create a full weekly program and assign it to an athlete.

---

### Sprint 3 — Athlete App Core (Week 5–6)
**Goal:** Athlete sees and executes coach-programmed workouts

| Task | Details |
|------|---------|
| Today Dashboard | Displays scheduled run, strength session, nutrition targets, recovery summary |
| Training Calendar | Weekly view, workout cards per day |
| Workout Details | Title, coach notes, exercise list, Start Workout button |
| Workout Execution | Exercise cards, set logging (weight/reps), rest timer, previous performance display |
| Realtime sync | Coach pushes program → athlete sees it immediately |
| Onboarding flow | Goal, race, experience, training days, module selection |

**Deliverable:** Athlete opens app, sees today's plan, executes a strength workout, and logs all sets.

---

### Sprint 4 — Nutrition + Recovery + Integrations (Week 7–8)
**Goal:** Nutrition logging and external data flowing in

| Task | Details |
|------|---------|
| Nutrition Logger | Food database search (USDA + OFF), barcode scanner, manual entry |
| Daily targets | Training-aware macro targets (edge function calculates based on scheduled workload) |
| Nutrition display | Progress bars on Today Dashboard (cals, protein, carbs, fat) |
| Strava integration | OAuth2 flow, webhook handler, auto-import runs, match to scheduled sessions |
| Apple Health | Read sleep duration + resting HR on app open |
| Recovery metrics | Display sleep + HR + basic readiness score on Today Dashboard |

**Deliverable:** Athlete logs meals, sees training-adjusted targets, runs import from Strava, sleep/HR data appears.

---

### Sprint 5 — Training Brain + Messaging + Polish (Week 9–10)
**Goal:** Signature feature live, messaging works, ready to ship

| Task | Details |
|------|---------|
| Training Brain | Edge function: pull yesterday's data (workouts, nutrition, sleep) + today's schedule → generate briefing via GPT-4o → store in DB. pg_cron triggers daily. |
| Training Brain UI | Top of Today Dashboard, expandable briefing card |
| Messaging | Realtime chat (Supabase Realtime), direct messages + workout comments |
| Coach messaging UI | Integrated in portal |
| Progress Dashboard | Charts: weekly mileage trend, strength progression, nutrition adherence, completion rate |
| Settings screen | Module toggles, integration management, profile editing |
| Testing + QA | End-to-end flows: onboard → program → execute → log nutrition → view briefing |
| Bug fixes + polish | UI refinement, loading states, error handling, offline resilience |

**Deliverable:** Full MVP functional. Ready for Kevin to train with in June.

---

## Phase 1 Timeline Summary

```
Week 1–2   Foundation      DB + Auth + Scaffolding
Week 3–4   Coach Portal    Program Builder + Workout Builder
Week 5–6   Athlete App     Dashboard + Workout Execution
Week 7–8   Data Layer      Nutrition + Strava + Apple Health
Week 9–10  Intelligence    Training Brain + Messaging + Polish
```

**Start:** March 10, 2026
**MVP Complete:** May 18, 2026
**Buffer:** 2 weeks before June launch
**Launch:** June 1, 2026 — Kevin starts NYC Marathon training

---

## Key Technical Decisions

1. **Expo Router** over React Navigation manual setup — file-based routing, faster scaffolding
2. **pnpm + Turborepo** monorepo — shared types, single repo, parallel builds
3. **Supabase Edge Functions** over dedicated API server — zero infra to manage
4. **RLS-first** security model — data isolation enforced at database level, not application level
5. **Realtime subscriptions** for messaging and live program push — no polling
6. **pg_cron** for Training Brain — runs daily, calls edge function, no external scheduler needed
7. **Vercel** for coach portal — zero-config Next.js deployment, preview deploys for each PR
8. **EAS Build** for mobile — cloud builds, TestFlight distribution, OTA updates via Expo
