import type { KpiData } from "@/types/dashboard";

function TrendArrow({ direction }: { direction: "up" | "down" | "neutral" }) {
  if (direction === "up") {
    return (
      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
      </svg>
    );
  }
  if (direction === "down") {
    return (
      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" /><polyline points="17 18 23 18 23 12" />
      </svg>
    );
  }
  return null;
}

export function KpiCard({ data }: { data: KpiData }) {
  return (
    <div className="bg-bg-card border border-border rounded-lg p-5 relative overflow-hidden transition-all duration-200 hover:border-[rgba(198,255,0,0.25)] hover:shadow-[0_0_0_1px_rgba(198,255,0,0.06),0_4px_24px_rgba(0,0,0,0.4)] hover:-translate-y-px">
      <div className="text-[11px] uppercase tracking-wider text-text-secondary font-semibold mb-3">
        {data.label}
      </div>

      <div
        className="text-[28px] font-bold font-mono tracking-tighter mb-2 flex items-baseline gap-2"
        style={data.color ? { color: data.color } : undefined}
      >
        {data.color === "#C6FF00" ? (
          <span className="glow-lime">{data.value}</span>
        ) : (
          <span>{data.value}</span>
        )}
        {data.unit && (
          <span className="text-sm text-text-secondary font-medium font-sans">{data.unit}</span>
        )}
      </div>

      {data.trend && (
        <div className={`text-xs flex items-center gap-1 mb-1.5 ${
          data.trend.direction === "up" ? "text-success" : data.trend.direction === "down" ? "text-danger" : "text-text-secondary"
        }`}>
          <TrendArrow direction={data.trend.direction} />
          <span>{data.trend.text}</span>
        </div>
      )}

      {data.progress && (
        <>
          <div className="flex items-center gap-2 my-1.5 mb-1">
            <div className="flex-1 h-1 bg-border rounded-sm overflow-hidden">
              <div
                className="h-full bg-accent-lime rounded-sm"
                style={{ width: `${data.progress.value}%` }}
              />
            </div>
            <span className="text-[11px] text-accent-lime font-mono">{data.progress.value}%</span>
          </div>
          <div className="text-[11px] text-text-tertiary mb-1">{data.progress.label}</div>
        </>
      )}

      {data.breakdown && (
        <div className="flex items-center gap-2">
          {data.breakdown.map((b, i) => (
            <div key={b.label} className="flex items-center gap-1">
              {i > 0 && <span className="text-[11px] text-text-tertiary">·</span>}
              <span
                className="text-[11px] font-mono"
                style={{ color: b.color || "#5E6573" }}
              >
                {b.value} {b.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {data.sparkline && (
        <div className="h-6 w-full flex items-end gap-0.5 mt-3 opacity-60">
          {data.sparkline.map((h, i) => (
            <div
              key={i}
              className={`flex-1 rounded-[1px] ${
                i === data.sparkline!.length - 2 ? "bg-accent-lime opacity-100" : "bg-text-secondary"
              }`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      )}

      {data.detail && (
        <div className="text-[11px] text-text-tertiary">{data.detail}</div>
      )}

      {data.label === "Avg Training Load" && (
        <div className="flex gap-[3px] items-end h-5">
          {[50, 65, 75, 100].map((h, i) => (
            <div
              key={i}
              className="w-3 rounded-[1px]"
              style={{
                height: `${h}%`,
                background: i === 3 ? "#C6FF00" : `rgba(198,255,0,${0.2 + i * 0.15})`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
