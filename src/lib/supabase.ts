import { createClient } from "@supabase/supabase-js"

// Log configuration
console.log('Supabase configuration:', {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL,
  key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20) + '...' // Mask the key
});

// Create Supabase client with error handling
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Test connection
supabase.auth.getSession().then(session => {
  console.log('Supabase connection test:', {
    isConnected: !!session.data.session,
    timestamp: new Date().toISOString()
  });
}).catch(error => {
  console.error('Supabase connection error:', error);
});

export default supabase
