import { NextRequest, NextResponse } from 'next/server';
import { parseSearchParams } from '@/lib/hostels/filters';
import { getHostels } from '@/lib/hostels/service';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
console.log('[debug] supabase url?', Boolean(url), 'key?', Boolean(key));


export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const raw: Record<string, string> = {};
        req.nextUrl.searchParams.forEach((v, k) => {
            raw[k] = v;
        });

        const params = parseSearchParams(raw);
        const result = await getHostels(params);

        return NextResponse.json(result, {
            headers: { 'Cache-Control': 'no-store' },
        });
    } catch (err) {
        console.error('[GET /api/hostels]', err);
        return NextResponse.json(
            { error: 'Unable to load hostels.' },
            { status: 500 },
        );
    }
}