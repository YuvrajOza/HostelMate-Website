import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const CITIES = ['Ahmedabad', 'Anand', 'Vadodara'] as const;
export type City = (typeof CITIES)[number];

export const BUDGETS = [
    { label: 'Any Budget', value: '' },
    { label: '₹5,000 - ₹8,000', value: '5000-8000' },
    { label: '₹8,000 - ₹12,000', value: '8000-12000' },
    { label: '₹12,000 - ₹18,000', value: '12000-18000' },
    { label: '₹18,000+', value: '18000-plus' },
] as const;

export const ACCOMMODATIONS = [
    { label: 'Any', value: '' },
    { label: 'Boys', value: 'Boys' },
    { label: 'Girls', value: 'Girls' },
    { label: 'Co-ed', value: 'Co-ed' },
] as const;

export function buildHostelsUrl(params: {
    query?: string;
    city?: string;
    budget?: string;
    gender?: string;
}) {
    const sp = new URLSearchParams();
    if (params.query?.trim()) sp.set('q', params.query.trim());
    if (params.city) sp.set('city', params.city);
    if (params.budget) sp.set('budget', params.budget);
    if (params.gender) sp.set('gender', params.gender);
    const qs = sp.toString();
    return qs ? `/hostels?${qs}` : '/hostels';
}