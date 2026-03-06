"use client";
import { useState } from "react";
import type { BodyLoadCallout } from "@/types/athlete";

const CALLOUT_COLOR = { red: "#FF4D4D", yellow: "#FACC15", lime: "#C6FF00" };

interface Props {
  callouts: BodyLoadCallout[];
}

// Body part fill styles
const F = {
  gray:   { fill: "rgba(42,47,55,0.6)",   stroke: "#3E4550", strokeWidth: 0.8 },
  red:    { fill: "rgba(255,77,77,0.22)",  stroke: "#FF4D4D", strokeWidth: 1 },
  yellow: { fill: "rgba(250,204,21,0.18)", stroke: "#FACC15", strokeWidth: 1 },
  lime:   { fill: "rgba(198,255,0,0.15)",  stroke: "#C6FF00", strokeWidth: 1 },
};

export function BodyLoadMap({ callouts }: Props) {
  const [activeRange, setActiveRange] = useState<"7" | "14">("7");

  return (
    <div className="bg-bg-card border border-border rounded-lg p-6 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <span className="text-sm font-semibold text-text-primary">Body Load Map</span>
        <div className="flex bg-bg-elevated rounded p-0.5">
          {(["7", "14"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setActiveRange(r)}
              className="px-2 py-0.5 rounded text-[10px] cursor-pointer transition-all"
              style={
                activeRange === r
                  ? { background: "#161A20", color: "#F5F7FA", boxShadow: "0 1px 2px rgba(0,0,0,0.2)" }
                  : { color: "#5E6573" }
              }
            >
              {r} Days
            </button>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="flex items-center justify-center gap-8 py-3">
        {/* FRONT */}
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-[9px] text-text-tertiary font-mono tracking-widest">FRONT</span>
          <svg width="90" height="260" viewBox="0 0 90 260">
            <ellipse cx="45" cy="16" rx="11" ry="13" {...F.gray} />
            <path d="M40 28 Q45 32 50 28 L51 38 Q45 40 39 38 Z" {...F.gray} />
            <path d="M18 42 Q22 36 32 38 L33 55 Q24 54 18 56 Z" {...F.gray} />
            <path d="M72 42 Q68 36 58 38 L57 55 Q66 54 72 56 Z" {...F.gray} />
            <path d="M33 38 Q38 36 45 37 Q52 36 57 38 L58 62 Q52 68 45 68 Q38 68 32 62 Z" {...F.lime} />
            <path d="M18 42 Q14 44 12 52 Q10 62 13 72 Q16 76 20 74 Q22 64 22 55 L24 44 Z" {...F.gray} />
            <path d="M72 42 Q76 44 78 52 Q80 62 77 72 Q74 76 70 74 Q68 64 68 55 L66 44 Z" {...F.gray} />
            <path d="M13 72 Q10 80 11 92 Q13 98 17 97 Q20 90 20 78 Q20 74 17 73 Z" {...F.gray} />
            <path d="M77 72 Q80 80 79 92 Q77 98 73 97 Q70 90 70 78 Q70 74 73 73 Z" {...F.gray} />
            <path d="M33 62 Q38 68 45 68 Q52 68 57 62 L58 100 Q52 104 45 104 Q38 104 32 100 Z" {...F.gray} />
            <path d="M32 100 Q38 104 45 104 Q52 104 58 100 L60 118 Q52 122 45 122 Q38 122 30 118 Z" {...F.gray} />
            <path d="M30 118 Q35 120 41 120 L43 178 Q38 182 33 178 Q28 164 28 142 Z" {...F.red} />
            <path d="M60 118 Q55 120 49 120 L47 178 Q52 182 57 178 Q62 164 62 142 Z" {...F.red} />
            <path d="M33 182 Q37 184 41 182 L42 230 Q38 234 34 230 Q31 218 31 202 Z" {...F.yellow} />
            <path d="M57 182 Q53 184 49 182 L48 230 Q52 234 56 230 Q59 218 59 202 Z" {...F.yellow} />
            <ellipse cx="37" cy="248" rx="8" ry="5" {...F.gray} />
            <ellipse cx="53" cy="248" rx="8" ry="5" {...F.gray} />
          </svg>
        </div>

        {/* BACK */}
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-[9px] text-text-tertiary font-mono tracking-widest">BACK</span>
          <svg width="90" height="260" viewBox="0 0 90 260">
            <ellipse cx="45" cy="16" rx="11" ry="13" {...F.gray} />
            <path d="M40 28 Q45 32 50 28 L51 38 Q45 40 39 38 Z" {...F.gray} />
            <path d="M18 42 Q22 36 32 38 L33 52 Q24 52 18 54 Z" {...F.yellow} />
            <path d="M72 42 Q68 36 58 38 L57 52 Q66 52 72 54 Z" {...F.yellow} />
            <path d="M18 42 Q14 44 12 54 Q14 60 19 58 L22 46 Z" {...F.yellow} />
            <path d="M72 42 Q76 44 78 54 Q76 60 71 58 L68 46 Z" {...F.yellow} />
            <path d="M12 54 Q10 62 11 72 Q14 77 18 75 Q20 65 20 56 L19 52 Z" {...F.gray} />
            <path d="M78 54 Q80 62 79 72 Q76 77 72 75 Q70 65 70 56 L71 52 Z" {...F.gray} />
            <path d="M11 72 Q9 82 10 92 Q13 98 16 97 Q18 88 19 76 Q18 72 15 72 Z" {...F.gray} />
            <path d="M79 72 Q81 82 80 92 Q77 98 74 97 Q72 88 71 76 Q72 72 75 72 Z" {...F.gray} />
            <path d="M33 52 Q38 54 45 54 Q52 54 57 52 L58 96 Q52 102 45 102 Q38 102 32 96 Z" {...F.lime} />
            <path d="M33 96 Q38 100 45 100 Q52 100 57 96 L58 116 Q52 120 45 120 Q38 120 32 116 Z" {...F.gray} />
            <path d="M30 116 Q36 120 45 120 Q54 120 60 116 L61 142 Q54 150 45 150 Q36 150 29 142 Z" {...F.red} />
            <path d="M29 142 Q34 148 41 148 L42 194 Q37 198 32 194 Q27 180 27 162 Z" {...F.red} />
            <path d="M61 142 Q56 148 49 148 L48 194 Q53 198 58 194 Q63 180 63 162 Z" {...F.red} />
            <path d="M32 198 Q36 200 41 198 L41 236 Q37 240 33 236 Q30 224 30 210 Z" {...F.yellow} />
            <path d="M58 198 Q54 200 49 198 L49 236 Q53 240 57 236 Q60 224 60 210 Z" {...F.yellow} />
            <ellipse cx="37" cy="248" rx="8" ry="5" {...F.gray} />
            <ellipse cx="53" cy="248" rx="8" ry="5" {...F.gray} />
          </svg>
        </div>

        {/* Callouts */}
        <div className="flex flex-col gap-2.5 w-48 justify-center">
          {callouts.map((c, i) => (
            <div
              key={i}
              className="text-[11px] text-text-secondary rounded-r py-2 px-2.5 leading-snug"
              style={{
                background: "#1E232B",
                borderLeft: `2px solid ${CALLOUT_COLOR[c.severity]}`,
              }}
            >
              <strong className="block text-[11px] font-semibold text-text-primary mb-0.5">{c.title}</strong>
              {c.description}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 justify-center mt-3">
        {[
          { label: "High", bg: "rgba(255,77,77,0.2)", border: "#FF4D4D" },
          { label: "Elevated", bg: "rgba(250,204,21,0.2)", border: "#FACC15" },
          { label: "Productive", bg: "rgba(198,255,0,0.2)", border: "#C6FF00" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5 text-[10px] text-text-secondary">
            <div className="w-2 h-2" style={{ background: l.bg, border: `1px solid ${l.border}` }} />
            {l.label}
          </div>
        ))}
      </div>
    </div>
  );
}
