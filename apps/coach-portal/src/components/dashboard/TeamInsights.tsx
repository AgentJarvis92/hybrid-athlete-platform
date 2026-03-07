import { teamInsights } from "@/data/mock-dashboard";

function TrendArrow({ direction }: { direction: "up" | "down" | "neutral" }) {
  if (direction === "up") {
    return (
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    );
  }
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
      <polyline points="17 18 23 18 23 12" />
    </svg>
  );
}

export function TeamInsights() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {teamInsights.map((insight, i) => (
        <div
          key={i}
          className="glass-panel rounded-2xl px-4 py-3.5 flex flex-col gap-2 transition-all duration-200 hover:border-border-highlight"
        >
          <div className="text-[10px] uppercase tracking-wider text-text-tertiary font-semibold">
            {insight.label}
          </div>
          <div
            className="text-[22px] font-bold font-mono tracking-tight"
            style={{ color: insight.color }}
          >
            {insight.value}
            {insight.unit && (
              <span className="text-[13px] text-text-secondary font-sans font-normal ml-0.5">
                {insight.unit}
              </span>
            )}
          </div>
          <div className="h-[3px] bg-border rounded-sm overflow-hidden">
            <div
              className="h-full rounded-sm transition-all duration-700"
              style={{
                width: `${insight.barPercent}%`,
                background: insight.label === "Nutrition Trend"
                  ? "linear-gradient(90deg, #00FF85, #D4AF37)"
                  : insight.color,
              }}
            />
          </div>
          <div className="text-[11px] text-text-secondary">{insight.sub}</div>
          <div
            className="flex items-center gap-1 text-[10px] mt-0.5"
            style={{ color: insight.trend.color }}
          >
            <TrendArrow direction={insight.trend.direction} />
            {insight.trend.text}
          </div>
        </div>
      ))}
    </div>
  );
}
