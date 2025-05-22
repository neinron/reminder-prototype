// src/app/api/visit/route.ts
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import supabase from "@/lib/supabase";

// Handle new visit creation
export async function POST(req: NextRequest) {
  try {
    console.log('Visit endpoint called - Creating new visitor entry');
    
    // Get request body and log it
    const text = await req.text();
    console.log('Request body:', text);
    
    if (!text) {
      console.error('Empty request body received');
      return NextResponse.json(
        { error: 'Empty request body' },
        { status: 400 }
      );
    }

    // Parse JSON safely
    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      return NextResponse.json(
        { error: 'Invalid JSON format' },
        { status: 400 }
      );
    }

    const { uniqueId } = data;

    // Use existing UUID or generate new one
    const finalUniqueId = uniqueId || uuidv4();
    console.log('Using UUID:', finalUniqueId);

    // Create new entry
    const updateData = {
      unique_id: finalUniqueId,
      visited_at: new Date(),
      status: 'visited'
    };
    console.log('Creating database entry with status:', updateData.status);

    // Insert new entry
    await supabase
      .from("signups")
      .insert([updateData]);
    console.log('Successfully created visitor entry in database');

    return NextResponse.json({ success: true, uniqueId });

  } catch (error) {
    console.error('Error in visit route:', error);
    return NextResponse.json(
      { error: 'Ein unerwarteter Fehler ist aufgetreten.' },
      { status: 500 }
    );
  }
}

// Update visit status
export async function PUT(req: NextRequest) {
  try {
    console.log('Visit update endpoint called');
    
    // Get request body and log it
    const text = await req.text();
    console.log('Request body:', text);
    
    if (!text) {
      console.error('Empty request body received');
      return NextResponse.json(
        { error: 'Empty request body' },
        { status: 400 }
      );
    }

    // Parse JSON safely
    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      return NextResponse.json(
        { error: 'Invalid JSON format' },
        { status: 400 }
      );
    }

    const { uniqueId } = data;

    if (!uniqueId) {
      return NextResponse.json(
        { error: 'No uniqueId provided' },
        { status: 400 }
      );
    }

    const { data: existing, error } = await supabase
      .from("signups")
      .select("*")
      .eq("unique_id", uniqueId)
      .single();

    if (error) {
      console.error('Error checking visit:', error);
      return NextResponse.json(
        { error: 'Database error' },
        { status: 500 }
      );
    }

    if (!existing) {
      // Create new entry if it doesn't exist
      const updateData = {
        unique_id: uniqueId,
        visited_at: new Date(),
        status: 'visited'
      };
      await supabase
        .from("signups")
        .insert([updateData]);
      console.log('Created new entry for UUID:', uniqueId);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error in visit update route:', error);
    return NextResponse.json(
      { error: 'Ein unerwarteter Fehler ist aufgetreten.' },
      { status: 500 }
    );
  }
}