import { SearchBox } from './search-box';

export function Hero() {
    return (
        <section className="relative isolate overflow-hidden">
            {/* Background image with overlay */}
            <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=2000&q=70')",
                }}
            />
            <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-gradient-to-b from-white/85 via-white/80 to-white/95 dark:from-[#0B1220]/90 dark:via-[#0B1220]/85 dark:to-[#0B1220]/95"
            />

            <div className="container-page pb-16 pt-16 sm:pb-20 sm:pt-24 lg:pt-28">
                <div className="mx-auto max-w-3xl text-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-700 dark:border-brand-800 dark:bg-brand-900/30 dark:text-brand-300">
                        AI Hostel Finder · Gujarat
                    </span>
                    <h1 className="mt-5 text-balance text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
                        Find the Right Hostel for Your College Life
                    </h1>
                    <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
                        Search, compare and choose trusted hostels based on your budget, location and
                        lifestyle.
                    </p>
                </div>

                <div className="mx-auto mt-10 max-w-5xl">
                    <SearchBox />
                </div>
            </div>
        </section>
    );
}