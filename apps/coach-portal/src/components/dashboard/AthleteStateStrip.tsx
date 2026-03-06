"use client";
import { useState, useRef } from "react";

const STATES = [
  {
    key: "peak",
    label: "PEAK",
    count: 4,
    color: "#00FF85",
    bg: "rgba(0,255,133,0.07)",
    glow: "rgba(0,255,133,0.18)",
    athletes: [
      "Emily Chen · high adaptation",
      "John Doe · strong output",
      "Alex Park · primed for load",
      "Lisa Ward · recovery peak",
    ],
  },
  {
    key: "building",
    label: "BUILDING",
    count: 7,
    color: "#C6FF00",
    bg: "rgba(198,255,0,0.05)",
    glow: "rgba(198,255,0,0.15)",
    athletes: [
      "Ryan Torres · load progressing",
      "Mia Chen · aerobic base phase",
      "Jake Kim · strength ramp",
      "Priya Patel · volume building",
      "Chris Obi · conditioning block",
      "Tara Singh · early adaptation",
      "Noah Reed · response tracking",
    ],
  },
  {
    key: "ready",
    label: "READY",
    count: 5,
    color: "#8A93A0",
    bg: "rgba(138,147,160,0.05)",
    glow: "rgba(138,147,160,0.12)",
    athletes: [
      "Sam Wells · stable load",
      "Leila Mora · taper week",
      "Ben Fox · deload phase",
      "Grace Kim · maintenance",
      "Omar Chen · recovery hold",
    ],
  },
  {
    key: "fatigued",
    label: "FATIGUED",
    count: 6,
    color: "#FACC15",
    bg: "rgba(250,204,21,0.05)",
    glow: "rgba(250,204,21,0.15)",
    athletes: [
      "Mike Ross · fatigue risk building",
      "Tom Hill · sessions missed",
      "Kai Leong · HRV declining",
      "Ana Ruiz · sleep deficit",
      "Jess Park · overreaching signal",
      "Wei Zhang · nutrition lag",
    ],
  },
  {
    key: "at-risk",
    label: "AT RISK",
    count: 2,
    color: "#FF4D4D",
    bg: "rgba(255,77,77,0.07)",
    glow: "rgba(255,77,77,0.2)",
    athletes: [
      "Sarah Lee · load spike + hydration low",
      "Dan O'Brien · overreach risk",
    ],
  },
] as const;

const TOTAL = STATES.reduce((s, st) => s + st.count, 0);

export function AthleteStateStrip() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [tooltipX, setTooltipX] = useState(0);
  const stripRef = useRef<HTMLDivElement>(null);

  const hoveredState = STATES.find((s) => s.key === hovered);

  return (
    <div className="bg-bg-card border border-border rounded-lg px-5 py-4">
      {/* Header row */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "#00FF85", boxShadow: "0 0 6px rgba(0,255,133,0.6)" }}
            />
            <span className="text-[11px] uppercase tracking-[0.08em] font-bold text-text-secondary">
              Team State
            </span>
          </div>
          <span className="text-[10px] text-text-tertiary font-mono">TODAY</span>
        </div>
        <div className="flex items-center gap-4">
          {STATES.map((s) => (
            <div key={s.key} className="flex items-center gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: s.color }}
              />
              <span className="text-[10px] font-mono text-text-tertiary uppercase tracking-wide">
                {s.label}
              </span>
              <span className="text-[10px] font-mono font-bold" style={{ color: s.color }}>
                {s.count}
              </span>
            </div>
          ))}
          <div className="w-px h-3 bg-border" />
          <span className="text-[10px] font-mono text-text-tertiary">{TOTAL} ATHLETES</span>
        </div>
      </div>

      {/* Segmented bar */}
      <div className="relative" ref={stripRef}>
        <div className="flex h-11 rounded-md overflow-hidden gap-[2px]">
          {STATES.map((state) => {
            const pct = (state.count / TOTAL) * 100;
            const isHov = hovered === state.key;
            return (
              <div
                key={state.key}
                className="relative flex items-center justify-center cursor-pointer transition-all duration-200 group"
                style={{
                  width: `${pct}%`,
                  background: isHov ? state.bg : "rgba(255,255,255,0.02)",
                  borderTop: `2px solid ${isHov ? state.color : "rgba(255,255,255,0.06)"}`,
                  boxShadow: isHov ? `0 0 12px ${state.glow}` : "none",
                }}
                onMouseEnter={(e) => {
                  setHovered(state.key);
                  if (stripRef.current) {
                    const rect = stripRef.current.getBoundingClientRect();
                    const segRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                    const midX = segRect.left - rect.left + segRect.width / 2;
                    setTooltipX(midX);
                  }
                }}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="flex flex-col items-center gap-0.5 px-2">
                  <span
                    className="text-[10px] font-mono font-bold uppercase tracking-wider whitespace-nowrap transition-colors duration-150"
                    style={{ color: isHov ? state.color : "#5E6573" }}
                  >
                    {state.label}
                  </span>
                  <span
                    className="text-[13px] font-mono font-bold transition-colors duration-150"
                    style={{ color: isHov ? state.color : "#8A93A0" }}
                  >
                    {state.count}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Hover tooltip */}
        {hoveredState && (
          <div
            className="absolute top-[calc(100%+8px)] z-50 pointer-events-none"
            style={{
              left: tooltipX,
              transform: "translateX(-50%)",
            }}
          >
            <div
              className="rounded-md border px-3.5 py-3 min-w-[200px] max-w-[260px]"
              style={{
                background: "#161A20",
                borderColor: hoveredState.color + "40",
                boxShadow: `0 8px 24px rgba(0,0,0,0.5), 0 0 0 1px ${hoveredState.color}18`,
              }}
            >
              {/* Arrow */}
              <div
                className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45 border-t border-l"
                style={{ background: "#161A20", borderColor: hoveredState.color + "40" }}
              />
              <div
                className="text-[10px] font-bold uppercase tracking-widest mb-2"
                style={{ color: hoveredState.color }}
              >
                {hoveredState.label}
              </div>
              <div className="flex flex-col gap-1.5">
                {hoveredState.athletes.map((a, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span
                      className="w-1 h-1 rounded-full shrink-0 mt-[5px]"
                      style={{ background: hoveredState.color, opacity: 0.7 }}
                    />
                    <span className="text-[11px] text-text-secondary leading-snug">{a}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
