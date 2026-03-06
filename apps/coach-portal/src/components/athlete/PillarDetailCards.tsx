import type { PillarTraining, PillarRecovery, PillarNutrition } from "@/types/athlete";

interface Props {
  training: PillarTraining;
  recovery: PillarRecovery;
  nutrition: PillarNutrition;
}

function ProgressBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="h-1 bg-bg-elevated rounded-full overflow-hidden mt-1">
      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

export function PillarDetailCards({ training, recovery, nutrition }: Props) {
  return (
    <div className="flex flex-col gap-3.5">
      {/* TRAINING */}
      <div className="bg-bg-card border border-border rounded-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] uppercase tracking-[0.06em] font-bold" style={{ color: "#C6FF00" }}>Training</span>
          <span className="text-[10px] text-text-tertiary font-normal">
            A:C {training.acRatio}{" "}
            <span style={{ color: training.acColor }}>↑ elevated</span>
          </span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-bg-elevated">
          <span className="text-[11px] text-text-secondary">Weekly Load</span>
          <span className="font-mono text-[12px] font-semibold" style={{ color: training.loadColor }}>
            {training.weeklyLoad} ATL
          </span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-bg-elevated">
          <span className="text-[11px] text-text-secondary">Sessions</span>
          <span className="font-mono text-[12px] font-semibold text-text-primary">
            {training.sessionsCompleted} of {training.sessionsTotal}{" "}
            <span className="text-[10px] text-text-tertiary font-normal">completed</span>
          </span>
        </div>
        {/* Sparkline */}
        <div className="py-3 border-b border-bg-elevated">
          <div className="text-[10px] text-text-tertiary mb-1.5 uppercase tracking-wider">7-Day Session Load</div>
          <div className="flex items-end gap-0.5 h-7">
            {training.sparkData.map((v, i) => {
              const pct = (v / 100);
              const isHigh = v >= 90;
              return (
                <div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{
                    height: `${pct * 100}%`,
                    background: isHigh ? `rgba(255,77,77,${0.5 + i * 0.05})` : `rgba(198,255,0,${0.25 + i * 0.04})`,
                  }}
                />
              );
            })}
          </div>
        </div>
        {/* Zone distribution */}
        <div className="flex justify-between items-center pt-2">
          <span className="text-[11px] text-text-secondary">Zone Distribution</span>
          <div className="flex items-end gap-0.5 h-[18px]">
            {[
              { h: "25%", color: "#4DA3FF" },
              { h: "40%", color: "#22C55E" },
              { h: "30%", color: "#FACC15" },
              { h: "90%", color: "#C6FF00" },
              { h: "15%", color: "#FB923C" },
            ].map((z, i) => (
              <div key={i} className="w-2 rounded-sm" style={{ height: z.h, background: z.color, opacity: 0.7 }} />
            ))}
          </div>
        </div>
      </div>

      {/* RECOVERY */}
      <div className="bg-bg-card border border-border rounded-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] uppercase tracking-[0.06em] font-bold" style={{ color: "#4DA3FF" }}>Recovery</span>
          <span className="text-[10px] font-normal" style={{ color: "#FF4D4D" }}>Suppressed ↓</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-bg-elevated">
          <span className="text-[11px] text-text-secondary">Readiness Score</span>
          <span className="font-mono text-[16px] font-semibold" style={{ color: recovery.readinessColor }}>
            {recovery.readinessScore}%
          </span>
        </div>
        {/* HRV trend */}
        <div className="py-3 border-b border-bg-elevated">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] text-text-tertiary uppercase tracking-wider">HRV Trend · 7 Days</span>
            <span className="text-[10px] font-mono" style={{ color: "#FF4D4D" }}>
              {recovery.hrvStart} → {recovery.hrvEnd}ms
            </span>
          </div>
          <svg viewBox="0 0 120 28" width="100%" height="28" style={{ overflow: "visible" }}>
            <polyline
              points={recovery.hrv.map((v, i) => `${(i / (recovery.hrv.length - 1)) * 120},${v}`).join(" ")}
              fill="none" stroke="#4DA3FF" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.8"
            />
            <circle cx="0" cy={recovery.hrv[0]} r="2" fill="#4DA3FF" opacity="0.6" />
            <circle cx="120" cy={recovery.hrv[recovery.hrv.length - 1]} r="2" fill="#FF4D4D" />
          </svg>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-bg-elevated">
          <span className="text-[11px] text-text-secondary">Sleep Avg</span>
          <span className="font-mono text-[12px] font-semibold" style={{ color: "#FACC15" }}>
            {recovery.sleepAvg}h{" "}
            <span className="text-[10px] text-text-tertiary font-normal">/ {recovery.sleepTarget}h target</span>
          </span>
        </div>
        <div className="flex justify-between items-center pt-2">
          <span className="text-[11px] text-text-secondary">Fatigue State</span>
          <span
            className="text-[11px] font-semibold px-1.5 py-0.5 rounded"
            style={{ color: recovery.fatigueColor, background: `${recovery.fatigueColor}18`, border: `1px solid ${recovery.fatigueColor}33` }}
          >
            {recovery.fatigueState}
          </span>
        </div>
      </div>

      {/* NUTRITION */}
      <div className="bg-bg-card border border-border rounded-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] uppercase tracking-[0.06em] font-bold" style={{ color: "#00FF85" }}>Nutrition</span>
          <span className="text-[10px] font-normal" style={{ color: "#FACC15" }}>{nutrition.adherence}% adherence</span>
        </div>
        {/* Calories */}
        <div className="pb-3 border-b border-bg-elevated">
          <div className="flex justify-between mb-1">
            <span className="text-[10px] text-text-tertiary">Calories</span>
            <span className="text-[10px] font-mono text-text-secondary">
              {nutrition.calories.toLocaleString()}{" "}
              <span className="text-text-tertiary">/ {nutrition.caloriesTarget.toLocaleString()}</span>
            </span>
          </div>
          <ProgressBar value={nutrition.calories} max={nutrition.caloriesTarget} color="#FF4D4D" />
          <div className="flex justify-between mt-3 mb-1">
            <span className="text-[10px] text-text-tertiary">Protein</span>
            <span className="text-[10px] font-mono text-text-secondary">
              {nutrition.protein}g <span className="text-text-tertiary">/ {nutrition.proteinTarget}g</span>
            </span>
          </div>
          <ProgressBar value={nutrition.protein} max={nutrition.proteinTarget} color="#FACC15" />
        </div>
        <div className="flex justify-between items-center py-2 border-b border-bg-elevated">
          <span className="text-[11px] text-text-secondary">Hydration</span>
          <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold" style={{ color: "#FF4D4D" }}>
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#FF4D4D" }} />
            {nutrition.hydration}L{" "}
            <span className="text-[10px] text-text-tertiary font-normal">/ {nutrition.hydrationTarget}L</span>
          </div>
        </div>
        <div className="flex justify-between items-center pt-2">
          <span className="text-[11px] text-text-secondary">Fueling Pattern</span>
          <span className="text-[10px] text-text-tertiary">{nutrition.fuelingPattern}</span>
        </div>
      </div>
    </div>
  );
}
