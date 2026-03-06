import { KpiCard } from "./KpiCard";
import { kpiCards } from "@/data/mock-dashboard";

export function KpiCards() {
  return (
    <div className="grid grid-cols-4 gap-5">
      {kpiCards.map((card, i) => (
        <KpiCard key={i} data={card} />
      ))}
    </div>
  );
}
