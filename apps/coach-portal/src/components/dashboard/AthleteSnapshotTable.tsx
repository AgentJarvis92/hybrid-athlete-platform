import Link from "next/link";
import { athleteSnapshots } from "@/data/mock-dashboard";
import type { AthleteSnapshot } from "@/types/dashboard";

function RiskBadge({ badge }: { badge: AthleteSnapshot["badge"] }) {
  const styles = {
    high: "text-danger bg-[rgba(255,77,77,0.1)] border-[rgba(255,77,77,0.2)]",
    med: "text-warning bg-[rgba(250,204,21,0.1)] border-[rgba(250,204,21,0.2)]",
    pr: "text-accent-secondary bg-[rgba(0,255,133,0.08)] border-[rgba(0,255,133,0.2)]",
  };
  return (
    <span className={`inline-flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded border uppercase tracking-wide ${styles[badge.type]}`}>
      {badge.text}
    </span>
  );
}

function NutriBadge({ status, label }: { status: string; label: string }) {
  const styles = {
    on: "text-[#00FF85] bg-[rgba(0,255,133,0.08)] border-[rgba(0,255,133,0.2)]",
    low: "text-warning bg-[rgba(250,204,21,0.08)] border-[rgba(250,204,21,0.2)]",
    under: "text-danger bg-[rgba(255,77,77,0.08)] border-[rgba(255,77,77,0.2)]",
  };
  return (
    <span className={`inline-flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded border uppercase tracking-wide whitespace-nowrap ${styles[status as "on" | "low" | "under"]}`}>
      {label}
    </span>
  );
}

function RecScore({ score, level, note }: { score: number; level: string; note: string }) {
  const colors = { high: "#22C55E", mid: "#FACC15", low: "#FF4D4D" };
  return (
    <div className="flex items-center gap-1.5">
      <span className="font-mono text-[13px] font-semibold" style={{ color: colors[level as "high" | "mid" | "low"] }}>
        {score}%
      </span>
      <span className="text-[10px] text-text-tertiary opacity-30">·</span>
      <span className="text-[10px] text-text-tertiary opacity-60">{note}</span>
    </div>
  );
}

function StatusDot({ color }: { color: string }) {
  const styles = {
    green: "bg-success shadow-[0_0_8px_rgba(34,197,94,0.4)]",
    yellow: "bg-warning",
    red: "bg-danger",
  };
  return (
    <div className={`w-2 h-2 rounded-full ${styles[color as "green" | "yellow" | "red"]}`} />
  );
}

export function AthleteSnapshotTable() {
  return (
    <div className="bg-bg-card border border-border rounded-lg overflow-hidden flex flex-col">
      <div className="px-5 py-4 border-b border-border flex justify-between items-center">
        <div className="text-sm font-semibold text-text-primary">Athlete Snapshot</div>
        <button className="px-3 py-1 border border-border rounded text-text-secondary text-xs cursor-pointer transition-all hover:border-text-primary hover:text-text-primary">
          Filter
        </button>
      </div>
      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr>
            {["Athlete", "Last Session", "Weekly Load", "Recovery", "Nutrition", "Status", "Action"].map((h) => (
              <th
                key={h}
                className="text-left px-5 py-3 text-text-tertiary font-medium border-b border-border text-[11px] uppercase"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {athleteSnapshots.map((athlete) => (
            <tr
              key={athlete.id}
              className="group transition-colors hover:bg-bg-hover"
            >
              {/* Athlete */}
              <td className="px-5 py-3 border-b border-border group-hover:text-text-primary">
                <Link
                  href={`/athletes/${athlete.id.toLowerCase()}`}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <div className="w-6 h-6 rounded-full bg-bg-elevated border border-border text-[10px] grid place-items-center text-text-secondary">
                    {athlete.initials}
                  </div>
                  <div>
                    <div className="text-text-primary font-medium text-[13px] group-hover:text-accent-lime transition-colors">{athlete.name}</div>
                    <RiskBadge badge={athlete.badge} />
                  </div>
                </Link>
              </td>

              {/* Last Session */}
              <td className="px-5 py-3 border-b border-border text-text-secondary font-mono text-xs">
                {athlete.lastSession}
              </td>

              {/* Weekly Load */}
              <td className="px-5 py-3 border-b border-border">
                <div className="flex flex-col gap-1">
                  <span
                    className="font-mono text-xs"
                    style={{ color: athlete.weeklyLoadColor === "#FF4D4D" ? "#FF4D4D" : undefined }}
                  >
                    {athlete.weeklyLoad} ATL
                  </span>
                  <div className="w-16 h-[3px] bg-border rounded overflow-hidden">
                    <div
                      className="h-full rounded"
                      style={{ width: `${athlete.weeklyLoad}%`, background: athlete.weeklyLoadColor }}
                    />
                  </div>
                </div>
              </td>

              {/* Recovery */}
              <td className="px-5 py-3 border-b border-border">
                <RecScore {...athlete.recovery} />
              </td>

              {/* Nutrition */}
              <td className="px-5 py-3 border-b border-border">
                <NutriBadge status={athlete.nutrition.status} label={athlete.nutrition.label} />
              </td>

              {/* Status */}
              <td className="px-5 py-3 border-b border-border">
                <StatusDot color={athlete.statusColor} />
              </td>

              {/* Action */}
              <td className="px-5 py-3 border-b border-border">
                <Link
                  href={`/athletes/${athlete.id === "SL" ? "sl" : athlete.id.toLowerCase()}`}
                  className="inline-block px-3 py-1 border border-border rounded text-text-secondary text-xs transition-all hover:border-text-primary hover:text-text-primary"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
