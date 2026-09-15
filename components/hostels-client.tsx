'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Filter, Search } from 'lucide-react';
import { HostelFilters } from './hostel-filters';
import { HostelSort } from './hostel-sort';
import { HostelPagination } from './hostel-pagination';
import { HostelCard } from './hostel-card';
import { HostelListSkeleton } from './hostel-skeletons';
import { CompareBar } from './compare-bar';
import { Drawer } from './ui/drawer';
import { toast } from './ui/toast';
import { useCompare } from '@/lib/compare-store';
import { parseSearchParams, toSearchParams } from '@/lib/hostels/filters';
import type { HostelSearchResult, HostelSearchParams } from '@/lib/types';

export function HostelsClient() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [filters, setFilters] = useState<HostelSearchParams>(() =>
        parseSearchParams(Object.fromEntries(searchParams.entries())),
    );
    const [searchInput, setSearchInput] = useState(filters.q ?? '');
    const [result, setResult] = useState<HostelSearchResult | null>(null);
    const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'ready'>('idle');
    const [drawerOpen, setDrawerOpen] = useState(false);

    const { ids: compareIds, toggle: toggleCompare } = useCompare();
    const compareSet = useMemo(() => new Set(compareIds), [compareIds]);

    const requestId = useRef(0);

    /** Fetch results whenever filters change. */
    useEffect(() => {
        const id = ++requestId.current;
        setStatus('loading');
        const sp = toSearchParams(filters);
        const ac = new AbortController();

        fetch(`/api/hostels?${sp.toString()}`, { signal: ac.signal })
            .then(async (res) => {
                if (!res.ok) throw new Error('request failed');
                return (await res.json()) as HostelSearchResult;
            })
            .then((json) => {
                if (id !== requestId.current) return;
                setResult(json);
                setStatus('ready');
            })
            .catch((err: unknown) => {
                if ((err as { name?: string })?.name === 'AbortError') return;
                if (id !== requestId.current) return;
                setStatus('error');
            });

        return () => ac.abort();
    }, [filters]);

    /** Sync filters → URL (replace, so back button isn't spammed). */
    useEffect(() => {
        const sp = toSearchParams(filters).toString();
        const target = sp ? `${pathname}?${sp}` : pathname;
        router.replace(target, { scroll: false });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);

    /** Keep search input in sync with filters.q (e.g. on clear). */
    useEffect(() => {
        setSearchInput(filters.q ?? '');
    }, [filters.q]);

    const update = useCallback((patch: Partial<HostelSearchParams>) => {
        setFilters((prev) => ({ ...prev, ...patch }));
    }, []);

    const onSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        update({ q: searchInput.trim() || undefined, page: 1 });
    };

    const onClear = () => {
        setSearchInput('');
        setFilters((prev) => ({
            sort: 'recommended',
            page: 1,
            limit: prev.limit,
        }));
        toast('Filters cleared');
    };

    const changePage = (p: number) => {
        update({ page: p });
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const retry = () => setFilters((prev) => ({ ...prev }));

    const total = result?.total ?? 0;
    const totalPages = result?.totalPages ?? 0;
    const hostels = result?.data ?? [];
    const loading = status === 'loading' || status === 'idle';

    return (
        <div className="container-page py-8 sm:py-10">
            {/* Header */}
            <header className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                    Find the Best Hostels
                </h1>
                <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-300">
                    Search and filter hostels based on your location, budget and preferences.
                </p>
            </header>

            {/* Search bar */}
            <form onSubmit={onSearchSubmit} className="mb-6">
                <div className="relative">
                    <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Search by hostel, city, area or college..."
                        aria-label="Search hostels"
                        className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-28 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-[#0B1220] dark:text-white dark:placeholder:text-slate-500"
                    />
                    <button
                        type="submit"
                        className="absolute right-1.5 top-1.5 inline-flex h-9 items-center rounded-lg bg-brand-600 px-4 text-sm font-semibold text-white hover:bg-brand-700"
                    >
                        Search
                    </button>
                </div>
            </form>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
                {/* Desktop sidebar */}
                <aside className="hidden lg:block">
                    <div className="sticky top-24 card-surface p-5">
                        <HostelFilters value={filters} onChange={update} onClear={onClear} />
                    </div>
                </aside>

                {/* Results */}
                <section>
                    {/* Result header row */}
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setDrawerOpen(true)}
                                className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 lg:hidden dark:border-slate-700 dark:bg-[#111A2E] dark:text-slate-200"
                            >
                                <Filter className="h-4 w-4" /> Filters
                            </button>
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                {loading ? 'Searching…' : `${total} ${total === 1 ? 'Hostel' : 'Hostels'} Found`}
                            </p>
                        </div>

                        <HostelSort
                            value={filters.sort ?? 'recommended'}
                            onChange={(sort) => update({ sort, page: 1 })}
                        />
                    </div>

                    {/* Body */}
                    {loading && <HostelListSkeleton count={6} />}

                    {!loading && status === 'error' && (
                        <ErrorState onRetry={retry} />
                    )}

                    {!loading && status === 'ready' && hostels.length === 0 && (
                        <EmptyState onClear={onClear} />
                    )}

                    {!loading && status === 'ready' && hostels.length > 0 && (
                        <>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                                {hostels.map((h) => (
                                    <HostelCard
                                        key={h.id}
                                        hostel={h}
                                        selectedForCompare={compareSet.has(h.id)}
                                        onToggleCompare={toggleCompare}
                                        compareDisabled={compareIds.length >= 3}
                                    />
                                ))}
                            </div>

                            <HostelPagination
                                page={result?.page ?? 1}
                                totalPages={totalPages}
                                onChange={changePage}
                            />
                        </>
                    )}
                </section>
            </div>

            {/* Mobile drawer */}
            <Drawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                title="Filters"
                footer={
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={onClear}
                            className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:bg-[#111A2E] dark:text-slate-200"
                        >
                            Clear
                        </button>
                        <button
                            type="button"
                            onClick={() => setDrawerOpen(false)}
                            className="flex-1 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
                        >
                            Show {total} results
                        </button>
                    </div>
                }
            >
                <HostelFilters value={filters} onChange={update} onClear={onClear} />
            </Drawer>

            <CompareBar />
        </div>
    );
}

function EmptyState({ onClear }: { onClear: () => void }) {
    return (
        <div className="card-surface flex flex-col items-center px-6 py-16 text-center">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
                <Search className="h-6 w-6" />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                No hostels found
            </h2>
            <p className="mt-2 max-w-md text-sm text-slate-600 dark:text-slate-300">
                Try changing your filters or search for another location.
            </p>
            <button
                type="button"
                onClick={onClear}
                className="mt-5 inline-flex h-10 items-center rounded-xl bg-brand-600 px-5 text-sm font-semibold text-white hover:bg-brand-700"
            >
                Clear Filters
            </button>
        </div>
    );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
    return (
        <div className="card-surface flex flex-col items-center px-6 py-16 text-center">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Unable to load hostels.
            </h2>
            <p className="mt-2 max-w-md text-sm text-slate-600 dark:text-slate-300">
                Something went wrong while contacting the server. Please try again.
            </p>
            <button
                type="button"
                onClick={onRetry}
                className="mt-5 inline-flex h-10 items-center rounded-xl bg-brand-600 px-5 text-sm font-semibold text-white hover:bg-brand-700"
            >
                Try Again
            </button>
        </div>
    );
}