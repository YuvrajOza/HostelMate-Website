import { NextRequest, NextResponse } from 'next/server';
import { getHostelById } from '@/lib/hostels/service';

export const dynamic = 'force-dynamic';

export async function GET(
    _req: NextRequest,
    { params }: { params: { id: string } },
) {
    const { id } = params;
    if (!id || !/^[A-Za-z0-9_-]{1,64}$/.test(id)) {
        return NextResponse.json({ error: 'Invalid hostel id.' }, { status: 400 });
    }

    try {
        const hostel = await getHostelById(id);
        if (!hostel) {
            return NextResponse.json({ error: 'Hostel not found.' }, { status: 404 });
        }
        return NextResponse.json(hostel, {
            headers: { 'Cache-Control': 'no-store' },
        });
    } catch (err) {
        console.error(`[GET /api/hostels/${id}]`, err);
        return NextResponse.json(
            { error: 'Unable to load hostel information.' },
            { status: 500 },
        );
    }
}