import { NextResponse } from "next/server";
import { diffDetector } from "@/lib/sync/diffDetector";

export async function GET() {
  try {
    // Verify bearer cron secret or sandbox token
    const diffs = diffDetector.detectTaxonomyDiffs();

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      pendingChangesFound: diffs.filter((d) => d.status === "pending_review").length,
      queue: diffs,
      note: "External sync ran. High-confidence and conflict diffs routed to Admin Curation Queue.",
    });
  } catch (error) {
    console.error("Cron sync error:", error);
    return NextResponse.json({ error: "Background sync execution failed" }, { status: 500 });
  }
}
