import type {
    Availability,
    Gender,
    HostelSearchParams,
    SortOption,
} from '@/lib/types';

const CITIES = new Set(['Ahmedabad', 'Anand', 'Vadodara']);
const GENDERS = new Set<Gender>(['Boys', 'Girls', 'Co-ed']);
const AVAILABILITY = new Set<Availability>(['Available', 'Limited', 'Not Available']);
const SORTS = new Set<SortOption>([
    'recommended',
    'highest-rated',
    'most-reviewed',
    'lowest-rent',
    'highest-rent',
    'nearest',
]);
const FACILITIES = new Set([
    'wifi',
    'food',
    'ac',
    'laundry',
    'parking',
    'cctv',
    'security24x7',
    'studyRoom',
]);

/** Legacy budget codes sent by the homepage → converted to min/max rents. */
const BUDGET_MAP: Record<string, { min: number; max?: number }> = {
    '5000-8000': { min: 5000, max: 8000 },
    '8000-12000': { min: 8000, max: 12000 },
    '12000-18000': { min: 12000, max: 18000 },
    '18000-plus': { min: 18000 },
};

export const DEFAULT_LIMIT = 10;

type RawParams = Record<string, string | string[] | undefined>;

function first(v: string | string[] | undefined): string | undefined {
    if (Array.isArray(v)) return v[0];
    return v;
}

function num(v: string | undefined): number | undefined {
    if (v == null || v === '') return undefined;
    const n = Number(v);
    return Number.isFinite(n) ? n : undefined;
}

export function parseSearchParams(raw: RawParams): HostelSearchParams {
    const q = first(raw.q)?.trim().slice(0, 120) || undefined;

    const cityRaw = first(raw.city);
    const city = cityRaw && CITIES.has(cityRaw) ? cityRaw : undefined;

    // Support both legacy `budget=5000-12000` and explicit minRent/maxRent.
    let minRent = num(first(raw.minRent));
    let maxRent = num(first(raw.maxRent));
    const budgetCode = first(raw.budget);
    if (budgetCode && BUDGET_MAP[budgetCode]) {
        minRent = minRent ?? BUDGET_MAP[budgetCode].min;
        maxRent = maxRent ?? BUDGET_MAP[budgetCode].max;
    }
    // Clamp
    if (minRent != null) minRent = Math.max(0, Math.min(50000, Math.floor(minRent)));
    if (maxRent != null) maxRent = Math.max(0, Math.min(50000, Math.floor(maxRent)));
    if (minRent != null && maxRent != null && minRent > maxRent) {
        [minRent, maxRent] = [maxRent, minRent];
    }

    const genderRaw = first(raw.gender);
    const gender = genderRaw && GENDERS.has(genderRaw as Gender)
        ? (genderRaw as Gender)
        : undefined;

    const rating = num(first(raw.rating));
    const distance = num(first(raw.distance));

    const facilitiesRaw = first(raw.facilities);
    const facilities = facilitiesRaw
        ? facilitiesRaw
            .split(',')
            .map((f) => f.trim())
            .filter((f) => FACILITIES.has(f))
        : undefined;

    const availabilityRaw = first(raw.availability);
    const availability = availabilityRaw && AVAILABILITY.has(availabilityRaw as Availability)
        ? (availabilityRaw as Availability)
        : undefined;

    const sortRaw = first(raw.sort);
    const sort = sortRaw && SORTS.has(sortRaw as SortOption)
        ? (sortRaw as SortOption)
        : 'recommended';

    const page = Math.max(1, Math.floor(num(first(raw.page)) ?? 1));

    return {
        q,
        city,
        minRent,
        maxRent,
        gender,
        rating,
        distance,
        facilities,
        availability,
        sort,
        page,
        limit: DEFAULT_LIMIT,
    };
}

/** Serialise filter state → URLSearchParams (omits defaults). */
export function toSearchParams(p: Partial<HostelSearchParams>): URLSearchParams {
    const sp = new URLSearchParams();
    if (p.q) sp.set('q', p.q);
    if (p.city) sp.set('city', p.city);
    if (p.minRent != null) sp.set('minRent', String(p.minRent));
    if (p.maxRent != null) sp.set('maxRent', String(p.maxRent));
    if (p.gender) sp.set('gender', p.gender);
    if (p.rating != null) sp.set('rating', String(p.rating));
    if (p.distance != null) sp.set('distance', String(p.distance));
    if (p.facilities?.length) sp.set('facilities', p.facilities.join(','));
    if (p.availability) sp.set('availability', p.availability);
    if (p.sort && p.sort !== 'recommended') sp.set('sort', p.sort);
    if (p.page && p.page > 1) sp.set('page', String(p.page));
    return sp;
}

export const FACILITY_OPTIONS = [
    { key: 'wifi', label: 'Wi-Fi' },
    { key: 'food', label: 'Food' },
    { key: 'ac', label: 'AC' },
    { key: 'laundry', label: 'Laundry' },
    { key: 'parking', label: 'Parking' },
    { key: 'cctv', label: 'CCTV' },
    { key: 'security24x7', label: '24/7 Security' },
    { key: 'studyRoom', label: 'Study Room' },
] as const;

export const QUICK_BUDGETS = [
    { label: '₹5,000 – ₹8,000', min: 5000, max: 8000 },
    { label: '₹8,000 – ₹12,000', min: 8000, max: 12000 },
    { label: '₹12,000 – ₹18,000', min: 12000, max: 18000 },
    { label: '₹18,000+', min: 18000, max: undefined },
] as const;

export const RATING_OPTIONS = [
    { label: 'Any Rating', value: undefined },
    { label: '4.5+', value: 4.5 },
    { label: '4.0+', value: 4.0 },
    { label: '3.5+', value: 3.5 },
] as const;

export const DISTANCE_OPTIONS = [
    { label: 'Any Distance', value: undefined },
    { label: 'Within 1 km', value: 1 },
    { label: 'Within 3 km', value: 3 },
    { label: 'Within 5 km', value: 5 },
    { label: 'Within 10 km', value: 10 },
] as const;