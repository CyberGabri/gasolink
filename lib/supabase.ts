import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://llwoggphcjolztgobach.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_6KK9oSOhlIFBvdRdMGzTlQ_B_GkoxlI'

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
)
