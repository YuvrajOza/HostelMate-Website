'use client';

import { MessageSquare } from 'lucide-react';
import type { HostelDetails } from '@/lib/types';

export function PriceCard({ hostel }: { hostel: HostelDetails }) {
    const scrollToEnquiry = () => {
        const el = document.getElementById('enquiry');
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="card-surface sticky top-24 p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Monthly Rent
            </p>

            {hostel.monthlyRent ? (
                <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                    ₹{hostel.monthlyRent.toLocaleString('en-IN')}
                    <span className="text-base font-normal text-slate-500 dark:text-slate-400">
                        {' '}/ month
                    </span>
                </p>
            ) : (
                <p className="mt-1 text-lg font-semibold text-slate-500 dark:text-slate-400">
                    Price not available
                </p>
            )}

            <dl className="mt-5 space-y-2.5 text-sm">
                <div className="flex items-center justify-between">
                    <dt className="text-slate-500 dark:text-slate-400">Security Deposit</dt>
                    <dd className="font-medium text-slate-900 dark:text-white">
                        {hostel.securityDeposit != null
                            ? `₹${hostel.securityDeposit.toLocaleString('en-IN')}`
                            : 'Not available'}
                    </dd>
                </div>
                <div className="flex items-center justify-between">
                    <dt className="text-slate-500 dark:text-slate-400">Room Type</dt>
                    <dd className="font-medium text-slate-900 dark:text-white">
                        {hostel.roomType ?? 'Not available'}
                    </dd>
                </div>
                <div className="flex items-center justify-between">
                    <dt className="text-slate-500 dark:text-slate-400">Availability</dt>
                    <dd className="font-medium text-slate-900 dark:text-white">
                        {hostel.availability}
                    </dd>
                </div>
            </dl>

            <button
                type="button"
                onClick={scrollToEnquiry}
                className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
                <MessageSquare className="h-4 w-4" /> Contact Hostel
            </button>

            <p className="mt-3 text-center text-[11px] leading-relaxed text-slate-400 dark:text-slate-500">
                Availability and pricing may change. Confirm details with the hostel before booking.
            </p>
        </div>
    );
}