"use client";

import { useState } from "react";
import Link from "next/link";
import { TreePine, ArrowRight, CheckCircle2, ArrowLeft } from "lucide-react";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSent(true);
    }
  };

  return (
    <div className="py-16 px-4 max-w-md mx-auto">
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2 mb-3">
          <TreePine className="w-8 h-8 text-forest-600 dark:text-forest-400" />
          <span className="text-2xl font-bold text-foreground">Wildlife Atlas</span>
        </Link>
        <h1 className="text-2xl font-extrabold text-foreground">Reset Your Password</h1>
        <p className="text-xs text-[var(--muted)] mt-1">
          Enter your registered email and we will send you a secure recovery link.
        </p>
      </div>

      <div className="p-8 rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] shadow-xl">
        {sent ? (
          <div className="text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-foreground">Recovery Link Dispatched</h2>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              If an account exists for <strong className="text-foreground">{email}</strong>, you will receive password reset instructions shortly.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-xs font-semibold text-forest-600 dark:text-forest-400 hover:underline pt-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Login</span>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-1.5">
                Registered Email
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

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-forest-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-forest-500 transition-colors flex items-center justify-center gap-2"
            >
              <span>Send Recovery Link</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center pt-2">
              <Link href="/login" className="text-xs text-[var(--muted)] hover:text-foreground">
                Cancel and return to Sign In
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

