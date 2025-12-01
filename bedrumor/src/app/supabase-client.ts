// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = 'https://wlzjjwoawqfixjqwdrfc.supabase.co'
// // //TODO env this
// // const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indsempqd29hd3FmaXhqcXdkcmZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1MDY1NjUsImV4cCI6MjA4MDA4MjU2NX0.zMJlHWJ1XZ1hfr_7FaDHaboF1FrOJgM_9Rbg3e6OR1I'
//  const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indsempqd29hd3FmaXhqcXdkcmZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1MDY1NjUsImV4cCI6MjA4MDA4MjU2NX0.zMJlHWJ1XZ1hfr_7FaDHaboF1FrOJgM_9Rbg3e6OR1I'
  const newsupakey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indsempqd29hd3FmaXhqcXdkcmZjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDUwNjU2NSwiZXhwIjoyMDgwMDgyNTY1fQ.s04Wa8XsWYbCsDnzML4JpBKzojLgbVxcmSxspu3Uxs4'
// // //^ use this one, but make sure to put it in gh env vars

// export const supabase = createClient(supabaseUrl, newsupakey, {
//   auth: { persistSession: false, detectSessionInUrl: false },
// });

// // export const supabase = createClient(supabaseUrl, newsupakey, {
// //   auth: {
// //     persistSession: false, // ⚠️ disable auto-persistence to avoid NavigatorLock errors
// //     detectSessionInUrl: false,
// //   },
// // });

import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wlzjjwoawqfixjqwdrfc.supabase.co';


@Injectable({
  providedIn: 'root', // singleton service
})
export class SupabaseService {
  public client: SupabaseClient;

  constructor() {
    // Disable session persistence to avoid NavigatorLock conflicts
    this.client = createClient(SUPABASE_URL, newsupakey, {
      auth: { persistSession: false },
      global: { fetch: window.fetch.bind(window) }, // ensure browser fetch
    });
  }

  async uploadImage(file: File, folder = 'gallery') {
    const filePath = `${folder}/${Date.now()}_${file.name}`;
    const { data, error } = await this.client.storage
      .from('images')
      .upload(filePath, file, { upsert: true });

    if (error) throw error;

    const { data: urlData } = this.client.storage
      .from('images')
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  }
}
