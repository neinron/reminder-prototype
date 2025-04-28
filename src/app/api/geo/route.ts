import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: Request) {
  // Try to get IP address from headers (Vercel/Next.js edge runtime)
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    null;

  if (!ip) {
    return NextResponse.json({ error: "No IP found" }, { status: 400 });
  }

  // Use a free geolocation API (ip-api.com, ipwhois, etc.)
  // Here: ip-api.com (no API key required, privacy-friendly, city/country only)
  const geoRes = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,regionName,city,lat,lon`);
  const geo = await geoRes.json();

  if (geo.status !== "success") {
    return NextResponse.json({ error: "Geo lookup failed" }, { status: 500 });
  }

  // Return only coarse info
  return NextResponse.json({
    city: geo.city,
    region: geo.regionName,
    country: geo.country,
    lat: geo.lat,
    lon: geo.lon,
  });
}
