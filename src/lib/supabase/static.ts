import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// This is a "static" client that doesn't rely on cookies.
// It should only be used in functions that run at build time, like generateStaticParams.
export function createClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
