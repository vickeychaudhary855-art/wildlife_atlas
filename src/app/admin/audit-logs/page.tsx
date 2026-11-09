import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";

export default function AdminAuditLogsPage() {
  const AUDIT_LOGS = [
    {
      id: "log_001",
      admin: "Dr. Evelyn Reed",
      action: "TAXONOMY_UPDATE_APPROVED",
      target: "Loxodonta africana",
      details: "Approved monotypic subspecies classification update from COL v2024.11.",
      ip: "192.0.2.45",
      timestamp: "2024-11-09 14:10:02 UTC",
    },
    {
      id: "log_002",
      admin: "Dr. Evelyn Reed",
      action: "POLICY_CONFLICT_REJECTED",
      target: "Ambystoma mexicanum",
      details: "Rejected unverified population increment proposal triggered by raw GBIF occurrences.",
      ip: "192.0.2.45",
      timestamp: "2024-11-09 12:45:19 UTC",
    },
    {
      id: "log_003",
      admin: "System Automated Sync",
      action: "SCHEDULED_CRON_SYNC_COMPLETED",
      target: "Catalogue of Life & GBIF",
      details: "Scanned 12 taxonomic families; 3 proposed diffs queued for curator review.",
      ip: "127.0.0.1 (Internal Cron)",
      timestamp: "2024-11-09 08:00:00 UTC",
    },
    {
      id: "log_004",
      admin: "Payment Webhook Subsystem",
      action: "ENTITLEMENT_LIFETIME_GRANTED",
      target: "usr_prem_002 (Prof. Rajesh Sharma)",
      details: "Granted permanent research access upon verified ₹30 INR transaction.",
      ip: "Razorpay Webhook Verified IP",
      timestamp: "2024-11-09 06:14:30 UTC",
    },
  ];

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-forest-600 dark:text-forest-400 hover:text-forest-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Admin Hub</span>
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-foreground">
          Administrative & System Audit Logs
        </h1>
        <p className="text-xs text-[var(--muted)] mt-1">
          Chronological, tamper-evident audit records documenting all taxonomic mutations, review approvals, and entitlement grants.
        </p>
      </div>

      <div className="rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--card-border)] bg-forest-500/5 text-foreground font-bold">
                <th className="py-4 px-6">Timestamp & Operator</th>
                <th className="py-4 px-6">Action Code</th>
                <th className="py-4 px-6">Target Entity</th>
                <th className="py-4 px-6">Audit Details</th>
                <th className="py-4 px-6">Network Origin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--card-border)]">
              {AUDIT_LOGS.map((log) => (
                <tr key={log.id} className="hover:bg-forest-500/5">
                  <td className="py-4 px-6">
                    <div className="font-bold text-foreground">{log.admin}</div>
                    <div className="text-[10px] text-[var(--muted)] flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" />
                      <span>{log.timestamp}</span>
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-forest-500/10 text-forest-700 dark:text-forest-300">
                      {log.action}
                    </span>
                  </td>

                  <td className="py-4 px-6 font-semibold text-foreground">
                    {log.target}
                  </td>

                  <td className="py-4 px-6 text-[var(--muted)] max-w-sm">
                    {log.details}
                  </td>

                  <td className="py-4 px-6 font-mono text-[11px] text-[var(--muted)]">
                    {log.ip}
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
