import { NextRequest, NextResponse } from "next/server";
import { searchSpecies } from "@/lib/data/speciesRepository";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get("q") || undefined;
    const category = searchParams.get("category") || undefined;
    const habitat = searchParams.get("habitat") || undefined;
    const continent = searchParams.get("continent") || undefined;
    const conservationStatus = searchParams.get("status") || undefined;
    const family = searchParams.get("family") || undefined;
    const sortBy = (searchParams.get("sortBy") as "name" | "status" | "updated") || undefined;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "12", 10);

    const result = await searchSpecies({
      query,
      category,
      habitat,
      continent,
      conservationStatus,
      family,
      sortBy,
      page,
      limit,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in /api/animals/search:", error);
    return NextResponse.json(
      { error: "Failed to execute species search" },
      { status: 500 }
    );
  }
}

