"use client";

import Link from "next/link";

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <p className="text-sm text-slate-500 mb-1">{label}</p>
      <p className="text-3xl font-bold text-slate-900">{value}</p>
      <p className="text-sm text-slate-400 mt-1">{sub}</p>
    </div>
  );
}

function QuickAction({
  label,
  description,
  href,
}: {
  label: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="block bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:border-brand-500 transition-colors"
    >
      <p className="font-semibold text-slate-900">{label}</p>
      <p className="text-sm text-slate-500 mt-1">{description}</p>
    </Link>
  );
}

export default function DashboardPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500">Welcome to your coaching portal</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard label="Athletes" value="0" sub="No athletes linked yet" />
        <StatCard label="Active Programs" value="0" sub="Coming in Phase 2" />
        <StatCard
          label="Messages"
          value="--"
          sub="Coming in Phase 4"
        />
      </div>

      <h2 className="text-lg font-semibold text-slate-900 mb-4">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <QuickAction
          label="Invite Athlete"
          description="Generate an invite code to link an athlete"
          href="/athletes"
        />
        <QuickAction
          label="Create Program"
          description="Build a weekly training program"
          href="/programs"
        />
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <h3 className="font-semibold text-slate-900 mb-2">Recent Activity</h3>
        <div className="py-8 text-center">
          <p className="text-slate-400">No recent activity</p>
          <p className="text-sm text-slate-300 mt-1">
            Activity from your athletes will appear here
          </p>
        </div>
      </div>
    </div>
  );
}
