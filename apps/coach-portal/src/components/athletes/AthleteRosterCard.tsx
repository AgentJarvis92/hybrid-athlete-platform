"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import type { RosterAthlete } from "@/data/mock-roster";

interface AthleteRosterCardProps {
  athlete: RosterAthlete;
}

const STATE_BG: Record<string, string> = {
  "AT RISK":  "rgba(255,77,77,0.06)",
  "FATIGUED": "rgba(250,204,21,0.05)",
  "BUILDING": "rgba(198,255,0,0.04)",
  "READY":    "rgba(138,147,160,0.04)",
  "PEAK":     "rgba(0,255,133,0.04)",
};

const STATE_BORDER: Record<string, string> = {
  "AT RISK":  "rgba(255,77,77,0.35)",
  "FATIGUED": "rgba(250,204,21,0.3)",
  "BUILDING": "rgba(198,255,0,0.2)",
  "READY":    "rgba(138,147,160,0.15)",
  "PEAK":     "rgba(0,255,133,0.2)",
};

export function AthleteRosterCard({ athlete }: AthleteRosterCardProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [applied, setApplied] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleApply(suggestion: string) {
    setApplied(suggestion);
    setDropdownOpen(false);
    setTimeout(() => setApplied(null), 2500);
  }

  const isAlert = athlete.state === "AT RISK" || athlete.state === "FATIGUED";
  const borderColor = STATE_BORDER[athlete.state];
  const bgColor = STATE_BG[athlete.state];

  return (
    <div
      className="rounded-xl border p-4 flex flex-col gap-3 transition-all duration-200 hover:shadow-lg"
      style={{
        background: bgColor,
        borderColor: borderColor,
        boxShadow: isAlert ? `0 0 0 1px ${athlete.stateColor}18, 0 4px 16px rgba(0,0,0,0.3)` : "0 2px 8px rgba(0,0,0,0.2)",
      }}
    >
      {/* Top row: avatar + name + state badge */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-bold shrink-0"
            style={{
              background: `${athlete.stateColor}18`,
              border: `2px solid ${athlete.stateColor}50`,
              color: athlete.stateColor,
              boxShadow: isAlert ? `0 0 10px ${athlete.stateColor}30` : "none",
            }}
          >
            {athlete.initials}
          </div>
          {/* Name + type */}
          <div>
            <div className="text-[13px] font-semibold text-text-primary leading-tight">{athlete.name}</div>
            <div className="text-[10px] text-text-tertiary uppercase tracking-wide mt-0.5">{athlete.type}</div>
          </div>
        </div>
        {/* State badge */}
        <span
          className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-md shrink-0"
          style={{
            background: `${athlete.stateColor}18`,
            color: athlete.stateColor,
            border: `1px solid ${athlete.stateColor}30`,
          }}
        >
          {athlete.state}
        </span>
      </div>

      {/* Metrics row */}
      <div className="flex flex-col gap-2">
        {/* Load */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-text-tertiary uppercase tracking-wide w-16 shrink-0">Load</span>
          <div className="flex-1 h-1.5 rounded-full bg-white/5">
            <div
              className="h-1.5 rounded-full transition-all"
              style={{ width: `${Math.min(athlete.load, 100)}%`, background: athlete.loadColor }}
            />
          </div>
          <span className="text-[11px] font-mono font-bold w-8 text-right" style={{ color: athlete.loadColor }}>
            {athlete.load}
          </span>
        </div>
        {/* Recovery */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-text-tertiary uppercase tracking-wide w-16 shrink-0">Recovery</span>
          <div className="flex-1 h-1.5 rounded-full bg-white/5">
            <div
              className="h-1.5 rounded-full transition-all"
              style={{ width: `${athlete.recovery}%`, background: athlete.recoveryColor }}
            />
          </div>
          <span className="text-[11px] font-mono font-bold w-8 text-right" style={{ color: athlete.recoveryColor }}>
            {athlete.recovery}%
          </span>
        </div>
        {/* Nutrition */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-text-tertiary uppercase tracking-wide w-16 shrink-0">Nutrition</span>
          <span
            className="text-[10px] font-medium px-2 py-0.5 rounded-md"
            style={{
              background: `${athlete.nutritionColor}15`,
              color: athlete.nutritionColor,
              border: `1px solid ${athlete.nutritionColor}25`,
            }}
          >
            {athlete.nutrition}
          </span>
        </div>
      </div>

      {/* Last session */}
      <div className="flex items-center gap-1.5 border-t border-white/5 pt-2.5">
        <span className="text-[10px] text-text-tertiary">Last:</span>
        <span className="text-[10px] text-text-secondary">{athlete.lastSession}</span>
        <span className="text-[10px] text-text-tertiary ml-auto">{athlete.lastSessionTime}</span>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2 mt-0.5">
        {/* Adjust Program dropdown */}
        <div className="relative flex-1" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((v) => !v)}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-semibold transition-all duration-150"
            style={{
              background: applied ? `${athlete.stateColor}20` : "rgba(255,255,255,0.05)",
              border: `1px solid ${applied ? athlete.stateColor + "40" : "rgba(255,255,255,0.08)"}`,
              color: applied ? athlete.stateColor : "#8A93A0",
            }}
          >
            {applied ? (
              <>
                <span style={{ color: athlete.stateColor }}>✓</span>
                {applied}
              </>
            ) : (
              <>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1 3h8M3 5h4M4.5 7h1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                Adjust Program
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="ml-auto">
                  <path d="M1.5 3L4 5.5L6.5 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </>
            )}
          </button>

          {dropdownOpen && (
            <div
              className="absolute bottom-[calc(100%+6px)] left-0 w-full rounded-lg border z-50 overflow-hidden"
              style={{
                background: "#161A20",
                borderColor: `${athlete.stateColor}30`,
                boxShadow: `0 8px 24px rgba(0,0,0,0.5), 0 0 0 1px ${athlete.stateColor}15`,
              }}
            >
              {/* Arrow */}
              <div
                className="absolute -bottom-[5px] left-6 w-2.5 h-2.5 rotate-45 border-b border-r"
                style={{ background: "#161A20", borderColor: `${athlete.stateColor}30` }}
              />
              <div className="px-2 py-1.5 border-b border-white/5">
                <span className="text-[9px] uppercase tracking-widest font-bold" style={{ color: athlete.stateColor }}>
                  Suggested Actions
                </span>
              </div>
              {athlete.programSuggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => handleApply(s)}
                  className="w-full text-left px-3 py-2 text-[11px] text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* View Athlete */}
        <Link
          href={`/athletes/${athlete.id}`}
          className="flex items-center justify-center px-3 py-2 rounded-lg text-[11px] font-semibold transition-all duration-150"
          style={{
            background: `${athlete.stateColor}12`,
            border: `1px solid ${athlete.stateColor}25`,
            color: athlete.stateColor,
          }}
        >
          View →
        </Link>
      </div>
    </div>
  );
}
