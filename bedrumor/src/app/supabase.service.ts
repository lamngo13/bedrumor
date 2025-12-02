import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wlzjjwoawqfixjqwdrfc.supabase.co'
const newsupakey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indsempqd29hd3FmaXhqcXdkcmZjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDUwNjU2NSwiZXhwIjoyMDgwMDgyNTY1fQ.s04Wa8XsWYbCsDnzML4JpBKzojLgbVxcmSxspu3Uxs4'
//^ use this one, but make sure to put it in gh env vars
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indsempqd29hd3FmaXhqcXdkcmZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1MDY1NjUsImV4cCI6MjA4MDA4MjU2NX0.zMJlHWJ1XZ1hfr_7FaDHaboF1FrOJgM_9Rbg3e6OR1I'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false, detectSessionInUrl: false },
});