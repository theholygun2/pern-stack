// Initialize Supabase client

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseBucketName = process.env.SUPABASE_BUCKET_NAME;

if (!supabaseUrl || !supabaseAnonKey || !supabaseBucketName) {
  console.error('Supabase URL, Anon Key, or Bucket Name is missing in .env file. Server will not be able to upload to Supabase.');
  // Depending on desired behavior, you might want to exit here or let it run without Supabase functionality.
}
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;