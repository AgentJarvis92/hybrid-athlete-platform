"use client";
import { useState, useRef } from "react";
import Link from "next/link";

type AthleteEntry = { name: string; context: string; id?: string };

const STATES: {
  key: string;
  label: string;
  count: number;
  color: string;
  bg: string;
  glow: string;
  athletes: AthleteEntry[];
}[] = [
  {
    key: "peak",
    label: "PEAK",
    count: 4,
    color: "#00FF85",
    bg: "rgba(0,255,133,0.07)",
    glow: "rgba(0,255,133,0.18)",
    athletes: [
      { name: "Emily Chen",  context: "high adaptation",    id: "ec" },
      { name: "John Doe",    context: "strong output",      id: "jd" },
      { name: "Alex Park",   context: "primed for load" },
      { name: "Lisa Ward",   context: "recovery peak" },
    ],
  },
  {
    key: "building",
    label: "BUILDING",
    count: 7,
    color: "#D4AF37",
    bg: "rgba(212,175,55,0.05)",
    glow: "rgba(212,175,55,0.15)",
    athletes: [
      { name: "Ryan Torres", context: "load progressing" },
      { name: "Mia Chen",    context: "aerobic base phase" },
      { name: "Jake Kim",    context: "strength ramp" },
      { name: "Priya Patel", context: "volume building" },
      { name: "Chris Obi",   context: "conditioning block" },
      { name: "Tara Singh",  context: "early adaptation" },
      { name: "Noah Reed",   context: "response tracking" },
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
      { name: "Sam Wells",  context: "stable load" },
      { name: "Leila Mora", context: "taper week" },
      { name: "Ben Fox",    context: "deload phase" },
      { name: "Grace Kim",  context: "maintenance" },
      { name: "Omar Chen",  context: "recovery hold" },
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
      { name: "Mike Ross",  context: "fatigue risk building" },
      { name: "Tom Hill",   context: "sessions missed" },
      { name: "Kai Leong",  context: "HRV declining" },
      { name: "Ana Ruiz",   context: "sleep deficit" },
      { name: "Jess Park",  context: "overreaching signal" },
      { name: "Wei Zhang",  context: "nutrition lag" },
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
      { name: "Sarah Lee",   context: "load spike · hydration low", id: "sl" },
      { name: "Dan O'Brien", context: "overreach risk" },
    ],
  },
];

const TOTAL = STATES.reduce((s, st) => s + st.count, 0);

export function AthleteStateStrip() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [tooltipX, setTooltipX] = useState(0);
  const [tooltipHovered, setTooltipHovered] = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);

  const isVisible = hovered !== null || tooltipHovered;
  const hoveredState = STATES.find((s) => s.key === hovered) ?? STATES.find((s) => s.key === (tooltipHovered ? hovered : null));
  const activeState = isVisible ? STATES.find((s) => s.key === hovered) ?? null : null;

  // Keep last hovered state visible while tooltip is hovered
  const [lastHovered, setLastHovered] = useState<string | null>(null);
  const displayState = STATES.find((s) => s.key === (hovered ?? (tooltipHovered ? lastHovered : null)));

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
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: s.color }} />
              <span className="text-[10px] font-mono text-text-tertiary uppercase tracking-wide">{s.label}</span>
              <span className="text-[10px] font-mono font-bold" style={{ color: s.color }}>{s.count}</span>
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
                className="relative flex items-center justify-center cursor-pointer transition-all duration-200"
                style={{
                  width: `${pct}%`,
                  background: isHov ? state.bg : "rgba(255,255,255,0.02)",
                  borderTop: `2px solid ${isHov ? state.color : "rgba(255,255,255,0.06)"}`,
                  boxShadow: isHov ? `0 0 12px ${state.glow}` : "none",
                }}
                onMouseEnter={(e) => {
                  setHovered(state.key);
                  setLastHovered(state.key);
                  if (stripRef.current) {
                    const rect = stripRef.current.getBoundingClientRect();
                    const segRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                    setTooltipX(segRect.left - rect.left + segRect.width / 2);
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
        {displayState && (
          <div
            className="absolute top-[calc(100%+8px)] z-50"
            style={{ left: tooltipX, transform: "translateX(-50%)" }}
            onMouseEnter={() => setTooltipHovered(true)}
            onMouseLeave={() => setTooltipHovered(false)}
          >
            <div
              className="rounded-md border px-3.5 py-3 min-w-[210px] max-w-[270px]"
              style={{
                background: "#161A20",
                borderColor: displayState.color + "40",
                boxShadow: `0 8px 24px rgba(0,0,0,0.5), 0 0 0 1px ${displayState.color}18`,
              }}
            >
              {/* Arrow */}
              <div
                className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45 border-t border-l"
                style={{ background: "#161A20", borderColor: displayState.color + "40" }}
              />
              <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: displayState.color }}>
                {displayState.label}
              </div>
              <div className="flex flex-col gap-1.5">
                {displayState.athletes.map((a, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span
                      className="w-1 h-1 rounded-full shrink-0 mt-[5px]"
                      style={{ background: displayState.color, opacity: 0.7 }}
                    />
                    {a.id ? (
                      <Link href={`/athletes/${a.id}`} className="text-[11px] leading-snug hover:underline" style={{ color: displayState.color }}>
                        {a.name}
                        <span className="text-text-tertiary font-normal"> · {a.context}</span>
                      </Link>
                    ) : (
                      <span className="text-[11px] text-text-secondary leading-snug">
                        <span className="text-text-primary">{a.name}</span>
                        {" · "}{a.context}
                      </span>
                    )}
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
