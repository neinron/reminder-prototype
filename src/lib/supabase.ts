import { createClient } from "@supabase/supabase-js"

// For server-side usage, use non-public environment variables
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
// Fallback to anon key only for client-side usage
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Use service role key for server-side, anon key for client-side
const isServer = typeof window === 'undefined';
const supabaseKey = isServer ? supabaseServiceRoleKey : supabaseAnonKey;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase configuration:', {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseKey,
    environment: process.env.NODE_ENV
  });
  throw new Error('Supabase configuration is missing. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (server) or NEXT_PUBLIC_SUPABASE_ANON_KEY (client)');
}

// Only log configuration on server, and do not log sensitive keys
if (typeof window === 'undefined') {
  console.log('Supabase configuration:', {
    url: supabaseUrl,
    key: supabaseKey ? '[hidden]' : undefined,
    environment: process.env.NODE_ENV,
    isProduction: process.env.NODE_ENV === 'production'
  });
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false
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
