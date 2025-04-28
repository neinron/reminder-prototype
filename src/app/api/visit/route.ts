import { NextResponse } from "next/server"
import supabase from "@/lib/supabase"

export async function POST(request: Request) {
  // Hole grobe Geo-Location inkl. IP
  let geo = null;
  let ip = null;
  try {
    const geoRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/geo`, { headers: request.headers });
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
    ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      || request.headers.get("x-real-ip")
      || request.headers.get("cf-connecting-ip")
      || null;
  }
  if (!ip) {
    return NextResponse.json({ error: "No IP found" }, { status: 400 });
  }
  // Prüfe, ob IP schon existiert
  const { data: existing } = await supabase.from("signups").select("id").eq("ip", ip).maybeSingle();
  if (existing) {
    // Update
    await supabase.from("signups").update({
      visited_at: new Date(),
      city: geo?.city || null,
      region: geo?.region || null,
      country: geo?.country || null,
      lat: geo?.lat || null,
      lon: geo?.lon || null
    }).eq("ip", ip);
  } else {
    // Insert
    await supabase.from("signups").insert([
      {
        ip,
        visited_at: new Date(),
        city: geo?.city || null,
        region: geo?.region || null,
        country: geo?.country || null,
        lat: geo?.lat || null,
        lon: geo?.lon || null
      }
    ]);
  }
  return NextResponse.json({ success: true, geo, ip });
}
