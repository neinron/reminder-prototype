// Subscription API endpoint for test phase
import { NextRequest, NextResponse } from "next/server";
import supabase from "@/lib/supabase";

/**
 * Handles POST requests to the subscribe route.
 * 
 * This route is responsible for processing subscription requests, 
 * including validating user input, retrieving geolocation data, 
 * and updating or creating user records in the database.
 * 
 * @param req The incoming request object.
 * @returns A JSON response indicating success or error.
 */
export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const data = await req.json();
    const { plate, channel, phone, name } = data;

    // Get IP address from request headers (multiple fallbacks)
    // This is necessary because the IP address may be forwarded by proxies or load balancers.
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      || req.headers.get("x-real-ip")
      || req.headers.get("cf-connecting-ip")
      || null;

    // Validate IP address
    if (!ip) {
      console.error('No IP found');
      return NextResponse.json({ error: "No IP found" }, { status: 400 });
    }

    // Cache for Geo data
    // This cache is used to store geolocation data for IP addresses that have already been looked up.
    const geoCache = new Map<string, any>();
    
    // Get Geo data
    // This data is used to determine the user's location based on their IP address.
    let geo = geoCache.get(ip);
    if (!geo) {
      try {
        // Use API key if available, otherwise use free endpoint
        // The API key is used to access a paid geolocation API, which provides more accurate data.
        const apiKey = process.env.NEXT_PUBLIC_IPAPI_KEY;
        const geoUrl = apiKey ? `https://api.ipapi.com/${ip}?access_key=${apiKey}` : `https://ipapi.co/${ip}/json/`;
        
        const geoRes = await fetch(geoUrl, {
          headers: {
            'Accept': 'application/json'
          }
        });
        
        // Handle API response
        if (!geoRes.ok) {
          console.error('GeoIP API error:', await geoRes.text());
          // Fallback: Use empty Geo data instead of error
          geo = {
            city: null,
            region: null,
            country: null,
            lat: null,
            lon: null
          };
        } else {
          const geoData = await geoRes.json();
          geo = {
            city: geoData.city,
            region: geoData.region,
            country: geoData.country_name,
            lat: geoData.latitude,
            lon: geoData.longitude
          };
          geoCache.set(ip, geo); // Cache the data
        }
      } catch (e) {
        console.error('Error getting geo data:', e);
        geo = {
          city: null,
          region: null,
          country: null,
          lat: null,
          lon: null
        };
      }
    }

    // Prepare data for database
    // This data includes the user's input, geolocation data, and a timestamp.
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

    // Check if user already exists
    // This is done by querying the database for a record with the same IP address.
    const { data: existing } = await supabase
      .from("signups")
      .select("id")
      .eq("ip", ip)
      .maybeSingle();

    // Update or create user record
    // If the user already exists, their record is updated with the new data.
    // Otherwise, a new record is created.
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
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}