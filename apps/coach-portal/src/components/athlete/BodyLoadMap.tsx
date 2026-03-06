"use client";
import { useState } from "react";
import type { BodyLoadCallout } from "@/types/athlete";

type MuscleLevel = "red" | "yellow" | "lime" | "inactive";

const MUSCLE_COLORS: Record<MuscleLevel, { fill: string; stroke: string; glow: string; opacity: number }> = {
  red:      { fill: "#FF4D4D", stroke: "#FF6666", glow: "#FF4D4D", opacity: 0.85 },
  yellow:   { fill: "#FACC15", stroke: "#FDE047", glow: "#FACC15", opacity: 0.75 },
  lime:     { fill: "#C6FF00", stroke: "#D4FF40", glow: "#C6FF00", opacity: 0.7  },
  inactive: { fill: "#1A1F28", stroke: "#2E3540", glow: "none",    opacity: 1    },
};

function MuscleGroup({ d, cx, cy, rx, ry, level, isEllipse = false }: {
  d?: string; cx?: number; cy?: number; rx?: number; ry?: number;
  level: MuscleLevel; isEllipse?: boolean;
}) {
  const { fill, stroke, glow, opacity } = MUSCLE_COLORS[level];
  const filterId = level !== "inactive" ? `glow-${level}` : undefined;
  const props = {
    fill,
    stroke,
    strokeWidth: level !== "inactive" ? 0.5 : 0.4,
    opacity,
    filter: filterId ? `url(#${filterId})` : undefined,
    style: { transition: "all 0.3s ease" },
  };
  if (isEllipse) return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} {...props} />;
  return <path d={d} {...props} />;
}

const CALLOUT_COLOR = { red: "#FF4D4D", yellow: "#FACC15", lime: "#C6FF00" };

interface Props {
  callouts: BodyLoadCallout[];
}

export function BodyLoadMap({ callouts }: Props) {
  const [activeRange, setActiveRange] = useState<"7" | "14">("7");

  return (
    <div className="bg-bg-card border border-border rounded-lg p-5 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-text-primary">Body Load Map</span>
        <div className="flex bg-bg-elevated rounded p-0.5 gap-0.5">
          {(["7", "14"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setActiveRange(r)}
              className="px-2.5 py-0.5 rounded text-[10px] cursor-pointer transition-all font-mono"
              style={
                activeRange === r
                  ? { background: "#161A20", color: "#F5F7FA", boxShadow: "0 1px 3px rgba(0,0,0,0.3)" }
                  : { color: "#5E6573" }
              }
            >
              {r}D
            </button>
          ))}
        </div>
      </div>

      {/* Map container */}
      <div className="flex items-start justify-center gap-6">
        {/* FRONT */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-[9px] text-text-tertiary font-mono tracking-[0.12em] uppercase">Front</span>
          <svg width="96" height="270" viewBox="0 0 96 270" style={{ overflow: "visible" }}>
            <defs>
              <filter id="glow-red" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="glow-yellow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="glow-lime" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* HEAD */}
            <MuscleGroup isEllipse cx={48} cy={15} rx={12} ry={14} level="inactive" />
            {/* NECK */}
            <MuscleGroup d="M42 27 Q48 31 54 27 L55 39 Q48 42 41 39 Z" level="inactive" />

            {/* SHOULDERS */}
            <MuscleGroup d="M14 44 Q18 36 30 39 L31 55 Q22 54 14 57 Z" level="inactive" />
            <MuscleGroup d="M82 44 Q78 36 66 39 L65 55 Q74 54 82 57 Z" level="inactive" />

            {/* CHEST / PECS */}
            <MuscleGroup d="M31 39 Q38 35 48 36 Q58 35 65 39 L65 63 Q58 70 48 70 Q38 70 31 63 Z" level="lime" />

            {/* FRONT DELTS */}
            <MuscleGroup d="M14 44 Q10 48 9 56 Q11 62 16 60 L18 48 Z" level="inactive" />
            <MuscleGroup d="M82 44 Q86 48 87 56 Q85 62 80 60 L78 48 Z" level="inactive" />

            {/* BICEPS */}
            <MuscleGroup d="M9 56 Q6 65 7 76 Q10 81 15 79 Q17 69 17 60 L16 55 Z" level="inactive" />
            <MuscleGroup d="M87 56 Q90 65 89 76 Q86 81 81 79 Q79 69 79 60 L80 55 Z" level="inactive" />

            {/* FOREARMS */}
            <MuscleGroup d="M7 76 Q5 87 6 98 Q9 104 13 103 Q16 93 15 81 Q14 77 11 76 Z" level="inactive" />
            <MuscleGroup d="M89 76 Q91 87 90 98 Q87 104 83 103 Q80 93 81 81 Q82 77 85 76 Z" level="inactive" />

            {/* ABS — 6 segments */}
            <MuscleGroup d="M33 63 Q38 70 48 70 Q58 70 63 63 L63 78 Q58 82 48 82 Q38 82 33 78 Z" level="inactive" />
            <MuscleGroup d="M33 78 Q38 82 48 82 Q58 82 63 78 L63 93 Q58 97 48 97 Q38 97 33 93 Z" level="inactive" />
            <MuscleGroup d="M33 93 Q38 97 48 97 Q58 97 63 93 L63 108 Q58 112 48 112 Q38 112 33 108 Z" level="inactive" />

            {/* HIP/OBLIQUES */}
            <MuscleGroup d="M33 108 Q38 112 48 112 Q58 112 63 108 L66 124 Q56 130 48 130 Q40 130 30 124 Z" level="inactive" />

            {/* QUADS — left */}
            <MuscleGroup d="M30 124 Q35 128 43 127 L44 182 Q39 188 33 183 Q27 167 27 145 Z" level="red" />
            {/* QUADS — right */}
            <MuscleGroup d="M66 124 Q61 128 53 127 L52 182 Q57 188 63 183 Q69 167 69 145 Z" level="red" />

            {/* INNER QUAD seam — left */}
            <MuscleGroup d="M43 127 L48 130 L48 182 L44 182 Z" level="red" />
            {/* INNER QUAD seam — right */}
            <MuscleGroup d="M53 127 L48 130 L48 182 L52 182 Z" level="red" />

            {/* CALVES — left */}
            <MuscleGroup d="M33 187 Q37 190 43 188 L43 236 Q38 241 33 236 Q29 222 29 206 Z" level="yellow" />
            {/* CALVES — right */}
            <MuscleGroup d="M63 187 Q59 190 53 188 L53 236 Q58 241 63 236 Q67 222 67 206 Z" level="yellow" />

            {/* FEET */}
            <MuscleGroup isEllipse cx={38} cy={248} rx={9} ry={5} level="inactive" />
            <MuscleGroup isEllipse cx={58} cy={248} rx={9} ry={5} level="inactive" />
          </svg>
        </div>

        {/* BACK */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-[9px] text-text-tertiary font-mono tracking-[0.12em] uppercase">Back</span>
          <svg width="96" height="270" viewBox="0 0 96 270" style={{ overflow: "visible" }}>
            {/* HEAD */}
            <MuscleGroup isEllipse cx={48} cy={15} rx={12} ry={14} level="inactive" />
            {/* NECK */}
            <MuscleGroup d="M42 27 Q48 31 54 27 L55 39 Q48 42 41 39 Z" level="inactive" />

            {/* UPPER TRAPS */}
            <MuscleGroup d="M41 27 Q35 30 24 38 Q18 42 14 50 Q20 54 27 50 L31 39 Z" level="yellow" />
            <MuscleGroup d="M55 27 Q61 30 72 38 Q78 42 82 50 Q76 54 69 50 L65 39 Z" level="yellow" />

            {/* REAR DELTS */}
            <MuscleGroup d="M14 50 Q10 55 9 63 Q12 68 17 65 L20 52 Z" level="yellow" />
            <MuscleGroup d="M82 50 Q86 55 87 63 Q84 68 79 65 L76 52 Z" level="yellow" />

            {/* TRICEPS */}
            <MuscleGroup d="M9 63 Q6 73 7 83 Q10 88 15 86 Q17 76 16 65 Z" level="inactive" />
            <MuscleGroup d="M87 63 Q90 73 89 83 Q86 88 81 86 Q79 76 80 65 Z" level="inactive" />

            {/* FOREARMS */}
            <MuscleGroup d="M7 83 Q5 94 6 104 Q9 110 13 109 Q16 99 15 87 Z" level="inactive" />
            <MuscleGroup d="M89 83 Q91 94 90 104 Q87 110 83 109 Q80 99 81 87 Z" level="inactive" />

            {/* LATS — large back */}
            <MuscleGroup d="M27 50 Q34 52 48 52 Q62 52 69 50 L69 98 Q60 106 48 106 Q36 106 27 98 Z" level="lime" />

            {/* LOWER BACK / SPINAL */}
            <MuscleGroup d="M36 98 Q41 104 48 104 Q55 104 60 98 L60 118 Q54 122 48 122 Q42 122 36 118 Z" level="inactive" />

            {/* GLUTES */}
            <MuscleGroup d="M28 118 Q36 122 48 122 Q60 122 68 118 L70 146 Q60 156 48 156 Q36 156 26 146 Z" level="red" />

            {/* HAMSTRINGS — left */}
            <MuscleGroup d="M26 146 Q32 152 42 150 L42 200 Q37 205 31 200 Q25 185 25 165 Z" level="red" />
            {/* HAMSTRINGS — right */}
            <MuscleGroup d="M70 146 Q64 152 54 150 L54 200 Q59 205 65 200 Q71 185 71 165 Z" level="red" />

            {/* CALVES — left */}
            <MuscleGroup d="M31 204 Q36 207 42 204 L42 240 Q37 245 32 240 Q28 226 28 214 Z" level="yellow" />
            {/* CALVES — right */}
            <MuscleGroup d="M65 204 Q60 207 54 204 L54 240 Q59 245 64 240 Q68 226 68 214 Z" level="yellow" />

            {/* FEET */}
            <MuscleGroup isEllipse cx={38} cy={250} rx={9} ry={5} level="inactive" />
            <MuscleGroup isEllipse cx={58} cy={250} rx={9} ry={5} level="inactive" />
          </svg>
        </div>

        {/* Callouts */}
        <div className="flex flex-col gap-2.5 flex-1 min-w-0 self-center">
          {callouts.map((c, i) => (
            <div
              key={i}
              className="text-[11px] text-text-secondary rounded-r-md py-2 px-3 leading-snug"
              style={{
                background: `${CALLOUT_COLOR[c.severity]}08`,
                borderLeft: `2.5px solid ${CALLOUT_COLOR[c.severity]}`,
              }}
            >
              <strong
                className="block text-[11px] font-semibold mb-0.5"
                style={{ color: CALLOUT_COLOR[c.severity] }}
              >
                {c.title}
              </strong>
              {c.description}
            </div>
          ))}

          {/* Legend */}
          <div className="flex flex-col gap-1.5 mt-2 pt-2 border-t border-border">
            {[
              { label: "High Load", color: "#FF4D4D" },
              { label: "Elevated",  color: "#FACC15" },
              { label: "Productive", color: "#C6FF00" },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-2 text-[10px] text-text-secondary">
                <div
                  className="w-2.5 h-2.5 rounded-sm shrink-0"
                  style={{ background: `${l.color}30`, border: `1px solid ${l.color}`, boxShadow: `0 0 4px ${l.color}40` }}
                />
                {l.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
