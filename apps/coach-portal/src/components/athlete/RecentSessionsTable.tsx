import type { RecentSession, SessionOutcome } from "@/types/athlete";

const OUTCOME_STYLES: Record<SessionOutcome, { label: string; color: string; bg: string; border: string }> = {
  completed:       { label: "Completed",      color: "#22C55E", bg: "rgba(34,197,94,0.1)",   border: "rgba(34,197,94,0.2)" },
  "high-rpe":      { label: "High RPE",        color: "#FACC15", bg: "rgba(250,204,21,0.1)", border: "rgba(250,204,21,0.2)" },
  "reduced-output":{ label: "Reduced Output",  color: "#FACC15", bg: "rgba(250,204,21,0.1)", border: "rgba(250,204,21,0.2)" },
  skipped:         { label: "Skipped",         color: "#5E6573", bg: "#1E232B",              border: "#2A2F37" },
  strong:          { label: "Strong Response", color: "#22C55E", bg: "rgba(34,197,94,0.1)",  border: "rgba(34,197,94,0.2)" },
};

interface Props {
  sessions: RecentSession[];
}

export function RecentSessionsTable({ sessions }: Props) {
  return (
    <div className="bg-bg-card border border-border rounded-lg overflow-hidden">
      <div className="px-5 py-3 border-b border-border">
        <span className="text-sm font-semibold text-text-primary">Recent Sessions</span>
      </div>
      <table className="w-full border-collapse text-[12px]">
        <thead>
          <tr>
            {["Session", "Type", "Duration", "Load", "Outcome", "Note"].map((h) => (
              <th
                key={h}
                className="text-left px-5 py-3 text-[11px] uppercase tracking-[0.06em] font-bold text-text-tertiary border-b border-border"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sessions.map((s) => {
            const o = OUTCOME_STYLES[s.outcome];
            return (
              <tr key={s.id} className="border-b border-bg-elevated hover:bg-bg-elevated transition-colors group">
                <td className="px-5 py-3 font-medium text-text-primary group-hover:text-text-primary">{s.name}</td>
                <td className="px-5 py-3 text-text-secondary">{s.type}</td>
                <td className="px-5 py-3 text-text-secondary font-mono">{s.duration}</td>
                <td className="px-5 py-3 text-text-secondary font-mono">{s.load}</td>
                <td className="px-5 py-3">
                  <span
                    className="px-1.5 py-0.5 rounded text-[10px] font-medium"
                    style={{ color: o.color, background: o.bg, border: `1px solid ${o.border}` }}
                  >
                    {o.label}
                  </span>
                </td>
                <td className="px-5 py-3 text-text-secondary">{s.note}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
