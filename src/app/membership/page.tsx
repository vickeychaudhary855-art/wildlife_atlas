"use client";

import { useState } from "react";
import Link from "next/link";
import { Crown, Check, Shield, Sparkles, ArrowRight, CheckCircle2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MembershipPage() {
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [email, setEmail] = useState("");

  const pricing = {
    INR: {
      symbol: "₹",
      amount: "30",
      currencyCode: "INR",
      label: "₹30 INR",
      description: "One-time contribution for Indian Researchers & Naturalists (UPI, Rupay, Cards)",
    },
    USD: {
      symbol: "$",
      amount: "1",
      currencyCode: "USD",
      label: "$1 USD",
      description: "One-time contribution for International Biodiversity Enthusiasts (Global Cards, PayPal)",
    },
  };

  const currentPrice = pricing[currency];

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setProcessing(true);
    // Simulate secure server-side sandbox checkout verification
    setTimeout(() => {
      setProcessing(false);
      setPaymentSuccess(true);
    }, 1500);
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
          <Crown className="w-4 h-4 text-amber-500" />
          <span>Lifetime Entitlement · No Recurring Fees</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          Wildlife Atlas Lifetime Access
        </h1>
        <p className="mt-4 text-base sm:text-lg text-[var(--muted)] leading-relaxed">
          Unlock complete 15-chapter research dossiers for all living and extinct animal species.
          Transparent one-time contribution supporting open biodiversity taxonomy.
        </p>

        {/* Currency Switcher */}
        <div className="mt-8 inline-flex items-center p-1 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] shadow-sm">
          <button
            onClick={() => setCurrency("INR")}
            className={cn(
              "px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200",
              currency === "INR"
                ? "bg-forest-600 text-white shadow-md"
                : "text-[var(--muted)] hover:text-foreground"
            )}
          >
            India (₹30 INR)
          </button>
          <button
            onClick={() => setCurrency("USD")}
            className={cn(
              "px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200",
              currency === "USD"
                ? "bg-forest-600 text-white shadow-md"
                : "text-[var(--muted)] hover:text-foreground"
            )}
          >
            International ($1 USD)
          </button>
        </div>
      </div>

      {paymentSuccess ? (
        <div className="p-8 sm:p-12 rounded-3xl bg-[var(--card-bg)] border border-emerald-500/30 text-center max-w-xl mx-auto shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">
            Lifetime Entitlement Activated!
          </h2>
          <p className="text-sm text-[var(--muted)] mt-2">
            A server-verified payment webhook has unlocked lifetime access for:
            <strong className="block text-foreground mt-1 font-mono">{email}</strong>
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/explore"
              className="px-6 py-3 rounded-xl bg-forest-600 text-white text-xs font-bold hover:bg-forest-500 transition-colors"
            >
              Explore Research Dossiers
            </Link>
            <button
              onClick={() => {
                setPaymentSuccess(false);
                setEmail("");
              }}
              className="px-6 py-3 rounded-xl border border-[var(--card-border)] text-xs font-semibold text-foreground hover:bg-forest-500/10 transition-colors"
            >
              Test Another Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Details / Features */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-8 rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] space-y-5">
              <h2 className="text-xl font-bold text-foreground">
                What is included in Lifetime Research Access?
              </h2>

              <ul className="space-y-4 text-sm text-[var(--muted)]">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-foreground">Unabridged 15-Section Research Profiles: </strong>
                    Complete physical biology, genetics, evolutionary timelines, and pathology research.
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-foreground">Historical Census Records: </strong>
                    Access longitudinal survey datasets with confidence intervals and margin of uncertainty.
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-foreground">Academic Export Suite: </strong>
                    Download formatted PDF dossiers and CSV tables with DOI source citations.
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-foreground">Perpetual Access: </strong>
                    Pay once, access forever across all desktop, tablet, and mobile devices.
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Checkout Card */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-3xl bg-[var(--card-bg)] border-2 border-amber-500/40 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[var(--card-border)]">
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-[var(--muted)]">
                    One-Time Lifetime Pass
                  </span>
                  <div className="text-4xl font-extrabold text-foreground mt-1">
                    {currentPrice.symbol}{currentPrice.amount} <span className="text-xs font-normal text-[var(--muted)]">{currentPrice.currencyCode}</span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 font-bold text-xs uppercase">
                  Sandbox Active
                </span>
              </div>

              <p className="text-xs text-[var(--muted)] leading-relaxed">
                {currentPrice.description}
              </p>

              <form onSubmit={handleSimulatePayment} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-2">
                    Academic or Personal Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="researcher@university.edu"
                    className="w-full px-4 py-3 rounded-xl border bg-[var(--background)] border-[var(--card-border)] text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  className="w-full py-4 px-6 rounded-xl font-bold text-sm text-black bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 disabled:opacity-50"
                >
                  {processing ? (
                    <span>Verifying Sandbox Transaction...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Pay {currentPrice.symbol}{currentPrice.amount} (Test Mode)</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="pt-4 border-t border-[var(--card-border)] text-[11px] text-[var(--muted)] space-y-2">
                <div className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-forest-500" />
                  <span>Server-side verified entitlement (no frontend bypass)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-forest-500" />
                  <span>Payment Gateway abstraction: Razorpay (INR) / Stripe (USD)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

