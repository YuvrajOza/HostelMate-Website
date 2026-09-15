'use client';

import { Share2, Phone, GitCompare } from 'lucide-react';
import type { HostelDetails } from '@/lib/types';
import { useCompare } from '@/lib/compare-store';

export function ActionButtons({ hostel }: { hostel: HostelDetails }) {
    const { ids, toggle } = useCompare();
    const isCompared = ids.includes(hostel.id);

    return (
        <div className="mt-4 flex flex-wrap items-center gap-3">
            {hostel.phone && (
                <a
                    href={`tel:${hostel.phone}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600"
                >
                    <Phone className="h-4 w-4" /> Call Hostel
                </a>
            )}
            <button
                type="button"
                onClick={() => toggle(hostel.id)}
                className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-colors ${
                    isCompared
                        ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800'
                }`}
            >
                <GitCompare className="h-4 w-4" />
                {isCompared ? 'Remove from Compare' : 'Add to Compare'}
            </button>
            <button
                type="button"
                onClick={() => {
                    if (typeof window !== 'undefined' && navigator.share) {
                        navigator.share({
                            title: hostel.name,
                            url: window.location.href,
                        }).catch(() => {});
                    } else if (typeof window !== 'undefined') {
                        navigator.clipboard.writeText(window.location.href);
                    }
                }}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
                <Share2 className="h-4 w-4" /> Share
            </button>
        </div>
    );
}