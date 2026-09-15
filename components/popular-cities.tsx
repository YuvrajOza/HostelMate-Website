import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';

const CITY_CARDS = [
    {
        city: 'Ahmedabad',
        description:
            'Find student hostels and PGs near major colleges and universities.',
    },
    {
        city: 'Anand',
        description: 'Discover student accommodation around Anand and Vallabh Vidyanagar.',
    },
    {
        city: 'Vadodara',
        description: "Explore hostels and PGs near Vadodara's major educational areas.",
    },
];

export function PopularCities() {
    return (
        <section className="container-page py-16 sm:py-20">
            <header className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                    Explore Popular Cities
                </h2>
                <p className="mt-3 text-slate-600 dark:text-slate-300">
                    Discover student accommodation in Gujarat&apos;s leading education hubs.
                </p>
            </header>

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {CITY_CARDS.map((c) => (
                    <Link
                        key={c.city}
                        href={`/hostels?city=${encodeURIComponent(c.city)}`}
                        className="group card-surface flex flex-col p-6 transition hover:-translate-y-0.5 hover:shadow-card focus-ring"
                    >
                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-300">
                            <MapPin className="h-5 w-5" />
                        </span>
                        <h3 className="mt-4 text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
                            {c.city}
                        </h3>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                            {c.description}
                        </p>
                        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition group-hover:gap-3 dark:text-brand-400">
                            Explore Hostels
                            <ArrowRight className="h-4 w-4" />
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
}