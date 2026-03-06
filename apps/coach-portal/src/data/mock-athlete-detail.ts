import type { AthleteDetailData } from "@/types/athlete";

export const sarahLeeDetail: AthleteDetailData = {
  athlete: {
    id: "sl",
    name: "Sarah Lee",
    initials: "SL",
    type: "Hybrid Athlete",
    state: "FATIGUE RISK",
    stateBadgeColor: "red",
    recovery: 34,
    load: 97,
    nutrition: 61,
    integrations: [
      { name: "Strava", connected: true },
      { name: "Apple Health", connected: true },
      { name: "Garmin", connected: false },
    ],
  },

  stateSummary: {
    currentState: "Fatigue Risk",
    stateColor: "#FF4D4D",
    stateSubtext: "Load high · Rec suppressed",
    trainingLoad: 97,
    trainingLoadUnit: "ATL",
    trainingLoadTrend: "+18% vs last week",
    trainingLoadColor: "#FF4D4D",
    recoveryScore: 34,
    recoverySubtext: "Sleep + HRV down",
    recoveryColor: "#FF4D4D",
    nutritionAdherence: 61,
    nutritionSubtext: "Hydration below target",
    nutritionColor: "#FACC15",
    adaptationStatus: "Stalled",
    adaptationColor: "#FB923C",
    adaptationNote: "Stress rising faster than recovery response — fueling consistency may be limiting adaptation",
    adaptationPosition: 3,
  },

  coachSignals: [
    {
      id: "cs1",
      title: "Recovery Trending Down",
      description: "HRV and sleep quality declining consecutively. Recovery window may be closing before next key session.",
      severity: "red",
      tag: "DAY 3",
      actionLabel: "Review Sleep Data →",
    },
    {
      id: "cs2",
      title: "Acute Load Spike",
      description: "Weekly load rose 18% above 7-day average — approaching elevated injury risk threshold. May need attention.",
      severity: "red",
      tag: "A:C 1.4",
      actionLabel: "Adjust Volume →",
    },
    {
      id: "cs3",
      title: "Possible Under-fueling Pattern",
      description: "Caloric intake averaging below expenditure estimate. Adaptation appears suppressed — may be limiting training response.",
      severity: "yellow",
      tag: "~400kcal",
      actionLabel: "Message Athlete →",
    },
    {
      id: "cs4",
      title: "Posterior Chain Stress Concentration",
      description: "Repeated lower-body loading without adequate recovery interval. Consider modality shift or targeted deload.",
      severity: "yellow",
      tag: "7 DAYS",
      actionLabel: "Modify Plan →",
    },
  ],

  bodyLoadCallouts: [
    {
      severity: "red",
      title: "Posterior Chain Stress Elevated",
      description: "Hamstrings and glutes showing repeated high load over 7 days. Deload may be warranted.",
    },
    {
      severity: "red",
      title: "Lower Body Concentration High",
      description: "Lower body stress exceeds current program balance. Consider modality shift.",
    },
    {
      severity: "yellow",
      title: "Upper Pull Below Target",
      description: "Upper back and pulling exposure tracking below program intent this week.",
    },
  ],

  training: {
    weeklyLoad: 97,
    loadColor: "#FF4D4D",
    sessionsCompleted: 5,
    sessionsTotal: 6,
    sparkData: [40, 65, 55, 80, 70, 95, 85],
    acRatio: 1.4,
    acColor: "#FF4D4D",
  },

  recovery: {
    readinessScore: 34,
    readinessColor: "#FF4D4D",
    hrv: [4, 6, 8, 12, 16, 22, 24],
    hrvStart: 58,
    hrvEnd: 44,
    sleepAvg: 5.2,
    sleepTarget: 8,
    fatigueState: "Elevated",
    fatigueColor: "#FF4D4D",
  },

  nutrition: {
    adherence: 61,
    calories: 1840,
    caloriesTarget: 2940,
    protein: 142,
    proteinTarget: 185,
    hydration: 2.1,
    hydrationTarget: 3.5,
    fuelingPattern: "~400kcal below target",
  },

  recentSessions: [
    {
      id: "rs1",
      name: "Conditioning Circuit",
      type: "Conditioning",
      duration: "45 min",
      load: "72 TSS",
      outcome: "high-rpe",
      note: "RPE above target — reported heavy legs",
    },
    {
      id: "rs2",
      name: "Tempo Run",
      type: "Tempo Session",
      duration: "60 min",
      load: "85 TSS",
      outcome: "completed",
      note: "Pace target met, effort controlled",
    },
    {
      id: "rs3",
      name: "Strength A",
      type: "Strength Session",
      duration: "75 min",
      load: "65 TSS",
      outcome: "reduced-output",
      note: "Output reduced, lower body fatigue noted",
    },
    {
      id: "rs4",
      name: "Mobility Flow",
      type: "Mobility Flow",
      duration: "30 min",
      load: "15 TSS",
      outcome: "skipped",
      note: "Session missed — scheduling conflict",
    },
    {
      id: "rs5",
      name: "Endurance Ride",
      type: "Endurance Session",
      duration: "90 min",
      load: "110 TSS",
      outcome: "strong",
      note: "Strong aerobic response, HR stable",
    },
  ],

  coachNotes: {
    currentFocus: "Manage fatigue accumulation before next build block.",
    goal: "Maintain strength, increase aerobic base.",
    nextReview: "Friday, Oct 28",
  },

  flags: {
    critical: ["Load Spike", "Posterior Chain Stress", "Recovery Suppressed"],
    monitor: ["Low Hydration", "Poor Sleep", "Under-fueling", "Low Protein"],
  },

  interventions: [
    {
      id: "i1",
      text: "Load reduced 10%",
      date: "Today · 9:30 AM",
      statusNote: "compliance improving",
      statusColor: "green",
      active: true,
    },
    {
      id: "i2",
      text: "Hydration target increased",
      date: "Mon · 2 days ago",
      statusNote: "tracking below target",
      statusColor: "gray",
      active: false,
    },
    {
      id: "i3",
      text: "Recovery emphasis added",
      date: "Last Week",
      statusNote: "sleep trending up slightly",
      statusColor: "green",
      active: false,
    },
  ],
};

export const mockAthleteRoster = [
  { id: "sl", name: "Sarah Lee", initials: "SL" },
  { id: "jd", name: "John Doe", initials: "JD" },
  { id: "ec", name: "Emily Chen", initials: "EC" },
];
