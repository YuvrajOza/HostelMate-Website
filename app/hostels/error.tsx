'use client';

export default function Error({
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="container-page py-20">
            <div className="card-surface mx-auto max-w-lg p-8 text-center">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Unable to load hostels.
                </h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    Something went wrong. Please try again.
                </p>
                <button
                    onClick={reset}
                    className="mt-5 inline-flex h-10 items-center rounded-xl bg-brand-600 px-5 text-sm font-semibold text-white hover:bg-brand-700"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
}