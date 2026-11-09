"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import {
  User, Crown, Shield, LogOut, CheckCircle2,
  Receipt, RotateCcw, Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AccountPage() {
  const router = useRouter();
  const { user, logout, restoreEntitlement, isLoading } = useAuth();
  const [restoredMsg, setRestoredMsg] = useState("");

  if (!user && !isLoading) {
    router.push("/login");
    return null;
  }

  const handleRestore = async () => {
    const success = await restoreEntitlement();
    if (success) {
      setRestoredMsg("Lifetime research entitlement verified and restored!");
      setTimeout(() => setRestoredMsg(""), 4000);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const MOCK_PAYMENTS = [
    {
      id: "pay_2024_081192",
      orderId: "ORD-94821-LIFE",
      date: "Nov 09, 2024",
      amount: user?.currencyPreference === "INR" ? "₹30 INR" : "$1.00 USD",
      gateway: "Sandbox Payment Gateway",
      status: "Verified & Settled",
    },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[var(--card-border)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
              Researcher Portal
            </span>
            {user?.role === "admin" && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-forest-600 text-white uppercase">
                Staff Administrator
              </span>
            )}
          </div>
          <h1 className="text-3xl font-extrabold text-foreground">{user?.name}</h1>
          <p className="text-xs text-[var(--muted)] mt-0.5 font-mono">{user?.email}</p>
        </div>

        <div className="flex items-center gap-3">
          {user?.role === "admin" && (
            <Link
              href="/admin"
              className="px-4 py-2 rounded-xl bg-forest-600 text-white text-xs font-bold hover:bg-forest-500 transition-colors flex items-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Dashboard</span>
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl border border-[var(--card-border)] hover:bg-red-500/10 hover:text-red-600 text-xs font-semibold text-foreground transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {restoredMsg && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{restoredMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Entitlement Status Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-6 rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--card-border)]">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                Membership Tier
              </span>
              {user?.isLifetimePremium ? (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-black text-[10px] font-extrabold uppercase">
                  Lifetime Pass
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-[10px] font-semibold">
                  Free Observer
                </span>
              )}
            </div>

            <div className="text-center py-4">
              <div
                className={cn(
                  "w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-3",
                  user?.isLifetimePremium
                    ? "bg-amber-500/15 text-amber-500"
                    : "bg-forest-500/10 text-forest-600"
                )}
              >
                {user?.isLifetimePremium ? (
                  <Crown className="w-8 h-8" />
                ) : (
                  <User className="w-8 h-8" />
                )}
              </div>
              <h3 className="font-bold text-foreground text-lg">
                {user?.isLifetimePremium ? "Premium Research Access" : "Standard Free Tier"}
              </h3>
              <p className="text-xs text-[var(--muted)] mt-1">
                {user?.isLifetimePremium
                  ? "All 15 scientific research chapters unlocked permanently."
                  : "Basic profiles only. Premium research chapters locked."}
              </p>
            </div>

            {user?.isLifetimePremium ? (
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-300 flex items-start gap-2">
                <Sparkles className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-500" />
                <span>
                  Permanent academic entitlement active. No subscription renewals.
                </span>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  href="/membership"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Crown className="w-3.5 h-3.5" />
                  <span>Upgrade to Lifetime (₹30 / $1)</span>
                </Link>
                <button
                  onClick={handleRestore}
                  className="w-full py-2.5 px-4 rounded-xl border border-[var(--card-border)] text-xs font-semibold text-foreground hover:bg-forest-500/10 flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restore Past Purchases</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Account Details & Payment History */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Details */}
          <div className="p-6 sm:p-8 rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] space-y-4">
            <h3 className="text-base font-bold text-foreground pb-3 border-b border-[var(--card-border)]">
              Account Attributes
            </h3>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[var(--muted)] block">Member Name</span>
                <span className="font-semibold text-foreground text-sm">{user?.name}</span>
              </div>
              <div>
                <span className="text-[var(--muted)] block">Account Email</span>
                <span className="font-semibold text-foreground text-sm font-mono">{user?.email}</span>
              </div>
              <div>
                <span className="text-[var(--muted)] block">System Role</span>
                <span className="font-semibold text-foreground text-sm capitalize">{user?.role}</span>
              </div>
              <div>
                <span className="text-[var(--muted)] block">Default Currency</span>
                <span className="font-semibold text-foreground text-sm">{user?.currencyPreference}</span>
              </div>
            </div>
          </div>

          {/* Payment History */}
          <div className="p-6 sm:p-8 rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--card-border)]">
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <Receipt className="w-4 h-4 text-forest-600 dark:text-forest-400" />
                <span>Verified Transaction Receipts</span>
              </h3>
              <span className="text-xs text-[var(--muted)]">Server-audited</span>
            </div>

            {user?.isLifetimePremium ? (
              <div className="space-y-3">
                {MOCK_PAYMENTS.map((payment) => (
                  <div
                    key={payment.id}
                    className="p-4 rounded-2xl border border-[var(--card-border)] bg-forest-500/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground font-mono">{payment.orderId}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-600 font-bold">
                          {payment.status}
                        </span>
                      </div>
                      <p className="text-[var(--muted)] mt-1">
                        {payment.date} · Provider: {payment.gateway}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-extrabold text-foreground">{payment.amount}</span>
                      <span className="block text-[10px] text-forest-600 dark:text-forest-400 font-medium">
                        Lifetime Research Pass
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-xs text-[var(--muted)]">
                No payment transactions recorded for this account.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

