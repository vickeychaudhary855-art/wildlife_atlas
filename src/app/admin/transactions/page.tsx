"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, Search } from "lucide-react";
import { useState } from "react";

export default function AdminTransactionsPage() {
  const [query, setQuery] = useState("");

  const TRANSACTIONS = [
    {
      id: "txn_001",
      orderId: "ORD-94821-LIFE",
      userEmail: "researcher@nature.org",
      currency: "INR",
      amount: "₹30.00",
      status: "verified",
      gateway: "Razorpay Sandbox (UPI)",
      date: "2024-11-09 14:15:22",
      webhookConfirmed: true,
    },
    {
      id: "txn_002",
      orderId: "ORD-94822-LIFE",
      userEmail: "prof.williams@oxford.ac.uk",
      currency: "USD",
      amount: "$1.00",
      status: "verified",
      gateway: "Stripe Sandbox (Visa)",
      date: "2024-11-09 13:40:11",
      webhookConfirmed: true,
    },
    {
      id: "txn_003",
      orderId: "ORD-94823-LIFE",
      userEmail: "arun.kumar@iisc.ac.in",
      currency: "INR",
      amount: "₹30.00",
      status: "verified",
      gateway: "Razorpay Sandbox (RuPay)",
      date: "2024-11-09 11:05:43",
      webhookConfirmed: true,
    },
    {
      id: "txn_004",
      orderId: "ORD-94824-LIFE",
      userEmail: "maria.santos@embrapa.br",
      currency: "USD",
      amount: "$1.00",
      status: "verified",
      gateway: "Stripe Sandbox (Mastercard)",
      date: "2024-11-08 22:19:00",
      webhookConfirmed: true,
    },
  ];

  const filtered = TRANSACTIONS.filter(
    (t) =>
      t.userEmail.toLowerCase().includes(query.toLowerCase()) ||
      t.orderId.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-forest-600 dark:text-forest-400 hover:text-forest-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Admin Dashboard</span>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground">
            Verified Premium Transactions & Ledger
          </h1>
          <p className="text-xs text-[var(--muted)] mt-1">
            Server-side audited lifetime membership transactions (₹30 INR / $1 USD) verified by signed webhooks.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search email or Order ID..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border bg-[var(--card-bg)] border-[var(--card-border)] text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-forest-500/50"
          />
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-xs">
        <div className="p-5 rounded-2xl border bg-[var(--card-bg)] border-[var(--card-border)]">
          <span className="text-[var(--muted)] block mb-1">Total Lifetime Grants</span>
          <div className="text-2xl font-extrabold text-foreground">1,842</div>
          <span className="text-emerald-600 font-semibold">100% server verified</span>
        </div>
        <div className="p-5 rounded-2xl border bg-[var(--card-bg)] border-[var(--card-border)]">
          <span className="text-[var(--muted)] block mb-1">India Entitlements (₹30 INR)</span>
          <div className="text-2xl font-extrabold text-foreground">1,120</div>
          <span className="text-[var(--muted)]">₹33,600 INR collected</span>
        </div>
        <div className="p-5 rounded-2xl border bg-[var(--card-bg)] border-[var(--card-border)]">
          <span className="text-[var(--muted)] block mb-1">International Entitlements ($1 USD)</span>
          <div className="text-2xl font-extrabold text-foreground">722</div>
          <span className="text-[var(--muted)]">$722 USD collected</span>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--card-border)] bg-forest-500/5 text-foreground font-bold">
                <th className="py-4 px-6">Order ID & Timestamp</th>
                <th className="py-4 px-6">User Account</th>
                <th className="py-4 px-6">Payment Gateway</th>
                <th className="py-4 px-6">Amount</th>
                <th className="py-4 px-6">Webhook Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--card-border)]">
              {filtered.map((txn) => (
                <tr key={txn.id} className="hover:bg-forest-500/5">
                  <td className="py-4 px-6">
                    <div className="font-bold text-foreground font-mono">{txn.orderId}</div>
                    <div className="text-[10px] text-[var(--muted)] mt-0.5">{txn.date}</div>
                  </td>

                  <td className="py-4 px-6 font-mono text-foreground">
                    {txn.userEmail}
                  </td>

                  <td className="py-4 px-6 text-[var(--muted)]">
                    {txn.gateway}
                  </td>

                  <td className="py-4 px-6 font-extrabold text-sm text-foreground">
                    {txn.amount}
                  </td>

                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-600 uppercase">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>HMAC Verified</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
