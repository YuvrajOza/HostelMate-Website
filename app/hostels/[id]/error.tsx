'use client';

import Link from 'next/link';

export default function Error({ reset }: { reset: () => void }) {
    return (
        <div className="container-page py-20">
            <div className="card-surface mx-auto max-w-lg p-8 text-center">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Unable to load hostel information.
                </h1>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                    Something went wrong. Please try again.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                    <button
                        type="button"
                        onClick={reset}
                        className="inline-flex h-11 items-center rounded-xl bg-brand-600 px-5 text-sm font-semibold text-white hover:bg-brand-700"
                    >
                        Try Again
                    </button>
                    <Link
                        href="/hostels"
                        className="inline-flex h-11 items-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-[#111A2E] dark:text-slate-200"
                    >
                        Back to Hostels
                    </Link>
                </div>
            </div>
        </div>
    );
}