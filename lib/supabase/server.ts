import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { publicEnv } from '@/lib/env';

let cached: SupabaseClient | null = null;

export function getSupabaseServerClient(): SupabaseClient {
    if (cached) return cached;
    if (!publicEnv.supabaseUrl || !publicEnv.supabaseAnonKey) {
        throw new Error(
            'Supabase env vars are missing. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local.',
        );
    }
    cached = createClient(publicEnv.supabaseUrl, publicEnv.supabaseAnonKey, {
        auth: { persistSession: false, autoRefreshToken: false },
    });
    return cached;
}