"use client";
import { useState } from "react";
import Model from "react-body-highlighter";
import type { IExerciseData } from "react-body-highlighter";
import type { BodyLoadCallout } from "@/types/athlete";

// Color scale: index 0 = frequency 1 (productive), 1 = frequency 2 (elevated), 2 = frequency 3 (high load)
const HIGHLIGHT_COLORS = ["#C6FF00", "#FACC15", "#FF4D4D"];
const BODY_COLOR = "#1D2229";

// Sarah Lee's load data — frequency maps to intensity tier
const SARAH_LOAD_DATA: IExerciseData[] = [
  // High load — posterior chain & quads
  { name: "High Load", muscles: ["quadriceps", "gluteal", "hamstring"], frequency: 3 },
  // Elevated — calves, upper traps, rear delts
  { name: "Elevated", muscles: ["calves", "trapezius", "back-deltoids"], frequency: 2 },
  // Productive stimulus — chest, lats/upper back
  { name: "Productive", muscles: ["chest", "upper-back"], frequency: 1 },
];

const CALLOUT_COLOR = { red: "#FF4D4D", yellow: "#FACC15", lime: "#C6FF00" };

interface Props {
  callouts: BodyLoadCallout[];
}

export function BodyLoadMap({ callouts }: Props) {
  const [activeRange, setActiveRange] = useState<"7" | "14">("7");

  return (
    <div className="bg-bg-card border border-border rounded-lg p-5">
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

      {/* TOP — Body figures */}
      <div className="flex justify-center gap-8 pb-4 mb-4 border-b border-border">
        {/* ANTERIOR (Front) */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-[9px] text-text-tertiary font-mono tracking-[0.12em] uppercase">Front</span>
          <Model
            type="anterior"
            data={SARAH_LOAD_DATA}
            bodyColor={BODY_COLOR}
            highlightedColors={HIGHLIGHT_COLORS}
            style={{ width: "110px" }}
            svgStyle={{ borderRadius: "4px" }}
          />
        </div>

        {/* POSTERIOR (Back) */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-[9px] text-text-tertiary font-mono tracking-[0.12em] uppercase">Back</span>
          <Model
            type="posterior"
            data={SARAH_LOAD_DATA}
            bodyColor={BODY_COLOR}
            highlightedColors={HIGHLIGHT_COLORS}
            style={{ width: "110px" }}
            svgStyle={{ borderRadius: "4px" }}
          />
        </div>

        {/* Legend — right side of figures */}
        <div className="flex flex-col gap-2 justify-center">
          {[
            { label: "High Load",  color: "#FF4D4D" },
            { label: "Elevated",   color: "#FACC15" },
            { label: "Productive", color: "#C6FF00" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-2 text-[10px] text-text-secondary">
              <div
                className="w-2.5 h-2.5 rounded-sm shrink-0"
                style={{ background: `${l.color}30`, border: `1px solid ${l.color}`, boxShadow: `0 0 5px ${l.color}50` }}
              />
              {l.label}
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM — Callouts */}
      <div className="flex flex-col gap-2">
        {callouts.map((c, i) => (
          <div
            key={i}
            className="flex gap-3 items-start py-2 px-3 rounded-md text-[11px] text-text-secondary leading-snug"
            style={{
              background: `${CALLOUT_COLOR[c.severity]}07`,
              borderLeft: `2.5px solid ${CALLOUT_COLOR[c.severity]}`,
            }}
          >
            <div>
              <strong
                className="block font-semibold mb-0.5"
                style={{ color: CALLOUT_COLOR[c.severity] }}
              >
                {c.title}
              </strong>
              {c.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
