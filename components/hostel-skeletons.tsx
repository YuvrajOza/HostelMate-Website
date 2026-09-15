export function HostelCardSkeleton() {
    return (
        <div className="card-surface overflow-hidden">
            <div className="aspect-[16/9] w-full animate-pulse bg-slate-100 dark:bg-slate-800" />
            <div className="space-y-3 p-5">
                <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
                <div className="h-6 w-1/3 animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
                <div className="flex gap-2">
                    <div className="h-6 w-16 animate-pulse rounded-full bg-slate-100 dark:bg-slate-800" />
                    <div className="h-6 w-16 animate-pulse rounded-full bg-slate-100 dark:bg-slate-800" />
                    <div className="h-6 w-16 animate-pulse rounded-full bg-slate-100 dark:bg-slate-800" />
                </div>
                <div className="h-10 w-full animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />
            </div>
        </div>
    );
}

export function HostelListSkeleton({ count = 6 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: count }).map((_, i) => (
                <HostelCardSkeleton key={i} />
            ))}
        </div>
    );
}