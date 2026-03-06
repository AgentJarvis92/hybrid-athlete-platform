# Trainer Input — Joel

**Date:** 2026-03-05
**Source:** Kevin's trainer Joel, via group chat

This document captures expert trainer feedback that directly shapes product decisions.

---

## Exercise Library

- Must include **video demos + written descriptions** for every exercise
- Trainer portal needs **drag-and-drop** workout builder — not just a list picker
- Rich media attached to each exercise is non-negotiable for usability

---

## Workout Structure & Formatting

- Workouts must support **mixed formats** in a single session: straight sets, circuits, and complexes
- Sessions need **section labels** as first-class structural elements: Warm-Up / Work / Cool-Down
- Trainer's style dictates format — the app must not force a single template

---

## Nutrition ↔ Performance Link

- What you eat the day before directly affects the next day's output — especially on heavy compound lifts and long runs
- Heavy lifts demand a lot of energy, especially on big muscle groups
- The AI cross-domain layer (training load → calorie targets) validates this
- Undereating trends should flag to both athlete and trainer

---

## Progressive Overload & Regressions

- Strength logging must **suggest the next set's target weight** based on RPE and completed vs. prescribed reps
- App should **project next week's progression** (e.g. "Hit 185x5 clean → next week aim for 190x5")
- **Deload weeks should trigger automatically** after sustained progressive load
- Athlete always knows whether it's a progression week or a deload week — and why
- Trainer sets the progression model (linear, wave, percentage-based, RPE-based), app enforces the micro-decisions between sessions
- This turns the strength module from a tracker into a **coaching tool**

---

## Periodization, Blocks & Recovery

- App must understand **training blocks and phases** — not just individual workouts
- Recovery is not binary: **active rest vs. sedentary rest** depends on the style of lift or run
- **Race prep** should be tailored to strengthen specific weaknesses and reduce injury risk
- Phase context must be architected in from the start, even if race-prep AI lands in Phase 3

---

## Open Questions from Trainer Input

- [ ] Progression model options to expose to trainer: linear, wave, percentage-based, RPE-based?
- [ ] Deload trigger logic: auto (based on load metrics) or trainer-controlled toggle?
- [ ] How does the trainer specify active vs. sedentary recovery on a rest day?
