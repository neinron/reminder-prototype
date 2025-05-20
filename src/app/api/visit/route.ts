// src/app/api/visit/route.ts
import { NextRequest, NextResponse } from "next/server";
import supabase from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    // Hole grobe Geo-Location inkl. IP
    let geo = null;
    let ip = null;
    
    try {
      const geoRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/geo`, { headers: req.headers });
      if (geoRes.ok) {
        geo = await geoRes.json();
        ip = geoRes.url.split("/").pop(); // fallback, falls IP im URL ist
        if (geoRes.headers.get("x-forwarded-for")) {
          ip = geoRes.headers.get("x-forwarded-for");
        }
      }
    } catch (e) {
      geo = null;
    }
    
    // Hole IP aus Geo-API oder Header
    if (!ip) {
      ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
        || req.headers.get("x-real-ip")
        || req.headers.get("cf-connecting-ip")
        || null;
    }
    
    if (!ip) {
      return NextResponse.json({ error: "No IP found" }, { status: 400 });
    }

    // Update oder Insert
    const { data: existing } = await supabase
      .from("signups")
      .select("id")
      .eq("ip", ip)
      .maybeSingle();

    const updateData = {
      ip,
      visited_at: new Date(),
      city: geo?.city || null,
      region: geo?.region || null,
      country: geo?.country || null,
      lat: geo?.lat || null,
      lon: geo?.lon || null
    };

    if (existing) {
      // Update vorhandenen Eintrag
      await supabase
        .from("signups")
        .update(updateData)
        .eq("ip", ip);
    } else {
      // Insert neuen Eintrag
      await supabase
        .from("signups")
        .insert([updateData]);
    }

    return NextResponse.json({ success: true, geo, ip });

  } catch (error) {
    console.error('Error in visit route:', error);
    return NextResponse.json(
      { error: 'Ein unerwarteter Fehler ist aufgetreten.' },
      { status: 500 }
    );
  }
}