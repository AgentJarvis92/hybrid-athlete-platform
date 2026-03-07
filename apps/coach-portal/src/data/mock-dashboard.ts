import type {
  KpiData,
  AttentionAlert,
  ReadinessAthlete,
  TeamInsight,
  ProgramCategory,
  FuelSignal,
  AthleteSnapshot,
  FeedItem,
} from "@/types/dashboard";

export const kpiCards: KpiData[] = [
  {
    label: "Total Athletes",
    value: 24,
    color: "#D4AF37",
    trend: { direction: "up", text: "+2 this week" },
    breakdown: [
      { label: "active", value: "18", color: "#22C55E" },
      { label: "inactive", value: "6" },
    ],
  },
  {
    label: "Active This Week",
    value: 18,
    unit: "/ 24",
    progress: { value: 75, label: "Participation rate" },
    sparkline: [40, 60, 45, 80, 30, 90, 50],
  },
  {
    label: "Avg Training Load",
    value: 71,
    unit: "ATL",
    trend: { direction: "up", text: "+12% WoW" },
  },
  {
    label: "Nutrition Adherence",
    value: 82,
    unit: "%",
    color: "#00FF85",
    trend: { direction: "up", text: "+5% vs last week" },
    detail: "20 of 24 within targets",
  },
];

export const readinessAthletes: ReadinessAthlete[] = [
  { id: "1", initials: "JD", name: "John Doe", x: 82, y: 13, color: "green", trainingLoad: "82 ATL", recovery: "87%", nutrition: "On Target" },
  { id: "2", initials: "EC", name: "Emily Chen", x: 91, y: 21, color: "green", trainingLoad: "91 ATL", recovery: "79%", nutrition: "On Target" },
  { id: "3", initials: "MR", name: "Mike Ross", x: 38, y: 48, color: "yellow", trainingLoad: "38 ATL", recovery: "52%", nutrition: "Low Protein" },
  { id: "4", initials: "SL", name: "Sarah Lee", x: 90, y: 67, color: "red", trainingLoad: "97 ATL", recovery: "34%", nutrition: "Hydration ↓" },
  { id: "5", initials: "AP", name: "Alex Park", x: 65, y: 28, color: "green", trainingLoad: "68 ATL", recovery: "81%", nutrition: "On Target" },
  { id: "6", initials: "TH", name: "Tom Hill", x: 54, y: 41, color: "yellow", trainingLoad: "44 ATL", recovery: "61%", nutrition: "Low Protein" },
  { id: "7", initials: "LW", name: "Lisa Ward", x: 22, y: 19, color: "green", trainingLoad: "22 ATL", recovery: "88%", nutrition: "On Target" },
  { id: "8", initials: "DO", name: "Dan O'Brien", x: 72, y: 73, color: "red", trainingLoad: "78 ATL", recovery: "28%", nutrition: "Under-fueling" },
];

export const attentionAlerts: AttentionAlert[] = [
  {
    id: "1",
    severity: "red",
    athlete: "Sarah Lee",
    athleteId: "sl",
    reason: "Training load spike · 97 ATL",
    meta: "Rec 34% · Hydration low",
    metaHighlight: { text: "CRITICAL", color: "#FF4D4D" },
    time: "Today",
    action: "Review",
  },
  {
    id: "2",
    severity: "red",
    athlete: "Dan O'Brien",
    reason: "Overreach risk · Rec 28%",
    meta: "Load 78 ATL",
    metaHighlight: { text: "HIGH RISK", color: "#FF4D4D" },
    time: "2h ago",
    action: "Review",
  },
  {
    id: "3",
    severity: "yellow",
    athlete: "Mike Ross",
    reason: "Under-fueling · Low protein",
    meta: "Nutrition 58%",
    metaHighlight: { text: "MODERATE", color: "#FACC15" },
    time: "4h ago",
    action: "Review",
  },
  {
    id: "4",
    severity: "blue",
    athlete: "Tom Hill",
    reason: "2 sessions missed this week",
    meta: "Last activity: 3 days ago",
    time: "3d ago",
    action: "Message",
  },
];

export const teamInsights: TeamInsight[] = [
  {
    label: "Athletes Improving",
    value: 11,
    color: "#00FF85",
    barPercent: 46,
    sub: "Combined training + recovery trend",
    trend: { direction: "up", text: "+3 vs last week", color: "#00FF85" },
  },
  {
    label: "Athletes At Risk",
    value: 4,
    color: "#FF4D4D",
    barPercent: 16,
    sub: "Fatigue, load spike, or under-fueling",
    trend: { direction: "down", text: "+1 vs last week", color: "#FF4D4D" },
  },
  {
    label: "Avg Recovery Trend",
    value: 74,
    unit: "%",
    color: "#4DA3FF",
    barPercent: 74,
    sub: "HRV + sleep + fatigue signals",
    trend: { direction: "up", text: "+4% this week", color: "#4DA3FF" },
  },
  {
    label: "Nutrition Trend",
    value: 82,
    unit: "%",
    color: "#00FF85",
    barPercent: 82,
    sub: "Athletes meeting calorie + protein targets",
    trend: { direction: "up", text: "+5% vs last week", color: "#00FF85" },
  },
];

export const programCategories: ProgramCategory[] = [
  { label: "Endurance", count: 48, percent: 80, color: "#D4AF37" },
  { label: "Strength", count: 33, percent: 55, color: "#4DA3FF" },
  { label: "Conditioning", count: 23, percent: 38, color: "#FB923C" },
  { label: "Mobility", count: 15, percent: 25, color: "#FACC15" },
  { label: "Recovery", count: 12, percent: 20, color: "#22C55E" },
];

export const fuelSignals: FuelSignal[] = [
  { label: "On Target", value: 19, color: "#00FF85", detail: "Athletes meeting all nutrition targets", dotColor: "#00FF85", dotLabel: "79% of roster" },
  { label: "Under Fueling", value: 3, color: "#FACC15", detail: "Below daily calorie target", dotColor: "#FACC15", dotLabel: "Avg −340 kcal" },
  { label: "Low Protein", value: 4, color: "#FB923C", detail: "Below protein threshold", dotColor: "#FB923C", dotLabel: "Avg −22g / day" },
  { label: "Hydration Low", value: 2, color: "#FF4D4D", detail: "Below hydration minimum", dotColor: "#FF4D4D", dotLabel: "Flag: Sarah, Mike" },
  { label: "Avg Calories", value: "2,840", color: "#F5F7FA", detail: "Team avg daily intake", dotColor: "#D4AF37", dotLabel: "Target: 2,900" },
  { label: "Avg Protein", value: 178, unit: "g", color: "#F5F7FA", detail: "Team avg protein intake", dotColor: "#D4AF37", dotLabel: "Target: 185g" },
];

export const athleteSnapshots: AthleteSnapshot[] = [
  {
    id: "1", initials: "JD", name: "John Doe",
    badge: { text: "PR", type: "pr" },
    lastSession: "Tempo Session",
    weeklyLoad: 82, weeklyLoadColor: "#D4AF37",
    recovery: { score: 87, level: "high", note: "HRV ↑" },
    nutrition: { status: "on", label: "On Target" },
    statusColor: "green",
  },
  {
    id: "2", initials: "EC", name: "Emily Chen",
    badge: { text: "PEAK", type: "pr" },
    lastSession: "Power Intervals",
    weeklyLoad: 91, weeklyLoadColor: "#FB923C",
    recovery: { score: 79, level: "high", note: "Sleep ↑" },
    nutrition: { status: "on", label: "On Target" },
    statusColor: "green",
  },
  {
    id: "3", initials: "MR", name: "Mike Ross",
    badge: { text: "FATIGUE", type: "med" },
    lastSession: "Aerobic Session",
    weeklyLoad: 38, weeklyLoadColor: "#FACC15",
    recovery: { score: 52, level: "mid", note: "Fatigue ↑" },
    nutrition: { status: "low", label: "Low Protein" },
    statusColor: "yellow",
  },
  {
    id: "4", initials: "SL", name: "Sarah Lee",
    badge: { text: "LOAD SPIKE", type: "high" },
    lastSession: "Conditioning Circuit",
    weeklyLoad: 97, weeklyLoadColor: "#FF4D4D",
    recovery: { score: 34, level: "low", note: "Poor sleep" },
    nutrition: { status: "under", label: "Hydration ↓" },
    statusColor: "red",
  },
];

export const liveFeed: FeedItem[] = [
  { id: "1", iconStyle: "highlight", dotColor: "#FB923C", athlete: "Emily", text: "set new aerobic output peak · 62.1 ml/kg/min", time: "2 mins ago" },
  { id: "2", iconStyle: "lime", dotColor: "#D4AF37", athlete: "John", text: "performance output improved · tempo session", time: "8 mins ago" },
  { id: "3", iconStyle: "green", dotColor: "#00FF85", athlete: "Emily", text: "logged nutrition plan · 2,920 kcal", time: "12 mins ago" },
  { id: "4", iconStyle: "green", dotColor: "#00FF85", athlete: "John", text: "hit daily protein target · 194g", time: "22 mins ago" },
  { id: "5", iconStyle: "red", dotColor: "#FF4D4D", athlete: "Sarah", text: "training load spike detected", time: "42 mins ago" },
  { id: "6", iconStyle: "red", dotColor: "#FF4D4D", athlete: "Sarah", text: "reported poor sleep recovery · HRV –14%", time: "55 mins ago" },
  { id: "7", iconStyle: "lime", dotColor: "#D4AF37", athlete: "Mike", text: "completed strength session · 52 min", time: "1.5 hrs ago" },
  { id: "8", iconStyle: "green", dotColor: "#00FF85", athlete: "Lisa", text: "met daily hydration goal · 3.2L", time: "1.8 hrs ago" },
  { id: "9", iconStyle: "orange", dotColor: "#FB923C", athlete: "Alex", text: "completed conditioning circuit · peak zone", time: "2 hrs ago" },
];
