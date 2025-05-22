// src/app/api/visit/check/route.ts
import { NextRequest, NextResponse } from "next/server";
import supabase from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    console.log('Visit check endpoint called');
    
    const data = await req.json();
    const { uniqueId } = data;

    if (!uniqueId) {
      return NextResponse.json(
        { error: 'No uniqueId provided' },
        { status: 400 }
      );
    }

    // Check if entry exists
    const { data: existing, error: queryError } = await supabase
      .from("signups")
      .select("*")
      .eq("unique_id", uniqueId)
      .maybeSingle();

    if (queryError) {
      console.error('Error checking visit:', queryError);
      return NextResponse.json(
        { error: 'Database error' },
        { status: 500 }
      );
    }

    if (!existing) {
      console.log('No existing entry found for UUID:', uniqueId);
      return NextResponse.json(
        { exists: false },
        { status: 404 }
      );
    }

    console.log('Found existing entry with status:', existing.status);
    return NextResponse.json({ exists: true });

  } catch (error) {
    console.error('Error in visit check route:', error);
    return NextResponse.json(
      { error: 'Ein unerwarteter Fehler ist aufgetreten.' },
      { status: 500 }
    );
  }
}
