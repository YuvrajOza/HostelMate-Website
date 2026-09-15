import { AlertTriangle, Check, ShieldCheck } from 'lucide-react';
import type { HostelDetails } from '@/lib/types';

export function SafetyCard({ hostel }: { hostel: HostelDetails }) {
    const verified = hostel.verificationStatus === 'verified';

    const checks = [
        { label: 'Address', ok: Boolean(hostel.address) },
        { label: 'Phone', ok: Boolean(hostel.phone) },
        { label: 'Website', ok: Boolean(hostel.website) },
        {
            label: 'Location',
            ok:
                typeof hostel.latitude === 'number' &&
                typeof hostel.longitude === 'number',
        },
    ];

    return (
        <section className="card-surface p-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                <ShieldCheck className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                Safety &amp; Verification
            </h2>

            <div className="mt-4 flex items-center gap-2">
                {verified ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                        <Check className="h-3.5 w-3.5" /> Verified Information
                    </span>
                ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
                        <AlertTriangle className="h-3.5 w-3.5" /> Verification Pending
                    </span>
                )}
            </div>

            <ul className="mt-5 space-y-2 text-sm">
                {checks.map((c) => (
                    <li key={c.label} className="flex items-center gap-2.5">
                        {c.ok && verified ? (
                            <>
                                <Check className="h-4 w-4 text-emerald-500" />
                                <span className="text-slate-700 dark:text-slate-200">
                                    {c.label} verified
                                </span>
                            </>
                        ) : (
                            <>
                                <AlertTriangle className="h-4 w-4 text-amber-500" />
                                <span className="text-slate-600 dark:text-slate-300">
                                    {c.label} verification pending
                                </span>
                            </>
                        )}
                    </li>
                ))}
            </ul>

            <p className="mt-5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                Always confirm pricing, availability and facilities directly with the hostel
                before booking.
            </p>
        </section>
    );
}