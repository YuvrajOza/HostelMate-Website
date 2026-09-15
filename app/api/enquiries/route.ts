import { NextRequest, NextResponse } from 'next/server';
import { submitEnquiry } from '@/lib/enquiries/service';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    let body: unknown;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
    }

    const b = body as Record<string, unknown>;
    const hostelId = typeof b.hostelId === 'string' ? b.hostelId.trim() : '';
    const name = typeof b.name === 'string' ? b.name.trim() : '';
    const email = typeof b.email === 'string' ? b.email.trim() : '';
    const phone = typeof b.phone === 'string' ? b.phone.trim() : '';
    const message = typeof b.message === 'string' ? b.message.trim() : '';

    const result = await submitEnquiry({
        hostelId,
        name,
        email,
        phone,
        message,
    });

    if (!result.ok) {
        if ('serverError' in result) {
            return NextResponse.json(
                { error: 'Unable to send enquiry. Please try again.' },
                { status: 500 },
            );
        }
        return NextResponse.json(
            { error: 'Validation failed.', fieldErrors: result.errors },
            { status: 400 },
        );
    }

    return NextResponse.json({ ok: true, enquiry: result.enquiry });
}