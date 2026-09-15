export function HostelDetailsSkeleton() {
    return (
        <div className="container-page py-8">
            {/* Breadcrumb */}
            <div className="h-4 w-56 animate-pulse rounded bg-slate-100 dark:bg-slate-800" />

            {/* Gallery */}
            <div className="mt-6 aspect-[16/9] w-full animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800" />

            {/* Header */}
            <div className="mt-6 space-y-3">
                <div className="h-8 w-2/3 animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
                <div className="h-4 w-1/3 animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
                <div className="flex gap-2">
                    <div className="h-6 w-24 animate-pulse rounded-full bg-slate-100 dark:bg-slate-800" />
                    <div className="h-6 w-32 animate-pulse rounded-full bg-slate-100 dark:bg-slate-800" />
                </div>
            </div>

            {/* Action row */}
            <div className="mt-5 flex flex-wrap gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div
                        key={i}
                        className="h-10 w-28 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800"
                    />
                ))}
            </div>

            {/* Body: main + sidebar */}
            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
                <div className="space-y-6">
                    <div className="card-surface h-56 animate-pulse p-6" />
                    <div className="card-surface h-56 animate-pulse p-6" />
                    <div className="card-surface h-56 animate-pulse p-6" />
                </div>
                <div className="space-y-6">
                    <div className="card-surface h-64 animate-pulse p-6" />
                    <div className="card-surface h-40 animate-pulse p-6" />
                </div>
            </div>
        </div>
    );
}