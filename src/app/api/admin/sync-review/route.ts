import { NextRequest, NextResponse } from "next/server";
import { diffDetector } from "@/lib/sync/diffDetector";

export async function POST(request: NextRequest) {
  try {
    const { diffId, action } = await request.json();

    if (!diffId || !["approve", "reject"].includes(action)) {
      return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
    }

    const updated = action === "approve"
      ? diffDetector.approveDiff(diffId)
      : diffDetector.rejectDiff(diffId);

    if (!updated) {
      return NextResponse.json({ error: "Diff record not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      updatedRecord: updated,
      actionApplied: action,
    });
  } catch (error) {
    console.error("Admin sync review error:", error);
    return NextResponse.json({ error: "Failed to process review action" }, { status: 500 });
  }
}

