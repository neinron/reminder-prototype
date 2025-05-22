// src/app/api/subscribe/route.ts
import { NextRequest, NextResponse } from "next/server";
import supabase from "@/lib/supabase";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  try {
    console.log('Subscribe endpoint called - Processing form submission');
    
    const data = await req.json();
    const { plate, channel, phone, name, uniqueId } = data;

    console.log('Received form submission data:', {
      plate,
      channel,
      phone,
      name,
      uniqueId
    });

    // Always require uniqueId from the request
    if (!uniqueId) {
      return NextResponse.json(
        { error: 'No uniqueId provided' },
        { status: 400 }
      );
    }

    const finalUniqueId = uniqueId;

    // Check if this exact combination already exists
    const { data: existing, error: queryError } = await supabase
      .from("signups")
      .select("*")
      .eq("plate", plate)
      .eq("phone", phone)
      .eq("name", name)
      .eq("status", "joined_waiting_list")
      .maybeSingle();

    if (queryError) {
      console.error('Error querying existing entry:', queryError);
      return NextResponse.json({ error: "Database query error" }, { status: 500 });
    }

    // If this exact combination exists, return success with a message
    if (existing) {
      console.log('Entry with same plate/phone/name already exists');
      return NextResponse.json(
        { 
          success: true,
          message: 'Sie haben sich bereits mit diesen Daten angemeldet.',
          uniqueId: existing.unique_id
        },
        { status: 200 }
      );
    }

    // Check if we have an existing entry with this UUID
    const { data: existingUuid, error: queryErrorUuid } = await supabase
      .from("signups")
      .select("*")
      .eq("unique_id", uniqueId)
      .single();

    if (queryErrorUuid) {
      console.error('Error querying existing entry:', queryErrorUuid);
      return NextResponse.json({ error: "Database query error" }, { status: 500 });
    }

    // If we have an existing entry with this UUID and it's not feedback, create new entry
    if (existingUuid && existingUuid.status !== 'joined+feedback') {
      const newUniqueId = uuidv4();
      console.log('Creating new entry with UUID:', newUniqueId);

      // Create new entry
      const updateData = {
        unique_id: newUniqueId,
        plate,
        channel,
        phone,
        name,
        signup_at: new Date(),
        status: 'joined_waiting_list'
      };

      const { error: insertError } = await supabase
        .from("signups")
        .insert([updateData]);

      if (insertError) {
        console.error('Error creating new entry:', insertError);
        return NextResponse.json({ error: "Failed to create new entry" }, { status: 500 });
      }

      console.log('Successfully created new entry for plate:', plate);
      return NextResponse.json({ 
        success: true, 
        uniqueId: newUniqueId,
        needsLocalStorageUpdate: true
      });
    }

    // Check for existing feedback entry with same plate, phone, name, and channel
    const { data: feedbackEntry, error: feedbackError } = await supabase
      .from("signups")
      .select("*")
      .eq("plate", plate)
      .eq("phone", phone)
      .eq("name", name)
      .eq("channel", channel)
      .eq("status", "joined+feedback")
      .maybeSingle();

    if (feedbackError) {
      console.error('Error checking for feedback entry:', feedbackError);
      return NextResponse.json({ error: "Database query error" }, { status: 500 });
    }

    // If no existing entry, create new one with new UUID
    if (!feedbackEntry) {
      // Get existing entry by UUID with full data
      const { data: existingUuid, error: queryErrorUuid } = await supabase
        .from("signups")
        .select("*")
        .eq("unique_id", uniqueId)
        .single();

      if (queryErrorUuid) {
        console.error('Error querying existing entry:', queryErrorUuid);
        return NextResponse.json({ error: "Database query error" }, { status: 500 });
      }

      if (!existingUuid) {
        const newUniqueId = uuidv4();
        console.log('Creating new entry with UUID:', newUniqueId);

        // Create new entry
        const updateData = {
          unique_id: newUniqueId,
          plate,
          channel,
          phone,
          name,
          signup_at: new Date(),
          status: 'joined_waiting_list'
        };

        const { error: insertError } = await supabase
          .from("signups")
          .insert([updateData]);

        if (insertError) {
          console.error('Error creating new entry:', insertError);
          return NextResponse.json({ error: "Failed to create new entry" }, { status: 500 });
        }

        console.log('Successfully created new entry for plate:', plate);
        return NextResponse.json({ 
          success: true, 
          uniqueId: newUniqueId,
          needsLocalStorageUpdate: true // Indicate that localStorage needs to be updated
        });
      }

      // Check if entry already has feedback status
      if (existingUuid.status === 'joined+feedback') {
        console.log('Entry already has feedback status, cannot update');
        return NextResponse.json(
          { error: 'Entry already has feedback status' },
          { status: 403 }
        );
      }

      // Update existing entry
      const updateData = {
        plate,
        channel,
        phone,
        name,
        signup_at: existingUuid.signup_at || new Date(), // Keep original signup_at if exists
        status: 'joined_waiting_list'
      };

      // Perform the update with proper error handling
      const { data: updated, error: updateError } = await supabase
        .from("signups")
        .update(updateData)
        .eq("unique_id", uniqueId)
        .select()
        .single();

      if (updateError) {
        console.error('Error updating existing entry:', updateError);
        return NextResponse.json({ error: "Failed to update existing entry" }, { status: 500 });
      }

      console.log('Successfully updated entry for UUID:', uniqueId);
      return NextResponse.json({ 
        success: true, 
        uniqueId,
        needsLocalStorageUpdate: false // No need to update localStorage
      });
    }

    // If we found a feedback entry with different data, create new entry
    if (feedbackEntry.unique_id !== uniqueId) {
      const newUniqueId = uuidv4();
      console.log('Creating new entry with UUID:', newUniqueId);

      // Create new entry
      const updateData = {
        unique_id: newUniqueId,
        plate,
        channel,
        phone,
        name,
        signup_at: new Date(),
        status: 'joined+feedback'
      };

      const { error: insertError } = await supabase
        .from("signups")
        .insert([updateData]);

      if (insertError) {
        console.error('Error creating new entry:', insertError);
        return NextResponse.json({ error: "Failed to create new entry" }, { status: 500 });
      }

      console.log('Successfully created new entry for plate:', plate);
      return NextResponse.json({ 
        success: true, 
        uniqueId: newUniqueId,
        needsLocalStorageUpdate: true // Indicate that localStorage needs to be updated
      });
    }

    // If we found a feedback entry with same UUID, allow updating the feedback
    const updateData = {
      plate,
      channel,
      phone,
      name,
      signup_at: feedbackEntry.signup_at || new Date(), // Keep original signup_at if exists
      status: 'joined+feedback'
    };

    // Perform the update with proper error handling
    const { data: updated, error: updateError } = await supabase
      .from("signups")
      .update(updateData)
      .eq("unique_id", uniqueId)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating existing entry:', updateError);
      return NextResponse.json({ error: "Failed to update existing entry" }, { status: 500 });
    }

    console.log('Successfully updated feedback entry for UUID:', uniqueId);
    return NextResponse.json({ 
      success: true, 
      uniqueId,
      needsLocalStorageUpdate: false // No need to update localStorage
    });

  } catch (error) {
    console.error('Error in subscribe route:', error);
    return NextResponse.json(
      { error: 'Ein unerwarteter Fehler ist aufgetreten.' },
      { status: 500 }
    );
  }
}