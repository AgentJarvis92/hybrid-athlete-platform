import type { AthleteStateSummary } from "@/types/athlete";

const ADAPTATION_NODES = ["Under", "Adapting", "Improving", "Stalled", "Over"];

interface Props {
  summary: AthleteStateSummary;
}

export function AthleteStateKPIRow({ summary }: Props) {
  return (
    <div className="grid grid-cols-5 gap-4">
      {/* Current State */}
      <div className="bg-bg-card border border-border rounded-lg p-4 hover:-translate-y-px transition-all">
        <div className="text-[11px] uppercase tracking-[0.06em] font-bold text-text-tertiary mb-1">Current State</div>
        <div className="font-mono text-[20px] font-bold" style={{ color: summary.stateColor }}>
          {summary.currentState}
        </div>
        <div className="text-[11px] text-text-secondary mt-0.5">{summary.stateSubtext}</div>
      </div>

      {/* Training Load */}
      <div className="bg-bg-card border border-border rounded-lg p-4 hover:-translate-y-px transition-all">
        <div className="text-[11px] uppercase tracking-[0.06em] font-bold text-text-tertiary mb-1">Training Load</div>
        <div className="font-mono text-[20px] font-bold" style={{ color: summary.trainingLoadColor }}>
          {summary.trainingLoad}{" "}
          <span className="text-[12px] font-medium">{summary.trainingLoadUnit}</span>
        </div>
        <div className="text-[11px] flex items-center gap-1 mt-0.5" style={{ color: summary.trainingLoadColor }}>
          <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
          </svg>
          {summary.trainingLoadTrend}
        </div>
      </div>

      {/* Recovery Score */}
      <div className="bg-bg-card border border-border rounded-lg p-4 hover:-translate-y-px transition-all">
        <div className="text-[11px] uppercase tracking-[0.06em] font-bold text-text-tertiary mb-1">Recovery Score</div>
        <div className="font-mono text-[20px] font-bold" style={{ color: summary.recoveryColor }}>
          {summary.recoveryScore}<span className="text-[12px] font-medium">%</span>
        </div>
        <div className="text-[11px] flex items-center gap-1 mt-0.5" style={{ color: summary.recoveryColor }}>
          <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/>
          </svg>
          {summary.recoverySubtext}
        </div>
      </div>

      {/* Nutrition */}
      <div className="bg-bg-card border border-border rounded-lg p-4 hover:-translate-y-px transition-all">
        <div className="text-[11px] uppercase tracking-[0.06em] font-bold text-text-tertiary mb-1">Nutrition</div>
        <div className="font-mono text-[20px] font-bold" style={{ color: summary.nutritionColor }}>
          {summary.nutritionAdherence}<span className="text-[12px] font-medium">%</span>
        </div>
        <div className="text-[11px] flex items-center gap-1 mt-0.5 text-text-secondary">
          <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          {summary.nutritionSubtext}
        </div>
      </div>

      {/* Adaptation Status — special card */}
      <div
        className="rounded-lg p-4 hover:-translate-y-px transition-all"
        style={{
          background: `${summary.adaptationColor}08`,
          border: `1px solid ${summary.adaptationColor}28`,
        }}
      >
        <div className="text-[11px] uppercase tracking-[0.06em] font-bold text-text-tertiary mb-1">Adaptation Status</div>
        <div className="font-mono font-bold text-[18px] mb-1" style={{ color: summary.adaptationColor }}>
          {summary.adaptationStatus}
        </div>
        <div className="text-[10px] text-text-tertiary leading-snug mb-2">{summary.adaptationNote}</div>

        {/* 5-node progress track */}
        <div className="flex items-center gap-0.5 mt-1">
          <span className="text-[8px] text-text-tertiary font-mono whitespace-nowrap mr-0.5">Under</span>
          {ADAPTATION_NODES.map((_, i) => {
            const isActive = i === summary.adaptationPosition;
            const isPast = i < summary.adaptationPosition;
            return (
              <div key={i} className="flex items-center flex-1">
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{
                    background: isActive ? summary.adaptationColor : "#1E232B",
                    border: `1px solid ${isActive ? summary.adaptationColor : "#2A2F37"}`,
                    width: isActive ? "10px" : "8px",
                    height: isActive ? "10px" : "8px",
                    boxShadow: isActive ? `0 0 6px ${summary.adaptationColor}66` : "none",
                  }}
                />
                {i < ADAPTATION_NODES.length - 1 && (
                  <div
                    className="flex-1 h-px"
                    style={{
                      background: isPast ? `${summary.adaptationColor}66` : "#2A2F37",
                    }}
                  />
                )}
              </div>
            );
          })}
          <span className="text-[8px] text-text-tertiary font-mono whitespace-nowrap ml-0.5">Over</span>
        </div>
      </div>
    </div>
  );
}
