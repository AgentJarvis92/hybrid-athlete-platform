import type { ActiveFlags } from "@/types/athlete";

const PILL_STYLES = {
  red:    { color: "#FF4D4D", bg: "rgba(255,77,77,0.05)",  border: "rgba(255,77,77,0.3)" },
  yellow: { color: "#FACC15", bg: "rgba(250,204,21,0.05)", border: "rgba(250,204,21,0.3)" },
  blue:   { color: "#4DA3FF", bg: "rgba(77,163,255,0.05)", border: "rgba(77,163,255,0.3)" },
};

interface Props {
  flags: ActiveFlags;
}

export function FlagsPanelCard({ flags }: Props) {
  return (
    <div className="bg-bg-card border border-border rounded-lg p-5">
      <div className="text-sm font-semibold text-text-primary mb-4">Active Flags</div>

      <div className="flex flex-col gap-4">
        {/* Critical */}
        {flags.critical.length > 0 && (
          <div>
            <div className="text-[9px] uppercase font-bold tracking-[0.06em] text-text-tertiary mb-2">Critical</div>
            <div className="flex flex-wrap gap-1.5">
              {flags.critical.map((f) => (
                <span
                  key={f}
                  className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                  style={{ color: PILL_STYLES.red.color, background: PILL_STYLES.red.bg, border: `1px solid ${PILL_STYLES.red.border}` }}
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Monitor */}
        {flags.monitor.length > 0 && (
          <div>
            <div className="text-[9px] uppercase font-bold tracking-[0.06em] text-text-tertiary mb-2">Monitor</div>
            <div className="flex flex-wrap gap-1.5">
              {flags.monitor.map((f, i) => {
                // Last item gets blue treatment (Low Protein style)
                const style = i === flags.monitor.length - 1 ? PILL_STYLES.blue : PILL_STYLES.yellow;
                return (
                  <span
                    key={f}
                    className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                    style={{ color: style.color, background: style.bg, border: `1px solid ${style.border}` }}
                  >
                    {f}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Low Priority */}
        {flags.lowPriority && flags.lowPriority.length > 0 && (
          <div>
            <div className="text-[9px] uppercase font-bold tracking-[0.06em] text-text-tertiary mb-2">Watch</div>
            <div className="flex flex-wrap gap-1.5">
              {flags.lowPriority.map((f) => (
                <span
                  key={f}
                  className="text-[10px] font-semibold px-2.5 py-1 rounded-full text-text-secondary border border-border"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
