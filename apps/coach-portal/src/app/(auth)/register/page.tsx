"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name, role: "coach" } },
    });

    setLoading(false);
    if (authError) {
      setError(authError.message);
    } else {
      setSuccess(true);
    }
  }

  if (success) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Check your email</h1>
        <p className="text-brand-300 mb-6">
          We sent a confirmation link to <strong className="text-white">{email}</strong>.
        </p>
        <Link
          href="/login"
          className="text-brand-400 font-semibold hover:text-brand-300"
        >
          Back to Sign In
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-1">Create Account</h1>
      <p className="text-brand-300 mb-8">Start coaching on Hybrid Athlete</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-900/30 text-red-300 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm text-brand-200 mb-1.5">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-brand-900 text-white px-4 py-3 rounded-lg border border-brand-800 focus:border-brand-500 focus:outline-none"
            placeholder="Your name"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-brand-200 mb-1.5">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-brand-900 text-white px-4 py-3 rounded-lg border border-brand-800 focus:border-brand-500 focus:outline-none"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-brand-200 mb-1.5">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-brand-900 text-white px-4 py-3 rounded-lg border border-brand-800 focus:border-brand-500 focus:outline-none"
            placeholder="Min. 6 characters"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-brand-500 hover:bg-brand-600 disabled:bg-brand-700 text-white py-3 rounded-lg font-semibold transition-colors"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <p className="text-center text-brand-300 mt-6">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-brand-400 font-semibold hover:text-brand-300"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}
