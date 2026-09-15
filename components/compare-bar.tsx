'use client';

import Link from 'next/link';
import { Scale, X } from 'lucide-react';
import { useCompare } from '@/lib/compare-store';

export function CompareBar() {
    const { ids, remove, clear } = useCompare();
    if (ids.length === 0) return null;

    return (
        <div className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4">
            <div className="pointer-events-auto flex w-full max-w-2xl items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-card dark:border-slate-700 dark:bg-[#111A2E]">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-300">
                    <Scale className="h-4 w-4" />
                </span>
                <p className="flex-1 text-sm font-medium text-slate-700 dark:text-slate-200">
                    {ids.length} {ids.length === 1 ? 'hostel' : 'hostels'} selected
                </p>
                <button
                    type="button"
                    onClick={clear}
                    className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                    aria-label="Clear comparison"
                >
                    <X className="h-4 w-4" />
                </button>
                <Link
                    href="/compare"
                    className="inline-flex h-9 items-center rounded-xl bg-brand-600 px-4 text-sm font-semibold text-white hover:bg-brand-700"
                >
                    Compare Now
                </Link>
            </div>
        </div>
    );
}