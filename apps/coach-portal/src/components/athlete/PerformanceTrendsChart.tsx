const DAY_LABELS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export function PerformanceTrendsChart() {
  return (
    <div className="bg-bg-card border border-border rounded-lg px-6 py-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <span className="text-sm font-semibold text-text-primary">Performance Trends · 14 Days</span>
        <div className="flex gap-4">
          {[
            { label: "Load", color: "#C6FF00" },
            { label: "Recovery", color: "#4DA3FF" },
            { label: "Nutrition", color: "#00FF85" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5 text-[11px] text-text-secondary">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: l.color }} />
              {l.label}
            </div>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-60 w-full relative">
        <svg viewBox="0 0 1000 240" preserveAspectRatio="none" style={{ width: "100%", height: "100%", overflow: "visible" }}>
          {/* Grid lines */}
          <line x1="0" y1="60" x2="1000" y2="60" stroke="#2A2F37" strokeWidth="1" />
          <line x1="0" y1="120" x2="1000" y2="120" stroke="#2A2F37" strokeWidth="1" />
          <line x1="0" y1="180" x2="1000" y2="180" stroke="#2A2F37" strokeWidth="1" />

          {/* Load zone band */}
          <rect x="0" y="80" width="1000" height="40" fill="rgba(198,255,0,0.03)" />

          <defs>
            <linearGradient id="atlGradLime" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#C6FF00" stopOpacity="0.1" />
              <stop offset="1" stopColor="#C6FF00" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="atlGradBlue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#4DA3FF" stopOpacity="0.1" />
              <stop offset="1" stopColor="#4DA3FF" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Load line + fill */}
          <path
            d="M0,140 C100,135 200,145 300,130 S500,110 600,80 S800,50 900,40 L1000,30 L1000,240 L0,240 Z"
            fill="url(#atlGradLime)"
          />
          <path
            d="M0,140 C100,135 200,145 300,130 S500,110 600,80 S800,50 900,40 L1000,30"
            fill="none" stroke="#C6FF00" strokeWidth="2"
          />

          {/* Recovery line + fill (dashed) */}
          <path
            d="M0,80 C100,75 200,85 300,90 S500,120 600,150 S800,180 900,200 L1000,210 L1000,240 L0,240 Z"
            fill="url(#atlGradBlue)"
          />
          <path
            d="M0,80 C100,75 200,85 300,90 S500,120 600,150 S800,180 900,200 L1000,210"
            fill="none" stroke="#4DA3FF" strokeWidth="2" strokeDasharray="4 2"
          />

          {/* Annotation: load spike */}
          <line x1="600" y1="0" x2="600" y2="240" stroke="#5E6573" strokeWidth="1" strokeDasharray="2 2" />
          <text x="605" y="15" fill="#5E6573" fontSize="10" fontFamily="'JetBrains Mono', monospace">LOAD SPIKE</text>
        </svg>
      </div>

      {/* Day labels */}
      <div className="flex justify-between mt-2 px-2 text-[10px] text-text-tertiary font-mono">
        {DAY_LABELS.map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>
    </div>
  );
}
