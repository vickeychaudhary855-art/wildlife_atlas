"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import { TreePine, ArrowRight, ShieldCheck, User } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email);
    router.push("/account");
  };

  const handleQuickLogin = async (role: "free" | "premium" | "admin") => {
    const emails = {
      free: "user@example.com",
      premium: "researcher@nature.org",
      admin: "admin@wildlife-atlas.org",
    };
    await login(emails[role], role);
    if (role === "admin") {
      router.push("/admin");
    } else {
      router.push("/account");
    }
  };

  return (
    <div className="py-16 px-4 max-w-md mx-auto">
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2 mb-3">
          <TreePine className="w-8 h-8 text-forest-600 dark:text-forest-400" />
          <span className="text-2xl font-bold text-foreground">Wildlife Atlas</span>
        </Link>
        <h1 className="text-2xl font-extrabold text-foreground">Sign In to Your Account</h1>
        <p className="text-xs text-[var(--muted)] mt-1">
          Access research dossiers, saved taxonomic filters, and lifetime entitlements.
        </p>
      </div>

      <div className="p-8 rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] shadow-xl space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="biologist@domain.org"
              className="w-full px-4 py-2.5 rounded-xl border bg-[var(--background)] border-[var(--card-border)] text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-forest-500/50"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                Password
              </label>
              <Link
                href="/reset-password"
                className="text-xs text-forest-600 dark:text-forest-400 hover:underline"
              >
                Forgot?
              </Link>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-4 py-2.5 rounded-xl border bg-[var(--background)] border-[var(--card-border)] text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-forest-500/50"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-forest-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-forest-500 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{isLoading ? "Signing In..." : "Sign In"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-[var(--card-border)]" />
          <span className="flex-shrink mx-4 text-[10px] uppercase font-bold text-[var(--muted)]">
            Instant Demo Access
          </span>
          <div className="flex-grow border-t border-[var(--card-border)]" />
        </div>

        {/* Quick Demo Switcher */}
        <div className="grid grid-cols-3 gap-2 text-[11px]">
          <button
            onClick={() => handleQuickLogin("free")}
            className="p-2 rounded-xl border border-[var(--card-border)] hover:bg-forest-500/10 text-center font-medium transition-colors"
          >
            <User className="w-4 h-4 mx-auto mb-1 text-slate-500" />
            <span>Free User</span>
          </button>
          <button
            onClick={() => handleQuickLogin("premium")}
            className="p-2 rounded-xl border border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/15 text-center font-medium transition-colors"
          >
            <ShieldCheck className="w-4 h-4 mx-auto mb-1 text-amber-500" />
            <span>Premium</span>
          </button>
          <button
            onClick={() => handleQuickLogin("admin")}
            className="p-2 rounded-xl border border-forest-500/30 bg-forest-500/10 hover:bg-forest-500/20 text-center font-medium transition-colors"
          >
            <TreePine className="w-4 h-4 mx-auto mb-1 text-forest-600" />
            <span>Admin</span>
          </button>
        </div>

        <p className="text-center text-xs text-[var(--muted)] pt-2">
          Don&apos;t have an account yet?{" "}
          <Link href="/register" className="font-semibold text-forest-600 dark:text-forest-400 hover:underline">
            Register for free
          </Link>
        </p>
      </div>
    </div>
  );
}

