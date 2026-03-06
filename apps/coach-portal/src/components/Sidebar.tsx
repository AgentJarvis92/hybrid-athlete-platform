"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: "D" },
  { href: "/athletes", label: "Athletes", icon: "A" },
  { href: "/programs", label: "Programs", icon: "P" },
  { href: "/messages", label: "Messages", icon: "M" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-brand-950 text-white flex flex-col min-h-screen">
      <div className="p-6 border-b border-brand-900">
        <h1 className="text-xl font-bold">Hybrid Athlete</h1>
        <p className="text-sm text-brand-400 mt-0.5">Coach Portal</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {NAV_ITEMS.map(({ href, label, icon }) => {
          const isActive =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-brand-500 text-white"
                  : "text-brand-300 hover:bg-brand-900 hover:text-white"
              )}
            >
              <span className="w-6 h-6 rounded bg-brand-800 flex items-center justify-center text-xs font-bold">
                {icon}
              </span>
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-brand-900">
        <p className="text-xs text-brand-400">Phase 1 — Foundation</p>
      </div>
    </aside>
  );
}
