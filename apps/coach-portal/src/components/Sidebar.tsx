"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

const NAV_GROUPS = [
  {
    label: "Platform",
    items: [
      {
        href: "/",
        label: "Dashboard",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] stroke-2">
            <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
          </svg>
        ),
      },
      {
        href: "/athletes",
        label: "Athletes",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] stroke-2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        ),
      },
      {
        href: "/programs",
        label: "Training Plans",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] stroke-2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
          </svg>
        ),
      },
    ],
  },
  {
    label: "Management",
    items: [
      {
        href: "/invites",
        label: "Invites",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] stroke-2">
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
          </svg>
        ),
      },
      {
        href: "/activity",
        label: "Activity Feed",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] stroke-2">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
        ),
      },
    ],
  },
  {
    label: "System",
    items: [
      {
        href: "/integrations",
        label: "Integrations",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] stroke-2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        ),
      },
      {
        href: "/settings",
        label: "Settings",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] stroke-2">
            <circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
          </svg>
        ),
      },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const sidebarContent = (
    <>
      {/* Brand */}
      <div className="flex items-center gap-3 px-3 pb-6">
        <div className="relative w-7 h-7">
          <svg viewBox="0 0 28 28" width="28" height="28">
            <circle cx="14" cy="14" r="12" fill="none" stroke="#2A2F37" strokeWidth="1.5" />
            <path d="M14 2 A12 12 0 0 1 25.6 19" fill="none" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M14 2 A12 12 0 0 0 2.4 19" fill="none" stroke="rgba(212,175,55,0.25)" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="14" cy="14" r="3" fill="#D4AF37" />
            <line x1="14" y1="14" x2="22" y2="8" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <span className="font-bold tracking-tight text-base liquid-gold-text">Thresh</span>
      </div>

      {/* Nav Groups */}
      {NAV_GROUPS.map((group) => (
        <div key={group.label} className="flex flex-col gap-1 mb-6">
          <div className="text-[11px] uppercase text-text-tertiary px-3 py-2 font-semibold tracking-wider">
            {group.label}
          </div>
          {group.items.map(({ href, label, icon }) => {
            const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 font-medium transition-all duration-200",
                  isActive ? "nav-item-active" : "nav-item-inactive"
                )}
              >
                {icon}
                {label}
              </Link>
            );
          })}
        </div>
      ))}

      {/* Footer */}
      <div className="mt-auto border-t border-border pt-4">
        <div className="flex items-center gap-3 p-2 cursor-pointer rounded-full nav-item-inactive">
          <div className="w-8 h-8 rounded-full bg-bg-elevated border border-border grid place-items-center text-xs font-semibold text-text-secondary">
            JS
          </div>
          <div className="text-[13px] font-medium">
            <div>J. Smith</div>
            <div className="text-[11px] text-text-tertiary">Head Coach</div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 w-9 h-9 flex items-center justify-center rounded-lg glass-sidebar border border-border"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>

      {/* Mobile overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 z-30"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={cn(
          "md:hidden fixed top-0 left-0 h-full w-[240px] glass-sidebar flex flex-col p-4 px-3 z-40 transition-all duration-300",
          open ? "translate-x-0 opacity-100 visible" : "-translate-x-full opacity-0 invisible"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Desktop sidebar — always visible on md+ */}
      <aside className="hidden md:flex w-[240px] glass-sidebar flex-col p-4 px-3 shrink-0 z-20">
        {sidebarContent}
      </aside>
    </>
  );
}
