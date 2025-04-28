import { NextResponse } from "next/server"
import supabase from "@/lib/supabase"

export async function POST(req: Request) {
  try {
    const data = await req.json();
    // IP aus Header holen (wie in visit/route.ts)
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      || req.headers.get("x-real-ip")
      || req.headers.get("cf-connecting-ip")
      || null;
    if (!ip) {
      return NextResponse.json({ success: false, error: "No IP found" }, { status: 400 });
    }
    // Update-Objekt bauen
    const updateObj: any = {};
    if (data.email) updateObj.email = data.email;
    if (data.phone) updateObj.phone = data.phone;
    if (data.whatsapp) updateObj.whatsapp = data.whatsapp;
    if (data.plate) updateObj.plate = data.plate;
    if (data.channel) updateObj.channel = data.channel;
    updateObj.signup_at = new Date();

    // Update anhand der IP
    const { error } = await supabase.from("signups").update(updateObj).eq("ip", ip);
    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("API error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

