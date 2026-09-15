import { HostelListSkeleton } from '@/components/hostel-skeletons';

export default function Loading() {
    return (
        <div className="container-page py-10">
            <div className="mb-6 h-8 w-56 animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
            <HostelListSkeleton />
        </div>
    );
}