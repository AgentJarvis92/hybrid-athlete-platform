export type AthleteState = "Peak" | "Building" | "Ready" | "Fatigued" | "Fatigue Risk" | "At Risk";
export type AdaptationStatus = "Under" | "Adapting" | "Improving" | "Stalled" | "Overreaching";
export type SignalSeverity = "red" | "yellow";
export type SessionOutcome = "completed" | "high-rpe" | "reduced-output" | "skipped" | "strong";
export type FlagSeverity = "red" | "yellow" | "blue";

export interface Integration {
  name: string;
  connected: boolean;
}

export interface AthleteDetail {
  id: string;
  name: string;
  initials: string;
  type: string;
  state: string;
  stateBadgeColor: "red" | "yellow" | "green" | "blue" | "gray";
  recovery: number;
  load: number;
  nutrition: number;
  integrations: Integration[];
}

export interface AthleteStateSummary {
  currentState: string;
  stateColor: string;
  stateSubtext: string;
  trainingLoad: number;
  trainingLoadUnit: string;
  trainingLoadTrend: string;
  trainingLoadColor: string;
  recoveryScore: number;
  recoverySubtext: string;
  recoveryColor: string;
  nutritionAdherence: number;
  nutritionSubtext: string;
  nutritionColor: string;
  adaptationStatus: AdaptationStatus;
  adaptationColor: string;
  adaptationNote: string;
  adaptationPosition: number; // 0=Under, 1=Adapting, 2=Improving, 3=Stalled, 4=Overreaching
}

export interface CoachSignal {
  id: string;
  title: string;
  description: string;
  severity: SignalSeverity;
  tag: string;
  actionLabel: string;
}

export interface BodyLoadCallout {
  severity: "red" | "yellow" | "lime";
  title: string;
  description: string;
}

export interface PillarTraining {
  weeklyLoad: number;
  loadColor: string;
  sessionsCompleted: number;
  sessionsTotal: number;
  sparkData: number[];
  acRatio: number;
  acColor: string;
}

export interface HRVPoint {
  value: number;
}

export interface PillarRecovery {
  readinessScore: number;
  readinessColor: string;
  hrv: number[];
  hrvStart: number;
  hrvEnd: number;
  sleepAvg: number;
  sleepTarget: number;
  fatigueState: string;
  fatigueColor: string;
}

export interface PillarNutrition {
  adherence: number;
  calories: number;
  caloriesTarget: number;
  protein: number;
  proteinTarget: number;
  hydration: number;
  hydrationTarget: number;
  fuelingPattern: string;
}

export interface RecentSession {
  id: string;
  name: string;
  type: string;
  duration: string;
  load: string;
  outcome: SessionOutcome;
  note: string;
}

export interface CoachNote {
  currentFocus: string;
  goal: string;
  nextReview: string;
}

export interface ActiveFlags {
  critical: string[];
  monitor: string[];
  lowPriority?: string[];
}

export interface Intervention {
  id: string;
  text: string;
  date: string;
  statusNote: string;
  statusColor: "green" | "gray" | "red";
  active: boolean;
}

export interface AthleteDetailData {
  athlete: AthleteDetail;
  stateSummary: AthleteStateSummary;
  coachSignals: CoachSignal[];
  bodyLoadCallouts: BodyLoadCallout[];
  training: PillarTraining;
  recovery: PillarRecovery;
  nutrition: PillarNutrition;
  recentSessions: RecentSession[];
  coachNotes: CoachNote;
  flags: ActiveFlags;
  interventions: Intervention[];
}
