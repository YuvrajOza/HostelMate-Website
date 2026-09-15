import Link from 'next/link';

const STEPS = [
    {
        number: '01',
        title: 'Search',
        description: 'Tell us your city, college, budget and preferences.',
    },
    {
        number: '02',
        title: 'Compare',
        description: 'Compare ratings, prices, facilities and locations.',
    },
    {
        number: '03',
        title: 'Choose',
        description: 'Select the hostel that best matches your requirements.',
    },
];

export function HowItWorks() {
    return (
        <section className="container-page py-16 sm:py-20">
            <header className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                    How HostelMate Works
                </h2>
                <p className="mt-3 text-slate-600 dark:text-slate-300">
                    Three simple steps from searching to settling in.
                </p>
            </header>

            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
                {STEPS.map((s) => (
                    <article key={s.number} className="card-surface relative p-6">
                        <span className="text-3xl font-bold tracking-tight text-brand-600/30 dark:text-brand-400/30">
                            {s.number}
                        </span>
                        <h3 className="mt-2 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                            {s.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                            {s.description}
                        </p>
                    </article>
                ))}
            </div>

            <div className="mt-10 flex justify-center">
                <Link
                    href="/hostels"
                    className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 focus-ring"
                >
                    Start Searching
                </Link>
            </div>
        </section>
    );
}