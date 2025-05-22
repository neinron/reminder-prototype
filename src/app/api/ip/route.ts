// IP address and location retrieval API endpoint
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Get the API key from environment variables
    const apiKey = process.env.NEXT_PUBLIC_GETGEOAPI_KEY;
    
    // Use either the API key endpoint or the free endpoint
    const baseEndpoint = apiKey 
      ? `https://api.getgeoapi.com/v2/ip/check?api_key=${apiKey}&format=json&filter=location`
      : 'https://api.getgeoapi.com/v2/ip/check?format=json&filter=location';

    // Build the request URL with parameters
    const response = await fetch(
      baseEndpoint,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        next: { revalidate: 3600 }, // Cache for 1 hour to reduce API calls
      }
    );

    // Handle response errors
    if (!response.ok) {
      const error = await response.json();
      // Return formatted error response
      return new NextResponse(
        JSON.stringify({ error: `Failed to get IP address: ${error.message || response.status}` }),
        { status: response.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    
    // Validate API response
    if (data.status !== 'success') {
      return new NextResponse(
        JSON.stringify({ error: `GetGeoAPI request failed: ${data.error?.message}` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Format and return the data
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
    // Log and return server error
    console.error('Error in IP API:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
