'use client';

import { HostelCard } from '@/components/hostel-card';
import { useCompare } from '@/lib/compare-store';
import type { Hostel } from '@/lib/types';

export function SimilarHostels({ hostels }: { hostels: Hostel[] }) {
    const { ids: compareIds, toggle: toggleCompare } = useCompare();
    const compareSet = new Set(compareIds);

    if (hostels.length === 0) return null;

    return (
        <section className="mt-12">
            <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
                Similar Hostels
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Other hostels in the same city.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
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
        </section>
    );
}