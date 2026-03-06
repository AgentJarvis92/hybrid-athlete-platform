"use client";
import { useState, useEffect } from "react";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function LiveClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) return null;

  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  const day = days[now.getDay()];
  const month = months[now.getMonth()];
  const date = pad(now.getDate());
  const year = now.getFullYear();
  const h = pad(now.getHours());
  const m = pad(now.getMinutes());
  const s = pad(now.getSeconds());

  // Get short timezone abbreviation
  const tz = now
    .toLocaleTimeString("en-US", { timeZoneName: "short" })
    .split(" ")
    .pop() ?? "LT";

  return (
    <div className="font-mono text-accent-lime text-[12px] tracking-wide">
      {day} {month} {date}, {year}
      <span className="text-text-tertiary mx-1.5">//</span>
      {h}:{m}:{s}
      <span className="text-text-tertiary ml-1.5">{tz}</span>
    </div>
  );
}
