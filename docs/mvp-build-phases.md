# MVP Build Phases — Hybrid Athlete Training Platform

**Created:** 2026-03-05
**Rule:** Complete each phase before moving to the next. Each phase produces a working system.

---

## Phase 1 — Platform Foundation

**Goal:** Create the core infrastructure of the platform.

### Systems
- User accounts (athlete + coach roles)
- Coach–athlete relationships
- Module settings (running, strength, nutrition)
- Basic onboarding flow

### Database Tables
- `users`
- `user_profiles`
- `coach_athlete_relationships`
- `user_module_settings`

### Athlete App Screens
- Onboarding
- Settings

### Coach Portal Screens
- Coach Dashboard
- Athlete List

### Integrations Setup
- Strava connection
- Apple Health connection

**No workouts or nutrition yet.**

---

## Phase 2 — Training System

**Goal:** Enable coaches to create programs and athletes to execute workouts.

### Systems
- Training plans
- Scheduled sessions
- Strength workouts
- Run workouts

### Database Tables
- `training_plans`
- `training_blocks`
- `training_weeks`
- `scheduled_sessions`
- `session_notes`
- `exercise_library`
- `strength_workout_definitions`
- `strength_workout_exercises`
- `completed_strength_sessions`
- `completed_strength_sets`
- `completed_runs`

### Athlete App Screens
- Today Dashboard (basic)
- Training Calendar
- Workout Details
- Workout Execution

### Coach Portal Screens
- Program Builder
- Workout Builder
- Athlete Profile

---

## Phase 3 — Nutrition System

**Goal:** Enable macro tracking and training-aware fueling.

### Systems
- Food database
- Meal logging
- Daily macro targets

### Database Tables
- `food_items`
- `meals`
- `meal_items`
- `daily_nutrition_targets`
- `daily_nutrition_summaries`

### Athlete App Screens
- Nutrition Logger
- Nutrition progress (on Today Dashboard)

### Training-Aware Nutrition Logic
- Long run day → increase carbs
- Heavy lift day → increase calories
- Rest day → reduce calories

---

## Phase 4 — Training Brain

**Goal:** Deliver the intelligent daily briefing feature.

### Inputs
- Runs
- Strength sessions
- Nutrition adherence
- Sleep metrics

### Database Tables
- `body_metrics`
- `daily_recovery_scores`
- `daily_training_loads`
- `training_brain_briefings`
- `ai_recommendations`

### Output
Daily briefing displayed on the Today screen.

```
Good morning Kevin

Readiness 81%

Yesterday
18 mile run completed
Calories below target

Today
Recovery run
Upper body strength
Increase carbs tonight
```

---

## Post-MVP Exclusions

Do NOT implement during MVP:
- Race-specific course modeling
- HYROX event engine
- AI schedule reshuffling
- Coach marketplace
- Community features

---

## Phase → Timeline Mapping

| Phase | Target |
|-------|--------|
| Phase 1 — Platform Foundation | March 2026 |
| Phase 2 — Training System | April 2026 |
| Phase 3 — Nutrition System | May 2026 |
| Phase 4 — Training Brain | Late May 2026 |
| **MVP Launch** | **June 1, 2026** |
