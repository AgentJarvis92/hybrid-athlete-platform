import { KpiCards } from "@/components/dashboard/KpiCards";
import { TeamPerformanceChart } from "@/components/dashboard/TeamPerformanceChart";
import { TeamReadinessMap } from "@/components/dashboard/TeamReadinessMap";
import { TeamInsights } from "@/components/dashboard/TeamInsights";
import { ProgramDistribution } from "@/components/dashboard/ProgramDistribution";
import { FuelingSignals } from "@/components/dashboard/FuelingSignals";
import { AthleteSnapshotTable } from "@/components/dashboard/AthleteSnapshotTable";
import { LivePerformanceFeed } from "@/components/dashboard/LivePerformanceFeed";

export default function DashboardPage() {
  return (
    <>
      {/* Section header */}
      <div className="flex justify-between items-end">
        <h1 className="text-[32px] font-bold tracking-[-0.03em] text-text-primary">
          Performance Overview
        </h1>
        <div className="flex items-center gap-3">
          {/* Pillar tabs */}
          <div className="flex gap-1 bg-bg-elevated border border-border rounded-md p-[3px]">
            <div className="px-3.5 py-1 rounded text-[12px] font-semibold tracking-wide bg-bg-card text-accent-lime cursor-pointer">
              Training
            </div>
            <div className="px-3.5 py-1 rounded text-[12px] font-semibold tracking-wide text-text-tertiary cursor-pointer">
              Recovery
            </div>
            <div className="px-3.5 py-1 rounded text-[12px] font-semibold tracking-wide text-text-tertiary cursor-pointer">
              Nutrition
            </div>
          </div>
          {/* Date */}
          <div className="font-mono text-accent-lime text-[12px]">
            OCT 24, 2023 // 14:00 UTC
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <KpiCards />

      {/* Hero Chart */}
      <TeamPerformanceChart />

      {/* Readiness Map + Attention Queue */}
      <TeamReadinessMap />

      {/* Team Insights */}
      <TeamInsights />

      {/* Program Distribution + Fueling Signals */}
      <div className="grid grid-cols-2 gap-5">
        <ProgramDistribution />
        <FuelingSignals />
      </div>

      {/* Athlete Snapshot + Live Feed */}
      <div className="grid gap-5" style={{ gridTemplateColumns: "2fr 1fr" }}>
        <AthleteSnapshotTable />
        <LivePerformanceFeed />
      </div>
    </>
  );
}
