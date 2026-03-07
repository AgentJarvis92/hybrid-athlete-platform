"use client";

import { useState } from "react";
import { rosterAthletes, type RosterAthleteState } from "@/data/mock-roster";
import { AthleteRosterCard } from "@/components/athletes/AthleteRosterCard";

type FilterState = "ALL" | RosterAthleteState;

const FILTERS: { label: string; value: FilterState; color: string }[] = [
  { label: "All",      value: "ALL",      color: "#8A93A0" },
  { label: "At Risk",  value: "AT RISK",  color: "#FF4D4D" },
  { label: "Fatigued", value: "FATIGUED", color: "#FACC15" },
  { label: "Building", value: "BUILDING", color: "#D4AF37" },
  { label: "Ready",    value: "READY",    color: "#8A93A0" },
  { label: "Peak",     value: "PEAK",     color: "#00FF85" },
];

type SortKey = "state" | "load" | "recovery";

const SORT_OPTIONS: { label: string; value: SortKey }[] = [
  { label: "State",    value: "state"    },
  { label: "Load",     value: "load"     },
  { label: "Recovery", value: "recovery" },
];

const STATE_ORDER: Record<RosterAthleteState, number> = {
  "AT RISK":  0,
  "FATIGUED": 1,
  "READY":    2,
  "BUILDING": 3,
  "PEAK":     4,
};

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 6 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join("");
}

export default function AthletesPage() {
  const [filter, setFilter] = useState<FilterState>("ALL");
  const [sort, setSort] = useState<SortKey>("state");
  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  function handleGenerateCode() {
    setInviteCode(generateCode());
    setCopied(false);
  }

  function handleCopy() {
    if (inviteCode) {
      navigator.clipboard.writeText(inviteCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  const filtered = rosterAthletes
    .filter((a) => filter === "ALL" || a.state === filter)
    .sort((a, b) => {
      if (sort === "state")    return STATE_ORDER[a.state] - STATE_ORDER[b.state];
      if (sort === "load")     return b.load - a.load;
      if (sort === "recovery") return a.recovery - b.recovery; // lowest recovery first
      return 0;
    });

  const atRiskCount  = rosterAthletes.filter((a) => a.state === "AT RISK").length;
  const flaggedCount = rosterAthletes.filter((a) => a.flagged).length;

  return (
    <div className="p-8 space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-text-primary">Athletes</h1>
            <span className="text-[11px] font-mono text-text-tertiary bg-white/5 border border-white/10 px-2 py-0.5 rounded-md">
              {rosterAthletes.length} TOTAL
            </span>
            {atRiskCount > 0 && (
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md" style={{ background: "rgba(255,77,77,0.12)", color: "#FF4D4D", border: "1px solid rgba(255,77,77,0.25)" }}>
                {atRiskCount} AT RISK
              </span>
            )}
          </div>
          <p className="text-text-tertiary text-sm mt-1">Manage and adjust your athletes&apos; programming</p>
        </div>
        <button
          onClick={handleGenerateCode}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
          style={{
            background: "rgba(212,175,55,0.1)",
            border: "1px solid rgba(212,175,55,0.25)",
            color: "#D4AF37",
          }}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
          Invite Athlete
        </button>
      </div>

      {/* Invite code banner */}
      {inviteCode && (
        <div
          className="rounded-xl border px-5 py-4 flex items-center gap-4"
          style={{ background: "rgba(212,175,55,0.05)", borderColor: "rgba(212,175,55,0.2)" }}
        >
          <div>
            <p className="text-[11px] text-text-tertiary mb-1">Share this invite code with your athlete:</p>
            <div className="flex items-center gap-3">
              <code className="text-2xl font-mono font-bold tracking-[0.2em]" style={{ color: "#D4AF37" }}>
                {inviteCode}
              </code>
              <button
                onClick={handleCopy}
                className="text-[11px] font-medium transition-colors"
                style={{ color: copied ? "#00FF85" : "#D4AF37" }}
              >
                {copied ? "✓ Copied" : "Copy"}
              </button>
            </div>
          </div>
          <p className="text-[10px] text-text-tertiary ml-auto">Athletes enter this code during onboarding to link with you</p>
        </div>
      )}

      {/* Filters + sort */}
      <div className="flex items-center justify-between gap-4">
        {/* Filter pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {FILTERS.map((f) => {
            const count = f.value === "ALL" ? rosterAthletes.length : rosterAthletes.filter((a) => a.state === f.value).length;
            const active = filter === f.value;
            return (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all"
                style={{
                  background: active ? `${f.color}18` : "rgba(255,255,255,0.04)",
                  border: `1px solid ${active ? f.color + "40" : "rgba(255,255,255,0.08)"}`,
                  color: active ? f.color : "#5E6573",
                }}
              >
                {f.label}
                <span
                  className="text-[10px] font-mono rounded-sm px-1"
                  style={{
                    background: active ? `${f.color}20` : "rgba(255,255,255,0.06)",
                    color: active ? f.color : "#5E6573",
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-text-tertiary uppercase tracking-wide">Sort:</span>
          {SORT_OPTIONS.map((s) => (
            <button
              key={s.value}
              onClick={() => setSort(s.value)}
              className="px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wide transition-all"
              style={{
                background: sort === s.value ? "rgba(255,255,255,0.08)" : "transparent",
                color: sort === s.value ? "#F5F7FA" : "#5E6573",
                border: `1px solid ${sort === s.value ? "rgba(255,255,255,0.15)" : "transparent"}`,
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((athlete) => (
            <AthleteRosterCard key={athlete.id} athlete={athlete} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-text-tertiary text-base">No athletes in this state</p>
          <p className="text-text-tertiary text-sm mt-1 opacity-60">Try a different filter</p>
        </div>
      )}
    </div>
  );
}
