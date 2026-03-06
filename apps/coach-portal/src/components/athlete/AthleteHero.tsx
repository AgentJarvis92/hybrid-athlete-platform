import type { AthleteDetail } from "@/types/athlete";

const STATE_COLORS: Record<string, string> = {
  red: "#FF4D4D",
  yellow: "#FACC15",
  green: "#22C55E",
  blue: "#4DA3FF",
  gray: "#8A93A0",
};

interface Props {
  athlete: AthleteDetail;
}

export function AthleteHero({ athlete }: Props) {
  const stateColor = STATE_COLORS[athlete.stateBadgeColor] ?? "#8A93A0";

  return (
    <div className="flex items-end justify-between pb-5 border-b border-border">
      {/* Left — identity */}
      <div className="flex items-center gap-5">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0"
          style={{ background: "#1E232B", border: "2px solid #2A2F37", color: "#8A93A0" }}
        >
          {athlete.initials}
        </div>
        <div>
          <h1 className="text-[24px] font-bold tracking-tight text-text-primary">{athlete.name}</h1>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-[11px] uppercase font-semibold tracking-wider text-text-secondary bg-bg-card border border-border px-2 py-0.5 rounded">
              {athlete.type}
            </span>
            <span
              className="text-[11px] uppercase font-bold tracking-wider px-2 py-0.5 rounded"
              style={{
                color: stateColor,
                background: `${stateColor}18`,
                border: `1px solid ${stateColor}33`,
              }}
            >
              {athlete.state}
            </span>
            {/* Hero quick stats */}
            <div className="flex gap-5 ml-4 pl-4 border-l border-border">
              {[
                { label: "Recovery", value: `${athlete.recovery}%`, color: athlete.recovery < 50 ? "#FF4D4D" : athlete.recovery < 70 ? "#FACC15" : "#22C55E" },
                { label: "Load", value: `${athlete.load} ATL`, color: athlete.load > 85 ? "#FF4D4D" : athlete.load > 70 ? "#FACC15" : "#C6FF00" },
                { label: "Nutrition", value: `${athlete.nutrition}%`, color: athlete.nutrition < 60 ? "#FF4D4D" : athlete.nutrition < 80 ? "#FACC15" : "#22C55E" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-0.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-text-tertiary">{stat.label}</span>
                  <span className="font-mono font-bold text-[15px]" style={{ color: stat.color }}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right — integrations + actions */}
      <div className="flex flex-col items-end gap-3">
        {/* Integrations */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-text-tertiary mr-1 tracking-wide">CONNECTED:</span>
          {athlete.integrations.map((int) => (
            <div
              key={int.name}
              title={int.connected ? `${int.name} Connected` : `${int.name} Not Connected`}
              className="w-2 h-2 rounded-full"
              style={{
                background: int.connected ? "#22C55E" : "#2A2F37",
                boxShadow: int.connected ? "0 0 6px rgba(34,197,94,0.4)" : "none",
              }}
            />
          ))}
        </div>
        {/* Action buttons */}
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-text-secondary bg-bg-card border border-border rounded-md hover:border-text-primary hover:text-text-primary transition-all cursor-pointer">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            Message
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-text-secondary bg-bg-card border border-border rounded-md hover:border-text-primary hover:text-text-primary transition-all cursor-pointer">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            Note
          </button>
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium rounded-md transition-all cursor-pointer"
            style={{ color: "#C6FF00", background: "rgba(198,255,0,0.05)", border: "1px solid rgba(198,255,0,0.3)" }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            Adjust Training
          </button>
        </div>
      </div>
    </div>
  );
}
