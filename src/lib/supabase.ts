import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// Create a single supabase client for interacting with your database
// Provide a placeholder URL and key at build time so Next.js static generation doesn't crash
export const supabase = createClient(supabaseUrl, supabaseKey);
