/**
 * Centralised env access. Never import secret values in client components.
 * Public vars must be prefixed with NEXT_PUBLIC_.
 */
export const publicEnv = {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
};

// Server-only getters — call these from server actions / route handlers only.
export function getServerEnv() {
    return {
        supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
        databaseUrl: process.env.DATABASE_URL ?? '',
        aiRecommendationApiKey: process.env.AI_RECOMMENDATION_API_KEY ?? '',
    };
}