// src/app/api/feedback/route.ts
import { NextRequest, NextResponse } from "next/server";
import supabase from "@/lib/supabase";

// Label arrays
const reminderLabels = ["5 min", "15 min", "25 min", "30 min"];
const monthlyLabels = ["1 €", "3 €", "5 €", "10 €"];
const perUseLabels = ["0.10 €", "0.20 €", "0.30 €", "0.40 €", "0.50 €", "0.60 €", "0.70 €", "0.80 €", "0.90 €", "1.00 €"];

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
      reminder_lead: reminderLabels[Number(reminderLead)],
      monthly_price: monthlyLabels[Number(monthlyValue)],
      per_use_price: perUseLabels[Number(perUseValue)],
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