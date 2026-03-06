# MVP Specification — Hybrid Athlete Training Platform

**Updated:** 2026-03-05

---

## MVP Goal

Build the smallest complete system that proves the core concept: one platform that unifies running, strength, and nutrition while allowing coaches to program and monitor athletes.

The MVP must already be capable of replacing separate running, strength, and nutrition apps.

---

## Core MVP Capabilities

1. **Unified training dashboard** — full day view (workouts + nutrition + recovery)
2. **Coach programming** — create weekly programs, assign to athletes
3. **Strength workout execution** — log sets/reps/weight in real time
4. **Run data integration** — auto-import from Strava or Apple Health
5. **Nutrition logging** — log meals, track calories and macros
6. **Training Brain** — daily briefing based on training and recovery data
7. **Messaging** — coaches and athletes communicate inside the app

---

## Athlete App

### TODAY DASHBOARD (primary screen)

Shows the athlete's full day. Example:
```
Today

Run         6 miles easy | Target pace 9:15
Strength    Upper body workout | 5 exercises
Nutrition   2500 cal | Carbs 300g | Protein 150g
Recovery    Sleep 7h | Readiness: Moderate
```
Athletes start workouts or log meals directly from this screen.

### WEEKLY TRAINING CALENDAR

Full week view. Selecting a session opens workout details.
```
Mon  Easy run
Tue  Lower body strength
Wed  Intervals
Thu  Rest
Fri  Upper body strength
Sat  Long run
Sun  Recovery
```

### STRENGTH WORKOUT EXECUTION

Structured exercise interface. Exercise card example:
```
Bench Press
3 sets | 5 reps | Target: 165 lbs

[ Log Weight ]  [ Complete Set ]  [ Rest Timer ]

Previous: 160 lbs x 5
```

### RUN DATA IMPORT

Auto-import from Strava or Apple Health.
Imported data: distance, pace, duration, heart rate.
System matches imported runs to scheduled workouts.

### NUTRITION SYSTEM

Input methods: food search, barcode scan, manual entry.
Tracked: calories, protein, carbohydrates, fat.
Progress displayed against daily targets.

**Training-aware targets:**
- Long run day → increase carbohydrates
- Heavy strength session → increase calories
- Rest day → reduce calories

### RECOVERY METRICS

Pulled from Apple Health: sleep duration, resting heart rate.
Generates a simple readiness score (e.g. "Readiness: 82%").

### TRAINING BRAIN (Signature Feature)

Morning daily briefing based on full training context:
```
Good morning Kevin

Readiness: 81%

Yesterday
18 mile long run completed
Calories 600 below target

Today
Run: Recovery run 4 miles
Strength: Upper body
Nutrition: 2800 cal | Carbs 420g
```

### ONBOARDING FLOW

- Training goal
- Race distance + race date
- Training days per week
- Experience level
- Modules to enable (Running / Strength / Nutrition)

---

## Coach Portal (Web)

### PROGRAM BUILDER
Coaches create weekly programs with workouts containing exercises or run instructions. Assign programs to athletes.

### ATHLETE MONITORING
Coaches view: workout completion rate, weekly running mileage, strength workouts completed, nutrition adherence.

### MESSAGING
Direct messages + workout comments between coach and athlete.

---

## Integrations
- **Strava** — run imports
- **Apple Health** — heart rate, sleep data

---

## MVP Exclusions (Future Phases)
- Course-specific race modeling
- HYROX training engine
- Advanced AI plan adaptation
- Coach marketplace
- Community / social features
- GPS run tracking (in-app)

---

## Success Criteria

Hybrid athletes can replace their separate running, strength, and nutrition apps with this single platform.
