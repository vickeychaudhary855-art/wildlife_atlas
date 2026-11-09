"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth/AuthContext";
import {
  Shield, Database, RefreshCw, Receipt,
  PlusCircle, CheckCircle2, History,
  TrendingUp, Users, ArrowRight
} from "lucide-react";
import { SAMPLE_SYNC_QUEUE } from "@/lib/sync/diffDetector";

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const pendingSyncCount = SAMPLE_SYNC_QUEUE.filter((d) => d.status === "pending_review").length;

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[var(--card-border)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-forest-600 text-white uppercase flex items-center gap-1">
              <Shield className="w-3 h-3" />
              <span>Admin Authorization Active</span>
            </span>
            <span className="text-xs text-[var(--muted)]">Curator: {user?.name || "Dr. Evelyn Reed"}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-foreground">
            Taxonomic Governance & Administration
          </h1>
          <p className="text-xs text-[var(--muted)] mt-1">
            Manage global species taxonomy, review automated data synchronizations, and inspect financial transactions.
          </p>
        </div>

        <Link
          href="/admin/animals/new"
          className="px-4 py-2.5 rounded-xl bg-forest-600 text-white text-xs font-bold hover:bg-forest-500 transition-colors flex items-center gap-2 shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Species</span>
        </Link>
      </div>

      {/* Sync Alert Banner if changes are pending */}
      {pendingSyncCount > 0 && (
        <div className="mb-8 p-6 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <RefreshCw className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5 animate-spin-slow" />
            <div>
              <h3 className="font-bold text-foreground text-sm">
                {pendingSyncCount} Automated Biodiversity Updates Awaiting Review
              </h3>
              <p className="text-xs text-[var(--muted)] mt-0.5">
                New taxonomic revisions and IUCN criteria updates were harvested from Catalogue of Life & GBIF.
              </p>
            </div>
          </div>
          <Link
            href="/admin/sync-review"
            className="px-4 py-2 rounded-xl bg-amber-500 text-black text-xs font-bold hover:bg-amber-400 transition-colors flex items-center gap-1.5 flex-shrink-0"
          >
            <span>Review Update Queue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Analytics Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="p-5 rounded-2xl border bg-[var(--card-bg)] border-[var(--card-border)]">
          <span className="text-xs text-[var(--muted)] flex items-center gap-1.5 mb-2">
            <Database className="w-4 h-4 text-forest-600" />
            <span>Documented Species</span>
          </span>
          <div className="text-2xl font-extrabold text-foreground">14,280</div>
          <span className="text-[10px] text-emerald-600 font-medium">100% taxonomic identifiers</span>
        </div>

        <div className="p-5 rounded-2xl border bg-[var(--card-bg)] border-[var(--card-border)]">
          <span className="text-xs text-[var(--muted)] flex items-center gap-1.5 mb-2">
            <RefreshCw className="w-4 h-4 text-amber-500" />
            <span>Pending Sync Queue</span>
          </span>
          <div className="text-2xl font-extrabold text-foreground">{pendingSyncCount}</div>
          <span className="text-[10px] text-amber-600 font-medium">Curator approval required</span>
        </div>

        <div className="p-5 rounded-2xl border bg-[var(--card-bg)] border-[var(--card-border)]">
          <span className="text-xs text-[var(--muted)] flex items-center gap-1.5 mb-2">
            <Receipt className="w-4 h-4 text-purple-500" />
            <span>Lifetime Passes (INR/USD)</span>
          </span>
          <div className="text-2xl font-extrabold text-foreground">1,842</div>
          <span className="text-[10px] text-emerald-600 font-medium">₹30 & $1 test conversions</span>
        </div>

        <div className="p-5 rounded-2xl border bg-[var(--card-bg)] border-[var(--card-border)]">
          <span className="text-xs text-[var(--muted)] flex items-center gap-1.5 mb-2">
            <TrendingUp className="w-4 h-4 text-blue-500" />
            <span>System Health & RLS</span>
          </span>
          <div className="text-2xl font-extrabold text-emerald-600 flex items-center gap-1">
            <CheckCircle2 className="w-6 h-6" />
            <span className="text-lg">Secure</span>
          </div>
          <span className="text-[10px] text-[var(--muted)]">Row Level Security enabled</span>
        </div>
      </div>

      {/* Admin Modules Navigation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/animals"
          className="group p-6 rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] hover:border-forest-500/40 hover:shadow-lg transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-forest-500/10 text-forest-600 flex items-center justify-center mb-4">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-foreground group-hover:text-forest-600 transition-colors">
              Species & Media Editor
            </h3>
            <p className="text-xs text-[var(--muted)] mt-2 leading-relaxed">
              Edit free information, upload photographs, configure Creative Commons licences, and archive or publish species records.
            </p>
          </div>
          <span className="mt-6 pt-4 border-t border-[var(--card-border)] text-xs font-semibold text-forest-600 flex items-center gap-1">
            Manage Species Catalog →
          </span>
        </Link>

        <Link
          href="/admin/sync-review"
          className="group p-6 rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] hover:border-forest-500/40 hover:shadow-lg transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-4">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-foreground group-hover:text-amber-600 transition-colors">
              External Sync Curation
            </h3>
            <p className="text-xs text-[var(--muted)] mt-2 leading-relaxed">
              Review diffs from Catalogue of Life and GBIF. Approve or reject taxonomy modifications before publishing to live users.
            </p>
          </div>
          <span className="mt-6 pt-4 border-t border-[var(--card-border)] text-xs font-semibold text-amber-600 flex items-center gap-1">
            Inspect {pendingSyncCount} Diffs →
          </span>
        </Link>

        <Link
          href="/admin/transactions"
          className="group p-6 rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] hover:border-forest-500/40 hover:shadow-lg transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center mb-4">
              <Receipt className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-foreground group-hover:text-purple-600 transition-colors">
              Verified Transactions
            </h3>
            <p className="text-xs text-[var(--muted)] mt-2 leading-relaxed">
              Audit server-verified lifetime payments (₹30 INR / $1 USD), monitor payment webhooks, and review entitlement grants.
            </p>
          </div>
          <span className="mt-6 pt-4 border-t border-[var(--card-border)] text-xs font-semibold text-purple-600 flex items-center gap-1">
            View Ledger & Receipts →
          </span>
        </Link>

        <Link
          href="/admin/audit-logs"
          className="group p-6 rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] hover:border-forest-500/40 hover:shadow-lg transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center mb-4">
              <History className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-foreground group-hover:text-blue-600 transition-colors">
              Staff Audit Logs
            </h3>
            <p className="text-xs text-[var(--muted)] mt-2 leading-relaxed">
              Trace chronological mutations, field edits, and curator sign-offs for accountability and scientific peer verification.
            </p>
          </div>
          <span className="mt-6 pt-4 border-t border-[var(--card-border)] text-xs font-semibold text-blue-600 flex items-center gap-1">
            Read Audit Trail →
          </span>
        </Link>

        <Link
          href="/account"
          className="group p-6 rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] hover:border-forest-500/40 hover:shadow-lg transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-slate-500/10 text-slate-600 flex items-center justify-center mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-foreground group-hover:text-slate-600 transition-colors">
              User Roles & Permissions
            </h3>
            <p className="text-xs text-[var(--muted)] mt-2 leading-relaxed">
              Manage free, lifetime premium, and admin staff accounts with granular role-based access control.
            </p>
          </div>
          <span className="mt-6 pt-4 border-t border-[var(--card-border)] text-xs font-semibold text-slate-600 flex items-center gap-1">
            User Directory →
          </span>
        </Link>

        <Link
          href="/explore"
          className="group p-6 rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] hover:border-forest-500/40 hover:shadow-lg transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-foreground group-hover:text-emerald-600 transition-colors">
              Public Encyclopedia View
            </h3>
            <p className="text-xs text-[var(--muted)] mt-2 leading-relaxed">
              Preview the published species catalogue, public search filters, and live research dossiers as seen by external visitors.
            </p>
          </div>
          <span className="mt-6 pt-4 border-t border-[var(--card-border)] text-xs font-semibold text-emerald-600 flex items-center gap-1">
            Open Public Catalogue →
          </span>
        </Link>
      </div>
    </div>
  );
}

