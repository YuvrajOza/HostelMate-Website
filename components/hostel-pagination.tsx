'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function HostelPagination({
    page,
    totalPages,
    onChange,
}: {
    page: number;
    totalPages: number;
    onChange: (p: number) => void;
}) {
    if (totalPages <= 1) return null;

    const pages = buildRange(page, totalPages);

    return (
        <nav className="mt-8 flex items-center justify-center gap-1" aria-label="Pagination">
            <button
                type="button"
                onClick={() => onChange(page - 1)}
                disabled={page <= 1}
                className="inline-flex h-9 items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-[#111A2E] dark:text-slate-200"
            >
                <ChevronLeft className="h-4 w-4" />
                Previous
            </button>

            {pages.map((p, i) =>
                p === '…' ? (
                    <span key={`e${i}`} className="px-2 text-slate-400">
                        …
                    </span>
                ) : (
                    <button
                        key={p}
                        type="button"
                        onClick={() => onChange(p)}
                        className={cn(
                            'h-9 min-w-9 rounded-lg px-3 text-sm font-medium',
                            p === page
                                ? 'bg-brand-600 text-white'
                                : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-[#111A2E] dark:text-slate-200',
                        )}
                    >
                        {p}
                    </button>
                ),
            )}

            <button
                type="button"
                onClick={() => onChange(page + 1)}
                disabled={page >= totalPages}
                className="inline-flex h-9 items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-[#111A2E] dark:text-slate-200"
            >
                Next
                <ChevronRight className="h-4 w-4" />
            </button>
        </nav>
    );
}

function buildRange(current: number, total: number): (number | '…')[] {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const out: (number | '…')[] = [1];
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    if (start > 2) out.push('…');
    for (let i = start; i <= end; i++) out.push(i);
    if (end < total - 1) out.push('…');
    out.push(total);
    return out;
}