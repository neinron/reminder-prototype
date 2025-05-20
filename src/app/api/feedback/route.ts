// src/app/api/feedback/route.ts
import { NextRequest, NextResponse } from "next/server";
import supabase from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { reminderLead, monthlyValue, perUseValue, benefit, benefitOther } = data;

    // Hole IP aus Header
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      || req.headers.get("x-real-ip")
      || req.headers.get("cf-connecting-ip")
      || null;

    if (!ip) {
      return NextResponse.json({ error: "No IP found" }, { status: 400 });
    }

    const updateData = {
      reminder_lead: reminderLead,
      monthly_price: monthlyValue,
      per_use_price: perUseValue,
      benefit: Array.isArray(benefit) ? benefit : [benefit],
      benefit_other: benefitOther
    };

    // Update vorhandenen Eintrag
    await supabase
      .from("signups")
      .update(updateData)
      .eq("ip", ip);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error in feedback route:', error);
    return NextResponse.json(
      { error: 'Ein unerwarteter Fehler ist aufgetreten.' },
      { status: 500 }
    );
  }
}