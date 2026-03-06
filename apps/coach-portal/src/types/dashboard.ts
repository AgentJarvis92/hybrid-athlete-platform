export type TrendDirection = "up" | "down" | "neutral";

export interface KpiData {
  label: string;
  value: string | number;
  unit?: string;
  trend?: {
    direction: TrendDirection;
    text: string;
  };
  color?: string;
  detail?: string;
  sparkline?: number[];
  progress?: {
    value: number;
    label: string;
  };
  breakdown?: { label: string; value: string; color?: string }[];
}

export type AlertSeverity = "red" | "yellow" | "blue";

export interface AttentionAlert {
  id: string;
  severity: AlertSeverity;
  athlete: string;
  reason: string;
  meta: string;
  metaHighlight?: { text: string; color: string };
  time: string;
  action: string;
}

export type DotColor = "green" | "yellow" | "red";

export interface ReadinessAthlete {
  id: string;
  initials: string;
  name: string;
  x: number; // percentage left
  y: number; // percentage top
  color: DotColor;
  trainingLoad: string;
  recovery: string;
  nutrition: string;
}

export interface TeamInsight {
  label: string;
  value: string | number;
  color: string;
  barPercent: number;
  sub: string;
  trend: {
    direction: TrendDirection;
    text: string;
    color: string;
  };
  unit?: string;
}

export interface ProgramCategory {
  label: string;
  count: number;
  percent: number;
  color: string;
}

export interface FuelSignal {
  label: string;
  value: string | number;
  color: string;
  detail: string;
  dotColor: string;
  dotLabel: string;
  unit?: string;
}

export type NutritionStatus = "on" | "low" | "under";
export type RecoveryLevel = "high" | "mid" | "low";
export type StatusColor = "green" | "yellow" | "red";

export interface RiskBadge {
  text: string;
  type: "high" | "med" | "pr";
}

export interface AthleteSnapshot {
  id: string;
  initials: string;
  name: string;
  badge: RiskBadge;
  lastSession: string;
  weeklyLoad: number;
  weeklyLoadColor: string;
  recovery: { score: number; level: RecoveryLevel; note: string };
  nutrition: { status: NutritionStatus; label: string };
  statusColor: StatusColor;
}

export type FeedIconStyle = "highlight" | "lime" | "green" | "red" | "orange" | "blue";

export interface FeedItem {
  id: string;
  iconStyle: FeedIconStyle;
  dotColor: string;
  athlete: string;
  text: string;
  time: string;
}
