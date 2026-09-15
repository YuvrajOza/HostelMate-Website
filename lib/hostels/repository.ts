import type {
    Hostel,
    HostelRow,
    HostelSearchParams,
    ReviewRow,
} from '@/lib/types';
import { getSupabaseServerClient } from '@/lib/supabase/server';

/**
 * Normalises a raw DB row → domain model.
 */
export function rowToHostel(r: HostelRow): Hostel {
    return {
        id: r.id,
        name: r.name,
        slug: r.slug,
        city: r.city,
        area: r.area,
        address: r.address,
        latitude: r.latitude ?? undefined,
        longitude: r.longitude ?? undefined,
        googleRating: r.google_rating ?? undefined,
        googleReviewCount: r.google_review_count ?? undefined,
        googleMapsUrl: r.google_maps_url ?? undefined,
        phone: r.phone ?? undefined,
        website: r.website ?? undefined,
        hostelType: r.hostel_type ?? undefined,
        gender: r.gender,
        monthlyRent: r.monthly_rent,
        securityDeposit: r.security_deposit ?? undefined,
        roomType: r.room_type ?? undefined,
        food: r.food,
        wifi: r.wifi,
        laundry: r.laundry,
        ac: r.ac,
        parking: r.parking,
        cctv: r.cctv,
        security24x7: r.security_24x7,
        studyRoom: r.study_room,
        availability: r.availability,
        description: r.description ?? undefined,
        images: r.images ?? [],
        verificationStatus: r.verification_status,
        lastVerified: r.last_verified ?? undefined,
        createdAt: r.created_at,
        updatedAt: r.updated_at,
    };
}

/* ------------------------------------------------------------------ */
/*  Queries                                                            */
/* ------------------------------------------------------------------ */

export async function queryHostelRows(
    params: HostelSearchParams,
): Promise<{ rows: HostelRow[]; total: number }> {
    const supabase = getSupabaseServerClient();
    let q = supabase.from('hostels').select('*', { count: 'exact' });

    if (params.city) q = q.eq('city', params.city);
    if (params.gender) q = q.eq('gender', params.gender);
    if (params.minRent != null) q = q.gte('monthly_rent', params.minRent);
    if (params.maxRent != null) q = q.lte('monthly_rent', params.maxRent);
    if (params.rating != null) q = q.gte('google_rating', params.rating);
    if (params.availability) q = q.eq('availability', params.availability);

    if (params.facilities?.length) {
        for (const f of params.facilities) {
            q = q.eq(f, true);
        }
    }

    if (params.q) {
        const like = `%${params.q.replace(/[%_]/g, '')}%`;
        q = q.or(
            `name.ilike.${like},city.ilike.${like},area.ilike.${like},address.ilike.${like}`,
        );
    }

    switch (params.sort) {
        case 'highest-rated':
            q = q.order('google_rating', { ascending: false, nullsFirst: false });
            break;
        case 'most-reviewed':
            q = q.order('google_review_count', { ascending: false, nullsFirst: false });
            break;
        case 'lowest-rent':
            q = q.order('monthly_rent', { ascending: true });
            break;
        case 'highest-rent':
            q = q.order('monthly_rent', { ascending: false });
            break;
        case 'nearest':
        case 'recommended':
        default:
            q = q
                .order('google_rating', { ascending: false, nullsFirst: false })
                .order('google_review_count', { ascending: false, nullsFirst: false });
            break;
    }

    const offset = (params.page - 1) * params.limit;
    q = q.range(offset, offset + params.limit - 1);

    const { data, count, error } = await q;

    if (error) {
        console.error('[queryHostelRows] supabase error:', error);
        throw new Error(error.message);
    }

    return { rows: (data ?? []) as HostelRow[], total: count ?? 0 };
}

export async function queryHostelRowById(
    id: string,
): Promise<HostelRow | null> {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
        .from('hostels')
        .select('*')
        .eq('id', id)
        .maybeSingle();

    if (error) {
        console.error('[queryHostelRowById] supabase error:', error);
        throw new Error(error.message);
    }
    return (data as HostelRow | null) ?? null;
}

export async function queryReviewsByHostelId(
    hostelId: string,
): Promise<ReviewRow[]> {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('hostel_id', hostelId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('[queryReviewsByHostelId] supabase error:', error);
        throw new Error(error.message);
    }
    return (data ?? []) as ReviewRow[];
}

export async function querySimilarHostelRows(
    city: string,
    excludeId: string,
    limit: number,
): Promise<HostelRow[]> {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
        .from('hostels')
        .select('*')
        .eq('city', city)
        .neq('id', excludeId)
        .limit(limit);

    if (error) {
        console.error('[querySimilarHostelRows] supabase error:', error);
        throw new Error(error.message);
    }
    return (data ?? []) as HostelRow[];
}