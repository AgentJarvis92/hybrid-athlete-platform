import type { CoachSignal } from "@/types/athlete";

const SEVERITY_COLOR = { red: "#FF4D4D", yellow: "#FACC15" };

interface Props {
  signals: CoachSignal[];
}

export function CoachSignals({ signals }: Props) {
  const redCount = signals.filter((s) => s.severity === "red").length;

  return (
    <div
      className="glass-card rounded-2xl p-5"
      style={{ background: "rgba(255,77,77,0.02)", border: "1px solid rgba(255,77,77,0.08)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <span className="text-sm font-semibold text-text-primary">Coach Signals</span>
        {signals.length > 0 && (
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0"
            style={{ background: "rgba(255,77,77,0.1)", color: "#FF4D4D", border: "1px solid rgba(255,77,77,0.2)" }}
          >
            {signals.length} ACTIVE
          </span>
        )}
      </div>

      {/* Signal cards grid */}
      <div className="grid grid-cols-4 gap-4">
        {signals.map((signal) => {
          const color = SEVERITY_COLOR[signal.severity];
          return (
            <div
              key={signal.id}
              className="rounded-2xl p-3.5 flex flex-col gap-2"
              style={{
                background: "#1E232B",
                border: "1px solid #2A2F37",
                borderLeft: `3px solid ${color}`,
              }}
            >
              {/* Tag on its own line so it never merges with title */}
              <span
                className="self-start text-[9px] font-mono px-1.5 py-0.5 rounded-full"
                style={{ color, background: `${color}18` }}
              >
                {signal.tag}
              </span>
              <span className="text-[12px] font-semibold text-text-primary leading-snug">{signal.title}</span>
              <p className="text-[11px] text-text-secondary leading-snug flex-1">{signal.description}</p>
              <button className="text-left text-[10px] text-text-tertiary underline hover:text-text-primary transition-colors cursor-pointer">
                {signal.actionLabel}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
