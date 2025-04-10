import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || null
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY  || null

if(!supabaseUrl || !supabaseKey) {
  throw new Error('DB: Missing Supabase credentials')
}

export const db = createClient(supabaseUrl, supabaseKey)