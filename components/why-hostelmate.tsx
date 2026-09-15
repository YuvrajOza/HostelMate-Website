import { Search, Scale, Star, Sparkles } from 'lucide-react';
import type { ReactNode } from 'react';

const FEATURES: { icon: ReactNode; title: string; description: string }[] = [
    {
        icon: <Search className="h-5 w-5" />,
        title: 'Smart Search',
        description: 'Find hostels using location, budget, facilities and preferences.',
    },
    {
        icon: <Scale className="h-5 w-5" />,
        title: 'Compare',
        description: 'Compare multiple hostels side-by-side before making a decision.',
    },
    {
        icon: <Star className="h-5 w-5" />,
        title: 'Trusted Information',
        description: 'Make better decisions using ratings, reviews and verified information.',
    },
    {
        icon: <Sparkles className="h-5 w-5" />,
        title: 'Smart Recommendations',
        description: 'Get hostel recommendations based on your personal requirements.',
    },
];

export function WhyHostelMate() {
    return (
        <section className="border-y border-slate-200/70 bg-white/60 dark:border-slate-800 dark:bg-[#0B1220]/60">
            <div className="container-page py-16 sm:py-20">
                <header className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                        Why Students Choose HostelMate
                    </h2>
                    <p className="mt-3 text-slate-600 dark:text-slate-300">
                        A modern way to discover student accommodation that actually fits your life.
                    </p>
                </header>

                <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {FEATURES.map((f) => (
                        <article key={f.title} className="card-surface p-6">
                            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-300">
                                {f.icon}
                            </span>
                            <h3 className="mt-4 text-base font-semibold tracking-tight text-slate-900 dark:text-white">
                                {f.title}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                                {f.description}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}