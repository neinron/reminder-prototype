import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.GETGEOAPI_KEY;
    if (!apiKey) {
      return new NextResponse(
        JSON.stringify({ error: 'API key not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const response = await fetch(
        `https://api.getgeoapi.com/v2/ip/check?api_key=${apiKey}&format=json&filter=location`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          next: { revalidate: 3600 }, // Cache for 1 hour
        }
      );

    if (!response.ok) {
      const error = await response.json();
      return new NextResponse(
        JSON.stringify({ error: `Failed to get IP address: ${error.message || response.status}` }),
        { status: response.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    
    if (data.status !== 'success') {
      return new NextResponse(
        JSON.stringify({ error: `GetGeoAPI request failed: ${data.error?.message}` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new NextResponse(
      JSON.stringify({
        ip: data.ip,
        location: data.location ? {
          latitude: data.location.latitude,
          longitude: data.location.longitude
        } : undefined
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in IP API:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
