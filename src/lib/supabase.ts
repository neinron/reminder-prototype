import { createClient } from "@supabase/supabase-js"

// Create Supabase client with anon key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase configuration:', {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseAnonKey,
    environment: process.env.NODE_ENV
  });
  throw new Error('Supabase configuration is missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

// Log configuration
console.log('Supabase configuration:', {
  url: supabaseUrl,
  key: supabaseAnonKey?.substring(0, 20) + '...',
  environment: process.env.NODE_ENV,
  isProduction: process.env.NODE_ENV === 'production'
})

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Test connection with retry
async function testConnection() {
  try {
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
        databaseTest: data ? 'success' : 'failed'
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
