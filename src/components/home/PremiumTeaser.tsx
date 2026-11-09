"use client";

import { useState } from "react";
import Link from "next/link";
import { Crown, Check, Sparkles, Shield, ArrowRight, Dna, FileSpreadsheet, FileText, Globe2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function PremiumTeaser() {
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");

  const pricing = {
    INR: { symbol: "₹", amount: "30", label: "₹30 INR", subtitle: "One-time contribution for Indian Researchers & Wildlife Enthusiasts" },
    USD: { symbol: "$", amount: "1", label: "$1 USD", subtitle: "One-time contribution for International Biodiversity Enthusiasts" },
  };

  const currentPrice = pricing[currency];

  const features = [
    { title: "Complete 15-Section Research Profiles", desc: "Scientific taxonomy, physical biology, genetics, evolutionary timelines, and veterinary diseases.", icon: <Dna className="w-5 h-5 text-amber-500" /> },
    { title: "Historical Population Datasets", desc: "Census records, confidence uncertainty bounds, and regional subpopulation trends.", icon: <Globe2 className="w-5 h-5 text-emerald-500" /> },
    { title: "Research Paper Citations & DOIs", desc: "Direct access to peer-reviewed source literature and bibliographic citations.", icon: <FileText className="w-5 h-5 text-blue-500" /> },
    { title: "PDF & CSV Data Exports", desc: "Export comprehensive species research dossiers and tabular biodiversity records for offline academic use.", icon: <FileSpreadsheet className="w-5 h-5 text-purple-500" /> },
  ];

  return (
    <section className="px-4 py-20 sm:py-24 relative overflow-hidden bg-gradient-to-b from-forest-950 via-forest-900 to-forest-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(61,141,100,0.15),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(245,158,11,0.1),transparent_40%)]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Crown className="w-4 h-4 text-amber-400" />
            <span>Lifetime Academic Access · No Subscriptions</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Unlock Advanced Wildlife Research
          </h2>
          <p className="mt-4 text-forest-200/80 text-base sm:text-lg leading-relaxed">
            Support biodiversity science and unlock unabridged physical biology, genetic mappings, historical population baselines, and academic export tools.
          </p>

          {/* Currency Toggle */}
          <div className="mt-8 inline-flex items-center p-1 rounded-full bg-black/40 border border-white/10 backdrop-blur-sm">
            <button
              onClick={() => setCurrency("INR")}
              className={cn(
                "px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200",
                currency === "INR"
                  ? "bg-forest-600 text-white shadow-md shadow-forest-900/50"
                  : "text-forest-200/70 hover:text-white"
              )}
            >
              India (₹30 INR)
            </button>
            <button
              onClick={() => setCurrency("USD")}
              className={cn(
                "px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200",
                currency === "USD"
                  ? "bg-forest-600 text-white shadow-md shadow-forest-900/50"
                  : "text-forest-200/70 hover:text-white"
              )}
            >
              International ($1 USD)
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Features Column */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm hover:border-amber-500/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-white/[0.08] flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-white text-base mb-2">{feature.title}</h3>
                <p className="text-xs text-forest-200/70 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Pricing Card Column */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl p-8 sm:p-10 bg-gradient-to-b from-forest-800/80 to-forest-950/90 border-2 border-amber-500/40 shadow-2xl shadow-black/60 backdrop-blur-xl">
              <div className="absolute -top-4 right-8 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-black text-xs font-bold uppercase tracking-wider shadow-lg">
                One-Time Payment
              </div>

              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight">
                  {currentPrice.symbol}{currentPrice.amount}
                </span>
                <span className="text-sm font-semibold uppercase tracking-wider text-forest-200/70">
                  Lifetime Pass
                </span>
              </div>
              <p className="text-xs text-amber-200/80 mb-6">{currentPrice.subtitle}</p>

              <div className="space-y-3 py-6 border-y border-white/10 text-sm">
                <div className="flex items-center gap-3 text-forest-100">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Permanent access across all devices</span>
                </div>
                <div className="flex items-center gap-3 text-forest-100">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Unlocks all 15 scientific research chapters</span>
                </div>
                <div className="flex items-center gap-3 text-forest-100">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Continuous updates & future species included</span>
                </div>
                <div className="flex items-center gap-3 text-forest-100">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Verified server-side entitlement record</span>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/membership"
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold text-sm text-black bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-500 transition-all duration-300 shadow-lg shadow-amber-500/20 group"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Get Lifetime Research Access</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <p className="text-center text-[11px] text-forest-300/50 mt-3 flex items-center justify-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-forest-400" />
                  <span>Secure server-verified checkout · Sandbox ready</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

