import { createClient } from "@supabase/supabase-js"

// Create Supabase client with better error handling
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xtuvhddxprlfydnpunlo.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0dXZoZGR4cHJsZnlkbnB1bmxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1MDg5MzksImV4cCI6MjA2MTA4NDkzOX0.8ObDMX7suKactx6H93I3wEwuQ_beqTOSN2BUPIM42lg'
)

// Test connection with retry
async function testConnection() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) {
      console.error('Supabase auth error:', error)
      return false
    }
    console.log('Supabase connection test:', {
      isConnected: !!session,
      timestamp: new Date().toISOString(),
      session: session ? 'authenticated' : 'not authenticated'
    })
    return !!session
  } catch (error) {
    console.error('Supabase connection error:', error)
    return false
  }
}

// Initial connection test
const isConnected = testConnection()

export default supabase
