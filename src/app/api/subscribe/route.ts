// src/app/api/subscribe/route.ts
import { NextRequest, NextResponse } from "next/server";
import supabase from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { plate, channel, phone, name } = data;

    // Hole IP aus Header
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      || req.headers.get("x-real-ip")
      || req.headers.get("cf-connecting-ip")
      || null;

    if (!ip) {
      console.error('No IP found');
      return NextResponse.json({ error: "No IP found" }, { status: 400 });
    }

    // Hole Geo-Daten
    let geo = null;
    try {
      // Verwende API Key, wenn vorhanden
      const apiKey = process.env.NEXT_PUBLIC_IPAPI_KEY;
      const geoUrl = apiKey ? `https://api.ipapi.com/${ip}?access_key=${apiKey}` : `https://ipapi.co/${ip}/json/`;
      
      const geoRes = await fetch(geoUrl, {
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (!geoRes.ok) {
        console.error('GeoIP API error:', await geoRes.text());
        return NextResponse.json({ error: 'GeoIP lookup failed' }, { status: 500 });
      }

      const geoData = await geoRes.json();
      geo = {
        city: geoData.city,
        region: geoData.region,
        country: geoData.country_name,
        lat: geoData.latitude,
        lon: geoData.longitude
      };

      console.log('Geo data:', geo);
    } catch (e) {
      console.error('Error getting geo data:', e);
    }

    const updateData = {
      plate,
      channel,
      phone,
      name,
      signup_at: new Date(),
      city: geo?.city || null,
      region: geo?.region || null,
      country: geo?.country || null,
      lat: geo?.lat || null,
      lon: geo?.lon || null
    };

    const { data: existing } = await supabase
      .from("signups")
      .select("id")
      .eq("ip", ip)
      .maybeSingle();

    if (existing) {
      await supabase
        .from("signups")
        .update(updateData)
        .eq("ip", ip);
    } else {
      await supabase
        .from("signups")
        .insert([{
          ip,
          ...updateData
        }]);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error in subscribe route:', error);
    return NextResponse.json(
      { error: 'Ein unerwarteter Fehler ist aufgetreten.' },
      { status: 500 }
    );
  }
}