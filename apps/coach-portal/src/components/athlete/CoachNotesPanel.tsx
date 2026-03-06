import type { CoachNote } from "@/types/athlete";

interface Props {
  notes: CoachNote;
}

export function CoachNotesPanel({ notes }: Props) {
  return (
    <div className="bg-bg-card border border-border rounded-lg p-5">
      <div className="text-sm font-semibold text-text-primary mb-4">Coach Notes</div>
      <div className="flex flex-col gap-3">
        {[
          { label: "Current Focus", value: notes.currentFocus, highlight: false },
          { label: "Goal", value: notes.goal, highlight: false },
          { label: "Next Review", value: notes.nextReview, highlight: true },
        ].map((item) => (
          <div key={item.label}>
            <div className="text-[10px] uppercase font-bold tracking-[0.06em] text-text-tertiary mb-1">{item.label}</div>
            <div
              className="text-[12px] leading-snug"
              style={{ color: item.highlight ? "#F5F7FA" : "#8A93A0" }}
            >
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
