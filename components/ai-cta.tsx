import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export function AiCta() {
    return (
        <section className="container-page py-16 sm:py-20">
            <div className="relative overflow-hidden rounded-3xl border border-brand-200/60 bg-gradient-to-br from-brand-50 via-white to-brand-50 p-8 shadow-soft dark:border-brand-900/40 dark:from-brand-950/40 dark:via-[#0B1220] dark:to-brand-950/40 sm:p-12">
                <div className="mx-auto max-w-2xl text-center">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-sm">
                        <Sparkles className="h-6 w-6" />
                    </span>
                    <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                        Not sure which hostel is right for you?
                    </h2>
                    <p className="mt-3 text-slate-600 dark:text-slate-300">
                        Tell HostelMate what you need and get personalized hostel recommendations.
                    </p>
                    <Link
                        href="/recommend"
                        className="mt-6 inline-flex h-12 items-center justify-center rounded-xl bg-brand-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 focus-ring"
                    >
                        Get My Recommendation
                    </Link>
                </div>
            </div>
        </section>
    );
}