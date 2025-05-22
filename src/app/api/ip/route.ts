// IP address and location retrieval API endpoint
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Get the API key from environment variables
    const apiKey = process.env.NEXT_PUBLIC_GETGEOAPI_KEY;
    
    // Use either the API key endpoint or the free endpoint
    const baseEndpoint = apiKey 
      ? `https://api.getgeoapi.com/v2/ip/check?api_key=${apiKey}&format=json`
      : 'https://api.getgeoapi.com/v2/ip/check?format=json';

    console.log('Making API request to:', baseEndpoint);

    // Build the request URL with parameters
    const response = await fetch(baseEndpoint, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour to reduce API calls
    });

    // Handle response errors
    if (!response.ok) {
      const error = await response.json();
      console.error('API Error:', error);
      throw new Error(error.message || `Failed to get IP address: ${response.status}`);
    }

    // Parse the response
    const data = await response.json();
    console.log('API Response:', data); // Debug log the full response
    
    // Extract the required fields
    return new NextResponse(
      JSON.stringify({
        ip: data.ip || 'Unknown',
        latitude: data.location?.latitude || 0,
        longitude: data.location?.longitude || 0,
        city: data.city?.name || data.location?.city || 'Unknown',
        region: data.area?.name || data.location?.region || 'Unknown',
        country: data.country?.name || data.location?.country || 'Unknown'
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
