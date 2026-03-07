import { liveFeed } from "@/data/mock-dashboard";

type FeedIconStyle = "highlight" | "lime" | "green" | "red" | "orange" | "blue";

const iconBorderColors: Record<FeedIconStyle, string> = {
  highlight: "#D4AF37",
  lime: "rgba(212,175,55,0.3)",
  green: "rgba(0,255,133,0.3)",
  red: "rgba(255,77,77,0.3)",
  orange: "rgba(251,146,60,0.3)",
  blue: "rgba(77,163,255,0.3)",
};

const iconColors: Record<FeedIconStyle, string> = {
  highlight: "#D4AF37",
  lime: "#D4AF37",
  green: "#00FF85",
  red: "#FF4D4D",
  orange: "#FB923C",
  blue: "#4DA3FF",
};

function FeedIcon({ style: iconStyle }: { style: FeedIconStyle }) {
  const isHighlight = iconStyle === "highlight";
  return (
    <div
      className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
      style={{
        background: isHighlight ? "transparent" : "#1E232B",
        border: `1px solid ${iconBorderColors[iconStyle]}`,
        color: iconColors[iconStyle],
        boxShadow: isHighlight ? "0 0 10px rgba(212,175,55,0.1)" : undefined,
      }}
    >
      <FeedIconSvg style={iconStyle} />
    </div>
  );
}

function FeedIconSvg({ style: s }: { style: FeedIconStyle }) {
  if (s === "highlight") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14 }}>
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    );
  }
  if (s === "lime") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14 }}>
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    );
  }
  if (s === "green") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14 }}>
        <polyline points="20 6 9 17 4 12" />
      </svg>
    );
  }
  if (s === "red") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14 }}>
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    );
  }
  if (s === "orange") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14 }}>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14 }}>
      <path d="M18 20V10" />
      <path d="M12 20V4" />
      <path d="M6 20v-6" />
    </svg>
  );
}

export function LivePerformanceFeed() {
  return (
    <div className="glass-card rounded-2xl p-5 flex flex-col gap-4">
      <div className="text-[11px] uppercase text-text-tertiary font-semibold tracking-wider">
        Live Performance Feed
      </div>

      {/* Timeline list */}
      <div className="flex flex-col relative">
        {/* Vertical line */}
        <div
          className="absolute z-0"
          style={{
            top: 10,
            bottom: 10,
            left: 11,
            width: 1,
            background: "#2A2F37",
          }}
        />

        {liveFeed.map((item) => (
          <div key={item.id} className="flex gap-3 py-3 relative z-[1]">
            <FeedIcon style={item.iconStyle as FeedIconStyle} />
            <div className="flex flex-col gap-0.5">
              <div className="text-[13px] leading-snug text-text-secondary">
                <span
                  className="inline-block w-[5px] h-[5px] rounded-full mr-1 align-middle"
                  style={{ background: item.dotColor }}
                />
                <strong className="text-text-primary font-medium">{item.athlete}</strong>{" "}
                {item.text}
              </div>
              <div className="text-[11px] text-text-tertiary">{item.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
