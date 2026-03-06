import { programCategories } from "@/data/mock-dashboard";

export function ProgramDistribution() {
  // Donut calc: circumference = 2π × 28 ≈ 175.9
  const total = programCategories.reduce((s, c) => s + c.count, 0);
  const circ = 2 * Math.PI * 28; // ≈ 175.93

  let offset = 0;
  const segments = programCategories.map((cat) => {
    const dashLen = (cat.count / total) * circ;
    const seg = { ...cat, dashLen, offset };
    offset += dashLen;
    return seg;
  });

  return (
    <div className="bg-bg-card border border-border rounded-lg px-6 py-5">
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="text-sm font-semibold text-text-primary">Program Distribution</div>
          <div className="text-[11px] text-text-tertiary mt-0.5">Planned session distribution across team</div>
        </div>
        <div className="text-[11px] text-text-tertiary font-mono">WK 43</div>
      </div>

      <div className="flex gap-6 items-center">
        {/* Horizontal bars */}
        <div className="flex-1 flex flex-col gap-2">
          {programCategories.map((cat) => (
            <div key={cat.label} className="flex items-center gap-2.5">
              <div className="w-[100px] text-[11px] text-text-secondary shrink-0">{cat.label}</div>
              <div className="flex-1 h-2 bg-border rounded overflow-hidden">
                <div
                  className="h-full rounded transition-all duration-500"
                  style={{ width: `${cat.percent}%`, background: cat.color }}
                />
              </div>
              <div className="w-7 text-right text-[11px] font-mono text-text-tertiary">{cat.count}</div>
            </div>
          ))}
        </div>

        {/* Donut SVG */}
        <svg className="w-[100px] h-[100px] shrink-0" viewBox="0 0 80 80">
          {/* Background ring */}
          <circle cx="40" cy="40" r="28" fill="none" stroke="#2A2F37" strokeWidth="10" />

          {/* Segments */}
          {segments.map((seg) => (
            <circle
              key={seg.label}
              cx="40"
              cy="40"
              r="28"
              fill="none"
              stroke={seg.color}
              strokeWidth="10"
              strokeDasharray={`${seg.dashLen} ${circ - seg.dashLen}`}
              strokeDashoffset={-seg.offset}
              transform="rotate(-90 40 40)"
            />
          ))}

          {/* Center text */}
          <text x="40" y="37" textAnchor="middle" fill="#F5F7FA" fontSize="10" fontWeight="700" fontFamily="JetBrains Mono">
            {total}
          </text>
          <text x="40" y="48" textAnchor="middle" fill="#5E6573" fontSize="7" fontFamily="Inter">
            sessions
          </text>
        </svg>
      </div>
    </div>
  );
}
