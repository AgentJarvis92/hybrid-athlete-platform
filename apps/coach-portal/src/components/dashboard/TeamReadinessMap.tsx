"use client";

import { useState } from "react";
import { readinessAthletes } from "@/data/mock-dashboard";
import { CoachAttentionQueue } from "./CoachAttentionQueue";
import type { ReadinessAthlete } from "@/types/dashboard";

const dotStyles = {
  green: {
    bg: "rgba(34,197,94,0.15)",
    border: "#22C55E",
    color: "#22C55E",
    shadow: "0 0 16px rgba(34,197,94,0.2)",
  },
  yellow: {
    bg: "rgba(250,204,21,0.15)",
    border: "#FACC15",
    color: "#FACC15",
    shadow: "0 0 14px rgba(250,204,21,0.18)",
  },
  red: {
    bg: "rgba(255,77,77,0.15)",
    border: "#FF4D4D",
    color: "#FF4D4D",
    shadow: "0 0 16px rgba(255,77,77,0.22)",
  },
};

function AthleteDot({ athlete }: { athlete: ReadinessAthlete }) {
  const [hovered, setHovered] = useState(false);
  const style = dotStyles[athlete.color];

  return (
    <div
      className="absolute"
      style={{
        left: `${athlete.x}%`,
        top: `${athlete.y}%`,
        transform: "translate(-50%, -50%)",
        zIndex: hovered ? 10 : 4,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-bold border-2 cursor-pointer transition-transform duration-200 font-mono"
        style={{
          background: style.bg,
          borderColor: style.border,
          color: style.color,
          boxShadow: style.shadow,
          transform: hovered ? "scale(1.3)" : "scale(1)",
        }}
      >
        {athlete.initials}
      </div>

      {hovered && (
        <div
          className="absolute top-[calc(100%+6px)] left-1/2 -translate-x-1/2 bg-bg-elevated rounded-md py-3 px-3.5 text-[11px] pointer-events-none z-20 min-w-[160px] whitespace-nowrap"
          style={{
            border: "1px solid rgba(198,255,0,0.2)",
            boxShadow: "0 12px 32px rgba(0,0,0,0.5)",
          }}
        >
          <div className="font-bold text-text-primary text-[13px] border-b border-border pb-1.5 mb-2">
            {athlete.name}
          </div>
          <div className="flex justify-between gap-4 text-text-secondary mb-1">
            <span>Training Load</span>
            <span className="font-mono text-text-primary font-semibold">{athlete.trainingLoad}</span>
          </div>
          <div className="flex justify-between gap-4 text-text-secondary mb-1">
            <span>Recovery</span>
            <span className="font-mono text-text-primary font-semibold">{athlete.recovery}</span>
          </div>
          <div className="flex justify-between gap-4 text-text-secondary">
            <span>Nutrition</span>
            <span className="font-mono text-text-primary font-semibold">{athlete.nutrition}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export function TeamReadinessMap() {
  return (
    <div className="bg-bg-card border border-border rounded-lg px-7 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-[18px]">
        <div>
          <div className="text-[15px] font-bold text-text-primary tracking-tight">Team Readiness Map</div>
          <div className="text-[11px] text-text-tertiary mt-0.5">
            Training Load × Recovery Score · Hover each dot for athlete detail
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1.5 text-[11px] text-text-secondary">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#22C55E", boxShadow: "0 0 6px rgba(34,197,94,0.5)" }} />
            Balanced
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-text-secondary">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FACC15", boxShadow: "0 0 6px rgba(250,204,21,0.4)" }} />
            Moderate Fatigue
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-text-secondary">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF4D4D", boxShadow: "0 0 6px rgba(255,77,77,0.5)" }} />
            High Risk
          </div>
        </div>
      </div>

      {/* Chart + Queue */}
      <div className="grid gap-6" style={{ gridTemplateColumns: "1fr 300px" }}>
        {/* Scatter Plot */}
        <div
          className="relative h-[320px] border border-border rounded-md overflow-visible"
          style={{ background: "#0B0D10" }}
        >
          {/* SVG background */}
          <svg
            className="absolute inset-0"
            viewBox="0 0 600 320"
            preserveAspectRatio="none"
            style={{ width: "100%", height: "100%" }}
          >
            {/* Quadrant fills */}
            <rect x="0" y="0" width="300" height="160" fill="rgba(77,163,255,0.025)" />
            <rect x="300" y="0" width="300" height="160" fill="rgba(34,197,94,0.035)" />
            <rect x="0" y="160" width="300" height="160" fill="rgba(255,77,77,0.045)" />
            <rect x="300" y="160" width="300" height="160" fill="rgba(250,204,21,0.025)" />

            {/* Center dividers */}
            <line x1="300" y1="0" x2="300" y2="320" stroke="#2A2F37" strokeWidth="1" strokeDasharray="5 4" />
            <line x1="0" y1="160" x2="600" y2="160" stroke="#2A2F37" strokeWidth="1" strokeDasharray="5 4" />

            {/* Sub-grid */}
            <line x1="150" y1="0" x2="150" y2="320" stroke="#2A2F37" strokeWidth="0.4" opacity="0.4" />
            <line x1="450" y1="0" x2="450" y2="320" stroke="#2A2F37" strokeWidth="0.4" opacity="0.4" />
            <line x1="0" y1="80" x2="600" y2="80" stroke="#2A2F37" strokeWidth="0.4" opacity="0.4" />
            <line x1="0" y1="240" x2="600" y2="240" stroke="#2A2F37" strokeWidth="0.4" opacity="0.4" />

            {/* Axis scale labels */}
            <text x="8" y="13" fill="#5E6573" fontSize="8" style={{ fontFamily: "var(--font-jetbrains, 'JetBrains Mono', ui-monospace, monospace)" }}>REC 100</text>
            <text x="8" y="314" fill="#5E6573" fontSize="8" style={{ fontFamily: "var(--font-jetbrains, 'JetBrains Mono', ui-monospace, monospace)" }}>REC 0</text>
            <text x="8" y="164" fill="#5E6573" fontSize="8" style={{ fontFamily: "var(--font-jetbrains, 'JetBrains Mono', ui-monospace, monospace)" }}>REC 50</text>
            <text x="272" y="314" fill="#5E6573" fontSize="8" style={{ fontFamily: "var(--font-jetbrains, 'JetBrains Mono', ui-monospace, monospace)" }}>LOAD 50</text>
            <text x="556" y="314" fill="#5E6573" fontSize="8" style={{ fontFamily: "var(--font-jetbrains, 'JetBrains Mono', ui-monospace, monospace)" }}>100</text>

            {/* Quadrant labels */}
            <text x="316" y="20" fill="#22C55E" fontSize="9" fontWeight="700" opacity="0.55" style={{ fontFamily: "var(--font-jetbrains, 'JetBrains Mono', ui-monospace, monospace)" }}>PEAK TRAINING</text>
            <text x="316" y="298" fill="#FACC15" fontSize="9" fontWeight="700" opacity="0.55" style={{ fontFamily: "var(--font-jetbrains, 'JetBrains Mono', ui-monospace, monospace)" }}>READY FOR LOAD</text>
            <text x="14" y="298" fill="#FF4D4D" fontSize="9" fontWeight="700" opacity="0.55" style={{ fontFamily: "var(--font-jetbrains, 'JetBrains Mono', ui-monospace, monospace)" }}>FATIGUE RISK</text>
            <text x="14" y="20" fill="#4DA3FF" fontSize="9" fontWeight="700" opacity="0.55" style={{ fontFamily: "var(--font-jetbrains, 'JetBrains Mono', ui-monospace, monospace)" }}>LOW STIMULUS</text>
          </svg>

          {/* Athlete dots */}
          {readinessAthletes.map((athlete) => (
            <AthleteDot key={athlete.id} athlete={athlete} />
          ))}

          {/* Axis labels */}
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 text-[9px] text-text-tertiary font-mono tracking-wider">
            TRAINING LOAD →
          </div>
          <div
            className="absolute left-1.5 top-1/2 text-[9px] text-text-tertiary font-mono tracking-wider whitespace-nowrap"
            style={{ transform: "translateY(-50%) rotate(-90deg)" }}
          >
            ↑ RECOVERY SCORE
          </div>
        </div>

        {/* Attention Queue */}
        <CoachAttentionQueue />
      </div>
    </div>
  );
}
