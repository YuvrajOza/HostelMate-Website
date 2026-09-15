import { MapPin, ShieldAlert, ShieldCheck, Star } from 'lucide-react';
import type { HostelDetails } from '@/lib/types';

export function HostelHeader({ hostel }: { hostel: HostelDetails }) {
    const verified = hostel.verificationStatus === 'verified';

    return (
        <header className="mt-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                        {hostel.name}
                    </h1>

                    <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300">
                        <MapPin className="h-4 w-4" />
                        <span>{hostel.area}, {hostel.city}</span>
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                        {hostel.googleRating != null ? (
                            <span className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-2.5 py-1 text-sm font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
                                <Star className="h-3.5 w-3.5 fill-current" />
                                {hostel.googleRating.toFixed(1)}
                                <span className="text-xs font-normal text-amber-700/80 dark:text-amber-300/80">
                                    Google Rating
                                </span>
                            </span>
                        ) : (
                            <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                                No Google rating available
                            </span>
                        )}

                        {hostel.googleReviewCount != null && (
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                                {hostel.googleReviewCount} Google Reviews
                            </span>
                        )}

                        {verified ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                                <ShieldCheck className="h-3.5 w-3.5" /> Verified Information
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
                                <ShieldAlert className="h-3.5 w-3.5" /> Verification Pending
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}