"use client";

import { useState } from "react";
import Link from "next/link";
import { SAMPLE_SYNC_QUEUE } from "@/lib/sync/diffDetector";
import {
  ArrowLeft, CheckCircle2, AlertTriangle,
  Check, X, ShieldAlert
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SyncReviewPage() {
  const [queue, setQueue] = useState(SAMPLE_SYNC_QUEUE);
  const [filter, setFilter] = useState<"all" | "pending_review" | "approved" | "rejected">("pending_review");

  const handleAction = (id: string, action: "approve" | "reject") => {
    setQueue((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: action === "approve" ? "approved" : "rejected" } : item
      )
    );
  };

  const filtered = queue.filter((item) => {
    if (filter === "all") return true;
    return item.status === filter;
  });

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
            External Sync Curation & Diff Review
          </h1>
          <p className="text-xs text-[var(--muted)] mt-1">
            Review proposed taxonomic and conservation changes detected by scheduled synchronization cron jobs.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 text-xs font-semibold">
          <button
            onClick={() => setFilter("pending_review")}
            className={cn(
              "px-3 py-1.5 rounded-xl border transition-colors",
              filter === "pending_review"
                ? "bg-amber-500 text-black border-amber-500 font-bold"
                : "border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--muted)]"
            )}
          >
            Pending Review ({queue.filter((q) => q.status === "pending_review").length})
          </button>
          <button
            onClick={() => setFilter("approved")}
            className={cn(
              "px-3 py-1.5 rounded-xl border transition-colors",
              filter === "approved"
                ? "bg-emerald-600 text-white border-emerald-600 font-bold"
                : "border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--muted)]"
            )}
          >
            Approved ({queue.filter((q) => q.status === "approved").length})
          </button>
          <button
            onClick={() => setFilter("rejected")}
            className={cn(
              "px-3 py-1.5 rounded-xl border transition-colors",
              filter === "rejected"
                ? "bg-red-600 text-white border-red-600 font-bold"
                : "border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--muted)]"
            )}
          >
            Rejected ({queue.filter((q) => q.status === "rejected").length})
          </button>
        </div>
      </div>

      {/* Strict Policy Reminder */}
      <div className="mb-8 p-4 rounded-2xl bg-forest-500/10 border border-forest-500/20 text-xs text-[var(--muted)] flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-forest-600 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="text-foreground block">Curatorial Review Standard:</strong>
          <span>
            Publish only verified taxonomic revisions. Never accept raw occurrence observation counts as evidence of a total population change without calibrated survey methodologies.
          </span>
        </div>
      </div>

      {/* Diffs List */}
      <div className="space-y-6">
        {filtered.length === 0 ? (
          <div className="p-12 text-center rounded-3xl border border-dashed border-[var(--card-border)] bg-[var(--card-bg)]">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
            <h3 className="font-bold text-foreground text-base">No Diffs in this view</h3>
            <p className="text-xs text-[var(--muted)] mt-1">All synchronization items have been reviewed.</p>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className={cn(
                "p-6 sm:p-8 rounded-3xl border transition-all",
                "bg-[var(--card-bg)] border-[var(--card-border)]",
                item.detectedConflict ? "border-amber-500/50" : ""
              )}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-[var(--card-border)]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground text-lg">{item.scientificName}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-forest-500/10 text-forest-600 font-mono">
                      {item.field}
                    </span>
                    {item.detectedConflict && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-600 uppercase flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        <span>Policy Conflict</span>
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-[var(--muted)] mt-0.5 block">
                    Source: <strong className="text-foreground">{item.source}</strong> · Detected: {item.createdAt}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-bold uppercase",
                      item.status === "approved"
                        ? "bg-emerald-500/15 text-emerald-600"
                        : item.status === "rejected"
                        ? "bg-red-500/15 text-red-600"
                        : "bg-amber-500/15 text-amber-600"
                    )}
                  >
                    {item.status.replace("_", " ")}
                  </span>
                </div>
              </div>

              {/* Conflict Callout */}
              {item.conflictReason && (
                <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-800 dark:text-amber-300">
                  <strong>Conflict Note: </strong> {item.conflictReason}
                </div>
              )}

              {/* Side-by-side diff */}
              <div className="grid sm:grid-cols-2 gap-4 text-xs mb-6">
                <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/15">
                  <span className="text-[10px] uppercase font-bold text-red-600 block mb-1">
                    Current Database Value
                  </span>
                  <div className="text-foreground font-medium">{item.currentValue}</div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/15">
                  <span className="text-[10px] uppercase font-bold text-emerald-600 block mb-1">
                    Proposed Incoming Value
                  </span>
                  <div className="text-foreground font-medium">{item.proposedValue}</div>
                </div>
              </div>

              {/* Actions */}
              {item.status === "pending_review" && (
                <div className="flex items-center justify-end gap-3 pt-3 border-t border-[var(--card-border)]">
                  <button
                    onClick={() => handleAction(item.id, "reject")}
                    className="px-4 py-2 rounded-xl border border-red-500/30 hover:bg-red-500/10 text-red-600 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Reject Proposed Value</span>
                  </button>
                  <button
                    onClick={() => handleAction(item.id, "approve")}
                    className="px-4 py-2 rounded-xl bg-forest-600 hover:bg-forest-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    <Check className="w-4 h-4" />
                    <span>Approve & Apply to Database</span>
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
