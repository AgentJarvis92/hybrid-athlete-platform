import { Sidebar } from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="topo-bg" />
      <div className="flex w-full h-screen z-[1] relative">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {/* Top Nav */}
          <header className="h-16 border-b border-border flex items-center justify-between px-8 bg-[rgba(11,13,16,0.8)] backdrop-blur-sm z-10">
            <div className="text-base font-semibold flex items-center gap-3">
              <span className="text-text-tertiary">Team</span>
              <span className="text-border">/</span>
              <span>Dashboard</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search athletes or metrics..."
                  className="bg-bg-card border border-border text-text-primary py-1.5 pl-9 pr-14 rounded-md w-60 text-[13px] transition-all focus:border-text-secondary focus:outline-none focus:w-80"
                />
                <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <span className="absolute right-2 top-1.5 bg-bg-elevated border border-border rounded px-1.5 py-0.5 text-[10px] text-text-secondary font-mono">
                  ⌘K
                </span>
              </div>
              <div className="w-5 h-5 text-text-secondary cursor-pointer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </div>
            </div>
          </header>
          {/* Workspace */}
          <div className="flex-1 overflow-y-auto p-8 px-10 flex flex-col gap-7">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
