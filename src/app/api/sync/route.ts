// @ts-nocheck
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    // Fetch data from GBIF API
    const response = await fetch('https://api.gbif.org/v1/species/search?rank=SPECIES&limit=20');
    const data = await response.json();

    if (!data || !data.results) {
      return NextResponse.json({ error: 'No data found' }, { status: 400 });
    }

    const newAnimals = data.results.map((item: any) => ({
      common_name: item.vernacularName || item.canonicalName,
      scientific_name: item.scientificName,
      taxonomic_group: item.class || 'Unknown',
      family: item.family || 'Unknown',
      habitat: 'Global',
      conservation_status: item.threatStatus || 'Not Assessed',
      short_description: `Automatically synced from GBIF. Record ID: ${item.key}`,
    }));

    // Upsert to Supabase database
    const { error } = await supabaseAdmin
      .from('animals')
      .upsert(newAnimals, { onConflict: 'scientific_name' });

    if (error) throw error;

    return NextResponse.json({ success: true, message: `Synced ${newAnimals.length} species.` }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
