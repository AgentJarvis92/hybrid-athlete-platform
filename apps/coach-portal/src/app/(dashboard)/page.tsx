import { AthleteStateStrip } from "@/components/dashboard/AthleteStateStrip";
import { LiveClock } from "@/components/LiveClock";
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
        <h1 className="text-[32px] font-bold tracking-[-0.03em] text-text-primary liquid-gold-text">
          Performance Overview
        </h1>
        <div className="flex items-center gap-3">
          {/* Pillar tabs */}
          <div className="pill-switcher">
            <div className="pill-tab-active">Training</div>
            <div className="pill-tab-inactive">Recovery</div>
            <div className="pill-tab-inactive">Nutrition</div>
          </div>
          {/* Live Clock */}
          <LiveClock />
        </div>
      </div>

      {/* Team State Strip */}
      <AthleteStateStrip />

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
