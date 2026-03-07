import { fuelSignals } from "@/data/mock-dashboard";

export function FuelingSignals() {
  return (
    <div className="glass-card rounded-2xl px-6 py-5">
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="text-sm font-semibold text-text-primary">Fueling Signals</div>
          <div className="text-[11px] text-text-tertiary mt-0.5">Team nutrition indicators · Today</div>
        </div>
        <div className="text-[10px] font-semibold tracking-wider" style={{ color: "#00FF85" }}>LIVE</div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {fuelSignals.map((signal) => (
          <div
            key={signal.label}
            className="glass-panel rounded-2xl px-4 py-3.5 flex flex-col gap-1.5"
          >
            <div className="text-[10px] uppercase tracking-wider text-text-tertiary font-semibold">
              {signal.label}
            </div>
            <div
              className="text-[20px] font-bold font-mono tracking-tight"
              style={{ color: signal.color }}
            >
              {signal.value}
              {signal.unit && (
                <span className="text-[11px] text-text-secondary font-sans ml-0.5">{signal.unit}</span>
              )}
            </div>
            <div className="text-[11px] text-text-secondary leading-snug">{signal.detail}</div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div
                className="w-[5px] h-[5px] rounded-full shrink-0"
                style={{ background: signal.dotColor }}
              />
              <span className="text-[10px] text-text-tertiary">{signal.dotLabel}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
