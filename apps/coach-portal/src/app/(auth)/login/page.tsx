"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);
    if (authError) {
      setError(authError.message);
    } else {
      router.push("/");
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-1">Coach Portal</h1>
      <p className="text-brand-300 mb-8">Sign in to manage your athletes</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-900/30 text-red-300 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

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
            placeholder="Your password"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-brand-500 hover:bg-brand-600 disabled:bg-brand-700 text-white py-3 rounded-lg font-semibold transition-colors"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <p className="text-center text-brand-300 mt-6">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-brand-400 font-semibold hover:text-brand-300"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}
