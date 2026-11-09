"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import { TreePine, ArrowRight, ShieldCheck } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(name, email);
    router.push("/account");
  };

  return (
    <div className="py-16 px-4 max-w-md mx-auto">
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2 mb-3">
          <TreePine className="w-8 h-8 text-forest-600 dark:text-forest-400" />
          <span className="text-2xl font-bold text-foreground">Wildlife Atlas</span>
        </Link>
        <h1 className="text-2xl font-extrabold text-foreground">Create Researcher Account</h1>
        <p className="text-xs text-[var(--muted)] mt-1">
          Join the global community documenting and protecting animal species.
        </p>
      </div>

      <div className="p-8 rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] shadow-xl space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Dr. Jane Goodall"
              className="w-full px-4 py-2.5 rounded-xl border bg-[var(--background)] border-[var(--card-border)] text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-forest-500/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="researcher@university.edu"
              className="w-full px-4 py-2.5 rounded-xl border bg-[var(--background)] border-[var(--card-border)] text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-forest-500/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              className="w-full px-4 py-2.5 rounded-xl border bg-[var(--background)] border-[var(--card-border)] text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-forest-500/50"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-forest-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-forest-500 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{isLoading ? "Creating Account..." : "Create Account"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="p-3.5 rounded-2xl bg-forest-500/5 border border-forest-500/10 text-xs text-[var(--muted)] flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-forest-600 flex-shrink-0 mt-0.5" />
          <span>
            Accounts are secured by Row Level Security and encrypted database tokens.
          </span>
        </div>

        <p className="text-center text-xs text-[var(--muted)]">
          Already registered?{" "}
          <Link href="/login" className="font-semibold text-forest-600 dark:text-forest-400 hover:underline">
            Sign In here
          </Link>
        </p>
      </div>
    </div>
  );
}

