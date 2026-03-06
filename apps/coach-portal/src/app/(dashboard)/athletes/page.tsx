"use client";

import { useState } from "react";

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export default function AthletesPage() {
  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  function handleGenerateCode() {
    setInviteCode(generateCode());
    setCopied(false);
  }

  function handleCopy() {
    if (inviteCode) {
      navigator.clipboard.writeText(inviteCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Athletes</h1>
          <p className="text-slate-500">Manage your linked athletes</p>
        </div>
        <button
          onClick={handleGenerateCode}
          className="bg-brand-500 hover:bg-brand-600 text-white px-5 py-2.5 rounded-lg font-semibold transition-colors"
        >
          Invite Athlete
        </button>
      </div>

      {inviteCode && (
        <div className="bg-brand-50 border border-brand-200 rounded-xl p-6 mb-8">
          <p className="text-sm text-brand-700 mb-2">
            Share this invite code with your athlete:
          </p>
          <div className="flex items-center gap-3">
            <code className="text-3xl font-mono font-bold text-brand-600 tracking-wider">
              {inviteCode}
            </code>
            <button
              onClick={handleCopy}
              className="text-sm text-brand-500 hover:text-brand-700 font-medium"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <p className="text-xs text-brand-400 mt-2">
            Athletes can enter this code during onboarding to link with you
          </p>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-200">
          <div className="grid grid-cols-4 text-sm font-medium text-slate-500">
            <span>Name</span>
            <span>Status</span>
            <span>Modules</span>
            <span>Joined</span>
          </div>
        </div>

        <div className="py-16 text-center">
          <p className="text-slate-400 text-lg">No athletes yet</p>
          <p className="text-slate-300 text-sm mt-1">
            Generate an invite code to link your first athlete
          </p>
        </div>
      </div>
    </div>
  );
}
