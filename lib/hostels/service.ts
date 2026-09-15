import type {
    Hostel,
    HostelDetails,
    HostelSearchParams,
    HostelSearchResult,
    Review,
} from '@/lib/types';
import {
    queryHostelRowById,
    queryHostelRows,
    queryReviewsByHostelId,
    querySimilarHostelRows,
    rowToHostel,
} from './repository';

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function applyFacilities(hostel: Hostel, required?: string[]): boolean {
    if (!required?.length) return true;
    return required.every((f) => {
        switch (f) {
            case 'wifi':
                return hostel.wifi;
            case 'food':
                return hostel.food;
            case 'ac':
                return hostel.ac;
            case 'laundry':
                return hostel.laundry;
            case 'parking':
                return hostel.parking;
            case 'cctv':
                return hostel.cctv;
            case 'security24x7':
                return hostel.security24x7;
            case 'studyRoom':
                return hostel.studyRoom;
            default:
                return true;
        }
    });
}

function matchesQuery(hostel: Hostel, q?: string): boolean {
    if (!q) return true;
    const needle = q.toLowerCase();
    return [hostel.name, hostel.city, hostel.area, hostel.address]
        .filter(Boolean)
        .some((v) => v.toLowerCase().includes(needle));
}

function compare(a: Hostel, b: Hostel, sort: HostelSearchParams['sort']): number {
    switch (sort) {
        case 'highest-rated':
            return (b.googleRating ?? 0) - (a.googleRating ?? 0);
        case 'most-reviewed':
            return (b.googleReviewCount ?? 0) - (a.googleReviewCount ?? 0);
        case 'lowest-rent':
            return a.monthlyRent - b.monthlyRent;
        case 'highest-rent':
            return b.monthlyRent - a.monthlyRent;
        case 'nearest':
            return 0; // requires user geolocation; stable for now
        case 'recommended':
        default: {
            // Temporary fallback until HostelMate ranking score exists.
            const score = (h: Hostel) =>
                (h.googleRating ?? 0) * 20 +
                Math.log10((h.googleReviewCount ?? 0) + 1) * 5;
            return score(b) - score(a);
        }
    }
}

function isValidId(id: string | undefined | null): id is string {
    return typeof id === 'string' && /^[A-Za-z0-9_-]{1,64}$/.test(id);
}

/* ------------------------------------------------------------------ */
/*  Search / list                                                      */
/* ------------------------------------------------------------------ */

export async function getHostels(
    params: HostelSearchParams,
): Promise<HostelSearchResult> {
    const { rows, total: dbTotal } = await queryHostelRows(params);

    let hostels = rows.map(rowToHostel).filter((h) => matchesQuery(h, params.q));
    hostels = hostels.filter((h) => applyFacilities(h, params.facilities));

    const filtered = hostels.length === rows.length ? dbTotal : hostels.length;

    hostels = [...hostels].sort((a, b) => compare(a, b, params.sort));

    const total = filtered;
    const totalPages = total === 0 ? 0 : Math.ceil(total / params.limit);
    const safePage = totalPages === 0 ? 1 : Math.min(params.page, totalPages);
    const start = (safePage - 1) * params.limit;
    const data = hostels.slice(start, start + params.limit);

    return {
        data,
        total,
        page: safePage,
        limit: params.limit,
        totalPages,
    };
}

export async function searchHostels(
    params: HostelSearchParams,
): Promise<HostelSearchResult> {
    return getHostels(params);
}

export async function getHostelCount(
    params: HostelSearchParams,
): Promise<number> {
    const { total } = await getHostels({ ...params, page: 1 });
    return total;
}

/* ------------------------------------------------------------------ */
/*  Details                                                            */
/* ------------------------------------------------------------------ */

export async function getHostelById(
    id: string,
): Promise<HostelDetails | null> {
    if (!isValidId(id)) return null;

    const row = await queryHostelRowById(id);
    if (!row) return null;

    const hostel = rowToHostel(row);
    const reviewRows = await queryReviewsByHostelId(id);

    const reviews: Review[] = reviewRows.map((r) => ({
        id: r.id,
        hostelId: r.hostel_id,
        userId: r.user_id,
        rating: r.rating,
        comment: r.comment ?? undefined,
        createdAt: r.created_at,
    }));

    const reviewCount = reviews.length;
    const reviewAverage =
        reviewCount === 0
            ? undefined
            : reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount;

    return {
        ...hostel,
        reviews,
        reviewCount,
        reviewAverage,
    };
}

export async function getSimilarHostels(
    city: string,
    excludeId: string,
    limit = 4,
): Promise<Hostel[]> {
    if (!city || !isValidId(excludeId)) return [];
    const rows = await querySimilarHostelRows(city, excludeId, limit);
    return rows.map(rowToHostel);
}