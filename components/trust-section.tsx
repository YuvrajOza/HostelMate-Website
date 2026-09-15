import { Check } from 'lucide-react';

const POINTS = [
    'Location-based search',
    'Budget-based filtering',
    'Hostel comparison',
    'Ratings & reviews',
    'Safety information',
];

export function TrustSection() {
    return (
        <section className="border-t border-slate-200/70 bg-white/60 dark:border-slate-800 dark:bg-[#0B1220]/60">
            <div className="container-page py-14 sm:py-16">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                        Built to make hostel searching easier for students.
                    </h2>
                </div>
                <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-3">
                    {POINTS.map((p) => (
                        <li
                            key={p}
                            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-[#111A2E] dark:text-slate-200"
                        >
                            <Check className="h-4 w-4 text-emerald-500" />
                            {p}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}