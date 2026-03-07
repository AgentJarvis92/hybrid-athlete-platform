export function TeamPerformanceChart() {
  return (
    <div className="glass-card rounded-2xl px-7 py-6 animate-fadeIn">
      {/* Header */}
      <div className="flex justify-between items-start mb-5">
        <div>
          <div className="text-sm font-semibold text-text-primary">Team Performance Load</div>
          <div className="text-[11px] text-text-tertiary mt-0.5">
            7-day combined training stress, recovery readiness &amp; nutrition compliance
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-[11px] text-text-secondary">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#D4AF37" }} />
            Training Load
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-text-secondary">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#4DA3FF" }} />
            Recovery
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-text-secondary">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#00FF85" }} />
            Nutrition
          </div>
          <div className="w-px h-3 bg-border mx-1" />
          <div className="flex items-center gap-1 text-[11px] text-text-tertiary">
            <div
              className="w-3 h-2 rounded-[2px]"
              style={{ background: "rgba(212,175,55,0.07)", border: "1px solid rgba(212,175,55,0.15)" }}
            />
            Peak Load Band
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="overflow-x-auto">
      <div className="h-[180px] relative" style={{ minWidth: "600px" }}>
        <svg
          viewBox="0 0 900 180"
          preserveAspectRatio="none"
          style={{ height: "100%", width: "100%", overflow: "visible" }}
        >
          <defs>
            <linearGradient id="lgLime" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="lgBlue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4DA3FF" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#4DA3FF" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="lgGreen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00FF85" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#00FF85" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1="0" y1="36" x2="900" y2="36" stroke="#2A2F37" strokeWidth="0.5" />
          <line x1="0" y1="72" x2="900" y2="72" stroke="#2A2F37" strokeWidth="0.5" />
          <line x1="0" y1="108" x2="900" y2="108" stroke="#2A2F37" strokeWidth="0.5" />
          <line x1="0" y1="144" x2="900" y2="144" stroke="#2A2F37" strokeWidth="0.5" />

          {/* Zone 4 band */}
          <rect x="0" y="54" width="900" height="36" fill="rgba(212,175,55,0.04)" />
          <text x="4" y="48" fill="rgba(212,175,55,0.4)" fontSize="9" style={{ fontFamily: "var(--font-jetbrains, 'JetBrains Mono', ui-monospace, monospace)" }}>
            PEAK LOAD ZONE
          </text>

          {/* Y labels */}
          <text x="4" y="34" fill="#5E6573" fontSize="9" style={{ fontFamily: "var(--font-jetbrains, 'JetBrains Mono', ui-monospace, monospace)" }}>HI</text>
          <text x="4" y="148" fill="#5E6573" fontSize="9" style={{ fontFamily: "var(--font-jetbrains, 'JetBrains Mono', ui-monospace, monospace)" }}>LO</text>

          {/* Fill areas */}
          <path
            d="M0,90 C80,85 160,60 250,50 S400,35 480,42 S620,28 720,20 S840,32 900,38 L900,180 L0,180 Z"
            fill="url(#lgLime)"
          />
          <path
            className="chart-line"
            d="M0,90 C80,85 160,60 250,50 S400,35 480,42 S620,28 720,20 S840,32 900,38"
            stroke="#D4AF37"
            strokeDasharray="1000"
            strokeDashoffset="0"
          />

          <path
            d="M0,120 C100,110 150,80 200,70 S350,50 400,60 S550,40 650,30 S780,45 900,55 L900,180 L0,180 Z"
            fill="url(#lgBlue)"
          />
          <path
            className="chart-line"
            d="M0,120 C100,110 150,80 200,70 S350,50 400,60 S550,40 650,30 S780,45 900,55"
            stroke="#4DA3FF"
            strokeDasharray="1000"
            strokeDashoffset="0"
          />

          <path
            d="M0,140 C90,135 180,120 260,110 S380,95 450,100 S580,85 680,78 S800,88 900,82 L900,180 L0,180 Z"
            fill="url(#lgGreen)"
          />
          <path
            className="chart-line"
            d="M0,140 C90,135 180,120 260,110 S380,95 450,100 S580,85 680,78 S800,88 900,82"
            stroke="#00FF85"
            strokeDasharray="1000"
            strokeDashoffset="0"
          />

          {/* Data point markers */}
          <circle cx="650" cy="30" r="3" fill="#4DA3FF" opacity="0.8" />
          <circle cx="720" cy="20" r="3" fill="#D4AF37" opacity="0.9" />
          <circle cx="680" cy="78" r="3" fill="#00FF85" opacity="0.8" />
        </svg>
      </div>

      {/* X labels */}
      <div className="flex justify-between px-2 mt-2">
        {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((d) => (
          <span key={d} className="text-[10px] text-text-tertiary font-mono">
            {d}
          </span>
        ))}
      </div>
      </div>
    </div>
  );
}
