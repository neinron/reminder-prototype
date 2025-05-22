// src/app/api/feedback/route.ts
import { NextRequest, NextResponse } from "next/server";
import supabase from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    console.log('Feedback endpoint called - Processing feedback submission');
    
    let data: any = {};
    try {
      data = await req.json();
    } catch (err) {
      console.error('Malformed or empty JSON body received:', err);
      return NextResponse.json({ error: 'Malformed or empty JSON body.' }, { status: 400 });
    }

    // Support both camelCase and snake_case for uniqueId
    const uniqueId = data.uniqueId || data.unique_id;
    const reminderLead = data.reminderLead || data.reminder_lead;
    const monthlyValue = data.monthlyValue || data.monthly_value;
    const perUseValue = data.perUseValue || data.per_use_value;
    const benefit = data.benefit;
    const benefitOther = data.benefitOther || data.benefit_other;

    console.log('Received feedback data:', {
      uniqueId,
      reminderLead,
      monthlyValue,
      perUseValue,
      benefit,
      benefitOther
    });

    if (!uniqueId) {
      console.error('No uniqueId provided in feedback data');
      return NextResponse.json({ error: "No uniqueId provided" }, { status: 400 });
    }

    // Prepare update data first
    const updateData = {
      unique_id: uniqueId,
      reminder_lead: reminderLead,
      monthly_price: monthlyValue,
      per_use_price: perUseValue,
      benefit: Array.isArray(benefit) ? benefit : [benefit],
      benefit_other: benefitOther,
      status: 'joined+feedback',
      updated_at: new Date()
    };

    console.log('Updating entry with new status:', updateData.status);
    console.log('Update data:', updateData);

    // First check if entry exists
    const { data: existing, error: queryError } = await supabase
      .from("signups")
      .select("*")
      .eq("unique_id", uniqueId)
      .maybeSingle();

    if (queryError) {
      console.error('Error querying existing entry:', queryError);
      return NextResponse.json({ error: "Database query error" }, { status: 500 });
    }

    if (!existing) {
      console.error('No existing entry found for UUID:', uniqueId);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log('Found existing entry with status:', existing.status);
    console.log('Existing entry data:', existing);

    // Update only if entry exists
    const { data: updated, error: updateError } = await supabase
      .from("signups")
      .update(updateData)
      .eq("unique_id", uniqueId)
      .select()
      .maybeSingle();

    if (updateError) {
      console.error('Error updating entry:', updateError);
      return NextResponse.json({ error: "Failed to update entry" }, { status: 500 });
    }

    // Return the updated data
    console.log('Successfully processed feedback entry with status:', updateData.status);
    console.log('Updated entry:', updated);

    console.log('Successfully updated entry with status:', updateData.status);

    return NextResponse.json({ success: true, data: updated });

  } catch (error) {
    console.error('Error in feedback route:', error);
    return NextResponse.json(
      { error: 'Ein unerwarteter Fehler ist aufgetreten.', details: (error instanceof Error ? error.message : error) },
      { status: 500 }
    );
  }
}