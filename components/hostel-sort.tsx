'use client';

import type { SortOption } from '@/lib/types';

const OPTIONS: { value: SortOption; label: string }[] = [
    { value: 'recommended', label: 'Recommended' },
    { value: 'highest-rated', label: 'Highest Rated' },
    { value: 'most-reviewed', label: 'Most Reviewed' },
    { value: 'lowest-rent', label: 'Lowest Rent' },
    { value: 'highest-rent', label: 'Highest Rent' },
    { value: 'nearest', label: 'Nearest' },
];

export function HostelSort({
    value,
    onChange,
}: {
    value: SortOption;
    onChange: (v: SortOption) => void;
}) {
    return (
        <label className="inline-flex items-center gap-2 text-sm">
            <span className="text-slate-500 dark:text-slate-400">Sort by</span>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value as SortOption)}
                className="h-10 rounded-lg border border-slate-200 bg-white px-3 pr-8 text-sm font-medium text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-[#0B1220] dark:text-white"
            >
                {OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                        {o.label}
                    </option>
                ))}
            </select>
        </label>
    );
}