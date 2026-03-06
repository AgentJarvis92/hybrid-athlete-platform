import type { Intervention } from "@/types/athlete";

const STATUS_COLORS = { green: "#22C55E", gray: "#5E6573", red: "#FF4D4D" };

interface Props {
  interventions: Intervention[];
}

export function RecentInterventionsPanel({ interventions }: Props) {
  return (
    <div className="bg-bg-card border border-border rounded-lg p-5">
      <div className="text-sm font-semibold text-text-primary mb-4">Recent Interventions</div>

      <div className="relative pl-4">
        {/* Vertical timeline line */}
        <div className="absolute left-[3px] top-1.5 bottom-1.5 w-px bg-border" />

        <div className="flex flex-col gap-0">
          {interventions.map((item, i) => (
            <div key={item.id} className={`relative mb-3.5 last:mb-0 pl-4`}>
              {/* Timeline dot */}
              <div
                className="absolute -left-[13px] top-[5px] w-[7px] h-[7px] rounded-full"
                style={{
                  background: item.active ? "#C6FF00" : "#2A2F37",
                  border: `1px solid ${item.active ? "#C6FF00" : "#3E4550"}`,
                  boxShadow: item.active ? "0 0 6px rgba(198,255,0,0.4)" : "none",
                }}
              />
              <div className="text-[12px] text-text-primary">{item.text}</div>
              <div className="text-[10px] text-text-tertiary mt-0.5">{item.date}</div>
              <div
                className="text-[10px] mt-0.5"
                style={{ color: STATUS_COLORS[item.statusColor] }}
              >
                {item.statusNote}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
