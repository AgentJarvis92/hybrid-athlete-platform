import Link from "next/link";
import { attentionAlerts } from "@/data/mock-dashboard";
import type { AttentionAlert } from "@/types/dashboard";

function AlertIcon({ severity }: { severity: string }) {
  if (severity === "red") {
    return (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    );
  }
  if (severity === "yellow") {
    return (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    );
  }
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function AlertCard({ alert }: { alert: AttentionAlert }) {
  const severityColors = {
    red: { left: "#FF4D4D", icon: "rgba(255,77,77,0.12)", iconBorder: "rgba(255,77,77,0.2)", iconColor: "#FF4D4D" },
    yellow: { left: "#FACC15", icon: "rgba(250,204,21,0.12)", iconBorder: "rgba(250,204,21,0.2)", iconColor: "#FACC15" },
    blue: { left: "#4DA3FF", icon: "rgba(77,163,255,0.12)", iconBorder: "rgba(77,163,255,0.2)", iconColor: "#4DA3FF" },
  };
  const colors = severityColors[alert.severity];
  const cardClass = "glass-card rounded-2xl p-2.5 px-3 gold-card-glow flex gap-2.5 items-start transition-all duration-200 relative overflow-hidden hover:border-border-highlight hover:bg-bg-elevated";

  const inner = (
    <>
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
        style={{ background: colors.icon, border: `1px solid ${colors.iconBorder}`, color: colors.iconColor }}
      >
        <AlertIcon severity={alert.severity} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-bold text-text-primary">{alert.athlete}</div>
        <div className="text-[11px] text-text-secondary mt-0.5 leading-snug">{alert.reason}</div>
        <div className="text-[10px] text-text-tertiary mt-1 font-mono flex items-center gap-1.5">
          {alert.meta}
          {alert.metaHighlight && (
            <>
              <span className="opacity-40">·</span>
              <span style={{ color: alert.metaHighlight.color }}>{alert.metaHighlight.text}</span>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col items-end gap-1.5">
        <span className="text-[10px] text-text-tertiary font-mono whitespace-nowrap">{alert.time}</span>
        <button className="btn-pill-ghost text-[10px] whitespace-nowrap">
          {alert.action}
        </button>
      </div>
    </>
  );

  if (alert.athleteId) {
    return (
      <Link
        href={`/athletes/${alert.athleteId}`}
        className={`${cardClass} cursor-pointer`}
        style={{ borderLeft: `3px solid ${colors.left}` }}
      >
        {inner}
      </Link>
    );
  }

  return (
    <div
      className={`${cardClass} cursor-default`}
      style={{ borderLeft: `3px solid ${colors.left}` }}
    >
      {inner}
    </div>
  );
}

export function CoachAttentionQueue() {
  return (
    <div className="flex flex-col gap-2 overflow-y-auto">
      <div className="text-[11px] uppercase tracking-[0.06em] text-text-tertiary font-bold mb-1.5 flex items-center justify-between gap-3">
        <span className="text-text-secondary">Coach Attention</span>
        <span
          className="text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse"
          style={{
            background: "rgba(255,77,77,0.15)",
            color: "#FF4D4D",
            border: "1px solid rgba(255,77,77,0.3)",
          }}
        >
          {attentionAlerts.length} ACTIVE
        </span>
      </div>
      {attentionAlerts.map((alert) => (
        <AlertCard key={alert.id} alert={alert} />
      ))}
    </div>
  );
}
