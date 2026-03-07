"use client";

import { useState, useRef, useEffect } from "react";

const NAV_ITEMS = [
  {
    id: "home",
    label: "Home",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: "search",
    label: "Search",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    id: "user",
    label: "User",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

export function FloatingNav() {
  const [active, setActive] = useState(0);
  const [dark, setDark] = useState(true);
  const [themeAnimating, setThemeAnimating] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const btn = buttonRefs.current[active];
    const container = containerRef.current;
    if (!btn || !container) return;

    const containerRect = container.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    setIndicatorStyle({
      left: btnRect.left - containerRect.left,
      width: btnRect.width,
    });
  }, [active]);

  const handleThemeToggle = () => {
    if (themeAnimating) return;
    setThemeAnimating(true);
    setDark((d) => !d);
    setTimeout(() => setThemeAnimating(false), 500);
  };

  return (
    <div className="floating-nav-wrapper">
      {/* Ambient radial glow behind toolbar */}
      <div className="floating-nav-glow" />

      {/* Film grain overlay */}
      <div className="floating-nav-grain" />

      {/* Toolbar */}
      <div className="floating-nav-bar" ref={containerRef}>

        {/* Sliding gold ring indicator */}
        <div
          className="gold-ring-indicator"
          style={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
            transition: "left 0.45s cubic-bezier(0.34,1.2,0.64,1), width 0.45s cubic-bezier(0.34,1.2,0.64,1)",
          }}
        >
          {/* Layer 1: Glow behind ring */}
          <div className="gold-ring-glow" />
          {/* Layer 2: Clip container */}
          <div className="gold-ring-clip">
            {/* Layer 3: Spinning conic gradient */}
            <div className="gold-ring-spinner" />
          </div>
          {/* Layer 4: Inner plate */}
          <div className="gold-ring-plate" />
        </div>

        {/* Nav buttons */}
        {NAV_ITEMS.map((item, i) => (
          <button
            key={item.id}
            ref={(el) => { buttonRefs.current[i] = el; }}
            className={`floating-nav-btn ${active === i ? "floating-nav-btn-active" : ""}`}
            onClick={() => setActive(i)}
            aria-label={item.label}
          >
            {item.icon}
          </button>
        ))}

        {/* Divider */}
        <div className="floating-nav-divider" />

        {/* Theme toggle */}
        <button
          className={`floating-nav-btn floating-nav-toggle ${themeAnimating ? "floating-nav-toggle-bounce" : ""}`}
          onClick={handleThemeToggle}
          aria-label="Toggle theme"
        >
          <span
            className="toggle-icon"
            style={{
              opacity: dark ? 1 : 0,
              transform: dark ? "rotate(0deg) scale(1)" : "rotate(90deg) scale(0.5)",
              position: "absolute",
              transition: "all 0.3s ease",
            }}
          >
            {/* Sun */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          </span>
          <span
            className="toggle-icon"
            style={{
              opacity: dark ? 0 : 1,
              transform: dark ? "rotate(-90deg) scale(0.5)" : "rotate(0deg) scale(1)",
              position: "absolute",
              transition: "all 0.3s ease",
            }}
          >
            {/* Moon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}
