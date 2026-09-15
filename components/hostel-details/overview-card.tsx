import { BedDouble, Building2, CalendarCheck, IndianRupee, ShieldCheck, Users } from 'lucide-react';
import type { HostelDetails } from '@/lib/types';

const NA = 'Not available';

export function OverviewCard({ hostel }: { hostel: HostelDetails }) {
    const rows: { label: string; value: string; icon: React.ReactNode }[] = [
        { label: 'Gender', value: hostel.gender, icon: <Users className="h-4 w-4" /> },
        {
            label: 'Hostel Type',
            value: hostel.hostelType ?? NA,
            icon: <Building2 className="h-4 w-4" />,
        },
        {
            label: 'Room Type',
            value: hostel.roomType ?? NA,
            icon: <BedDouble className="h-4 w-4" />,
        },
        {
            label: 'Monthly Rent',
            value: `₹${hostel.monthlyRent.toLocaleString('en-IN')}`,
            icon: <IndianRupee className="h-4 w-4" />,
        },
        {
            label: 'Security Deposit',
            value:
                hostel.securityDeposit != null
                    ? `₹${hostel.securityDeposit.toLocaleString('en-IN')}`
                    : NA,
            icon: <ShieldCheck className="h-4 w-4" />,
        },
        { label: 'Availability', value: hostel.availability, icon: <CalendarCheck className="h-4 w-4" /> },
    ];

    return (
        <section className="card-surface p-6">
            <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                About this Hostel
            </h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {hostel.description?.trim() || 'No description available.'}
            </p>

            <dl className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                {rows.map((r) => (
                    <div key={r.label} className="flex items-start gap-3">
                        <span className="mt-0.5 grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                            {r.icon}
                        </span>
                        <div>
                            <dt className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                {r.label}
                            </dt>
                            <dd className="text-sm font-semibold text-slate-900 dark:text-white">
                                {r.value}
                            </dd>
                        </div>
                    </div>
                ))}
            </dl>
        </section>
    );
}