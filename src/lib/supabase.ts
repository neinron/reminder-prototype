import { createClient } from "@supabase/supabase-js"

// Create Supabase client with anon key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xtuvhddxprlfydnpunlo.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0dXZoZGR4cHJsZnlkbnB1bmxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1MDg5MzksImV4cCI6MjA2MTA4NDkzOX0.8ObDMX7suKactx6H93I3wEwuQ_beqTOSN2BUPIM42lg'

// Log configuration
console.log('Supabase configuration:', {
  url: supabaseUrl,
  key: supabaseAnonKey?.substring(0, 20) + '...',
  environment: process.env.NODE_ENV,
  isProduction: process.env.NODE_ENV === 'production'
})

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Test connection with retry
async function testConnection() {
  try {
    // Test auth first
    const { data: { session }, error: authError } = await supabase.auth.getSession()
    if (authError) {
      console.error('Supabase auth error:', {
        message: authError.message,
        code: authError.code,
        status: authError.status
      })
      return false
    }

    // Test database connection
    try {
      const { data, error: dbError } = await supabase
        .from('signups')
        .select('id')
        .limit(1)
        .single()
      
      if (dbError) {
        console.error('Database test error:', {
          message: dbError.message,
          code: dbError.code,
          details: dbError.details
        })
        return false
      }

      console.log('Supabase connection test:', {
        isConnected: true,
        timestamp: new Date().toISOString(),
        databaseTest: data ? 'success' : 'failed',
        authTest: session ? 'success' : 'failed'
      })
      return true
    } catch (dbError) {
      console.error('Database test error:', {
        message: dbError instanceof Error ? dbError.message : 'Unknown database error',
        stack: dbError instanceof Error ? dbError.stack : undefined
      })
      return false
    }
  } catch (error: unknown) {
    console.error('Supabase connection error:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      environment: process.env.NODE_ENV
    })
    return false
  }
}

// Initial connection test
const isConnected = testConnection()

export default supabase
