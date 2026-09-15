import { Star } from 'lucide-react';
import type { HostelDetails } from '@/lib/types';

export function ReviewsCard({ hostel }: { hostel: HostelDetails }) {
    const { reviews, reviewAverage, reviewCount } = hostel;

    return (
        <section className="card-surface p-6">
            <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                HostelMate Reviews
            </h2>

            {reviewCount === 0 ? (
                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                    No HostelMate reviews yet.
                </p>
            ) : (
                <>
                    <div className="mt-4 flex items-center gap-4">
                        <div className="flex items-center gap-1.5 rounded-xl bg-amber-50 px-3 py-2 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="text-lg font-bold">
                                {reviewAverage!.toFixed(1)}
                            </span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                            Based on {reviewCount}{' '}
                            {reviewCount === 1 ? 'review' : 'reviews'}
                        </p>
                    </div>

                    <ul className="mt-6 space-y-5">
                        {reviews.map((r) => (
                            <li
                                key={r.id}
                                className="border-t border-slate-200 pt-5 first:border-t-0 first:pt-0 dark:border-slate-800"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                                        Student
                                    </p>
                                    <span className="text-xs text-slate-500 dark:text-slate-400">
                                        {new Date(r.createdAt).toLocaleDateString('en-IN', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                        })}
                                    </span>
                                </div>
                                <div className="mt-1 flex items-center gap-0.5">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                            key={i}
                                            className={
                                                i < r.rating
                                                    ? 'h-3.5 w-3.5 fill-current text-amber-500'
                                                    : 'h-3.5 w-3.5 text-slate-300 dark:text-slate-600'
                                            }
                                        />
                                    ))}
                                </div>
                                {r.comment && (
                                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                                        {r.comment}
                                    </p>
                                )}
                            </li>
                        ))}
                    </ul>
                </>
            )}

            <p className="mt-5 text-xs text-slate-500 dark:text-slate-400">
                Google ratings and HostelMate reviews are shown separately.
            </p>
        </section>
    );
}