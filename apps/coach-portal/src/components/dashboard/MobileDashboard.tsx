"use client";

import Link from "next/link";

const ATHLETE_STATES = [
  { label: "PEAK", count: 4, color: "#00FF85" },
  { label: "BUILDING", count: 7, color: "#D4AF37" },
  { label: "READY", count: 5, color: "#8A93A0" },
  { label: "FATIGUED", count: 6, color: "#FACC15" },
  { label: "AT RISK", count: 2, color: "#FF4D4D" },
];

const KPI = [
  { label: "Athletes", value: "24", sub: "18 active", color: "#D4AF37" },
  { label: "Active", value: "75%", sub: "participation", color: "#D4AF37" },
  { label: "Avg Load", value: "71", sub: "ATL +12%", color: "#4DA3FF" },
  { label: "Nutrition", value: "82%", sub: "on target", color: "#00FF85" },
];

const ATTENTION = [
  { id: "sl", initials: "SL", name: "Sarah Lee", status: "LOAD SPIKE", issue: "ATL 97 · Rec 34% · Hydration low", color: "#FF4D4D", time: "Today" },
  { id: "do", initials: "DO", name: "Dan O'Brien", status: "HIGH RISK", issue: "Overreach · Rec 28%", color: "#FF4D4D", time: "2h ago" },
  { id: "mr", initials: "MR", name: "Mike Ross", status: "MODERATE", issue: "Low protein · 58% nutrition", color: "#FACC15", time: "4h ago" },
  { id: "th", initials: "TH", name: "Tom Hill", status: "INACTIVE", issue: "2 sessions missed this week", color: "#4DA3FF", time: "3d ago" },
];

const FEED = [
  { name: "Emily", event: "Set new aerobic output peak · 62.1 ml/kg/min", time: "2m", color: "#FB923C" },
  { name: "John", event: "Performance output improved · tempo session", time: "8m", color: "#D4AF37" },
  { name: "Emily", event: "Logged nutrition · 2,920 kcal", time: "12m", color: "#00FF85" },
  { name: "Sarah", event: "Training load spike detected", time: "42m", color: "#FF4D4D" },
  { name: "Mike", event: "Completed strength session · 52 min", time: "1.5h", color: "#D4AF37" },
];

export function MobileDashboard() {
  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between pt-2">
        <h1 className="text-2xl font-bold tracking-tight liquid-gold-text">Overview</h1>
        <span className="text-[11px] font-mono text-text-tertiary uppercase tracking-wider">Today</span>
      </div>

      {/* Status strip — horizontal scroll */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {ATHLETE_STATES.map(({ label, count, color }) => (
          <div
            key={label}
            className="flex-none flex flex-col items-center gap-1 glass-panel rounded-xl px-3 py-2.5 min-w-[68px]"
            style={{ borderTop: `2px solid ${color}` }}
          >
            <span className="text-[18px] font-bold font-mono" style={{ color }}>{count}</span>
            <span className="text-[9px] font-bold uppercase tracking-wide text-text-tertiary whitespace-nowrap">{label}</span>
          </div>
        ))}
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 gap-3">
        {KPI.map(({ label, value, sub, color }) => (
          <div key={label} className="glass-card rounded-2xl p-4">
            <div className="text-[10px] uppercase tracking-wider text-text-tertiary font-semibold mb-2">{label}</div>
            <div className="text-[26px] font-bold font-mono tracking-tight" style={{ color }}>{value}</div>
            <div className="text-[11px] text-text-secondary mt-1">{sub}</div>
          </div>
        ))}
      </div>

      {/* Needs attention */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] uppercase tracking-wider text-text-secondary font-bold">Needs Attention</span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse" style={{ background: "rgba(255,77,77,0.15)", color: "#FF4D4D", border: "1px solid rgba(255,77,77,0.3)" }}>
            4 ACTIVE
          </span>
        </div>
        <div className="flex flex-col gap-2">
          {ATTENTION.map(({ id, initials, name, status, issue, color, time }) => (
            <Link
              key={id}
              href={`/athletes/${id}`}
              className="glass-card rounded-2xl p-3.5 flex items-start gap-3"
              style={{ borderLeft: `3px solid ${color}` }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-[11px] font-bold font-mono"
                style={{ background: `${color}18`, border: `1px solid ${color}40`, color }}
              >
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <span className="text-[13px] font-semibold text-text-primary truncate">{name}</span>
                  <span className="text-[10px] text-text-tertiary font-mono shrink-0">{time}</span>
                </div>
                <div className="text-[11px] text-text-secondary leading-snug">{issue}</div>
                <div className="text-[10px] font-bold font-mono mt-1 tracking-wide" style={{ color }}>{status}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Live feed */}
      <div>
        <div className="text-[11px] uppercase tracking-wider text-text-secondary font-bold mb-3">Live Feed</div>
        <div className="glass-card rounded-2xl divide-y divide-border">
          {FEED.map(({ name, event, time, color }, i) => (
            <div key={i} className="flex items-start gap-3 p-3.5">
              <div
                className="w-2 h-2 rounded-full shrink-0 mt-1.5"
                style={{ background: color, boxShadow: `0 0 6px ${color}80` }}
              />
              <div className="flex-1 min-w-0">
                <span className="text-[13px] text-text-secondary">
                  <strong className="text-text-primary font-medium">{name}</strong> {event}
                </span>
              </div>
              <span className="text-[10px] text-text-tertiary font-mono shrink-0">{time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
