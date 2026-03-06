import { notFound } from "next/navigation";
import { sarahLeeDetail, mockAthleteRoster } from "@/data/mock-athlete-detail";
import { AthleteHero } from "@/components/athlete/AthleteHero";
import { AthleteStateKPIRow } from "@/components/athlete/AthleteStateKPIRow";
import { CoachSignals } from "@/components/athlete/CoachSignals";
import { PerformanceTrendsChart } from "@/components/athlete/PerformanceTrendsChart";
import { BodyLoadMap } from "@/components/athlete/BodyLoadMap";
import { PillarDetailCards } from "@/components/athlete/PillarDetailCards";
import { RecentSessionsTable } from "@/components/athlete/RecentSessionsTable";
import { CoachNotesPanel } from "@/components/athlete/CoachNotesPanel";
import { FlagsPanelCard } from "@/components/athlete/FlagsPanelCard";
import { RecentInterventionsPanel } from "@/components/athlete/RecentInterventionsPanel";

// Pre-generate known athlete pages at build time
export async function generateStaticParams() {
  return mockAthleteRoster.map((a) => ({ id: a.id }));
}

// Mock data lookup — swap for Supabase fetch later
function getAthleteData(id: string) {
  if (id === "sl") return sarahLeeDetail;
  return null;
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AthletePage({ params }: Props) {
  const { id } = await params;
  const data = getAthleteData(id);

  if (!data) notFound();

  return (
    <div className="flex flex-col gap-7 p-8 px-10" style={{ minWidth: "900px" }}>
      <AthleteHero athlete={data.athlete} />
      <AthleteStateKPIRow summary={data.stateSummary} />
      <CoachSignals signals={data.coachSignals} />
      <PerformanceTrendsChart />

      {/* Body map + Pillar cards side by side */}
      <div className="grid gap-5" style={{ gridTemplateColumns: "1fr 1.5fr" }}>
        <BodyLoadMap callouts={data.bodyLoadCallouts} />
        <PillarDetailCards
          training={data.training}
          recovery={data.recovery}
          nutrition={data.nutrition}
        />
      </div>

      <RecentSessionsTable sessions={data.recentSessions} />

      {/* Bottom row */}
      <div className="grid grid-cols-3 gap-5">
        <CoachNotesPanel notes={data.coachNotes} />
        <FlagsPanelCard flags={data.flags} />
        <RecentInterventionsPanel interventions={data.interventions} />
      </div>

      <div className="h-10" />
    </div>
  );
}
