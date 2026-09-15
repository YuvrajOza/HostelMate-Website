import type { HostelDetails } from '@/lib/types';

const MAP: Record<
    HostelDetails['availability'],
    { dot: string; label: string; tone: string }
> = {
    Available: {
        dot: 'bg-emerald-500',
        label: 'Available',
        tone: 'text-emerald-700 dark:text-emerald-300',
    },
    Limited: {
        dot: 'bg-amber-500',
        label: 'Limited Availability',
        tone: 'text-amber-700 dark:text-amber-300',
    },
    'Not Available': {
        dot: 'bg-rose-500',
        label: 'Not Available',
        tone: 'text-rose-700 dark:text-rose-300',
    },
};

export function AvailabilityCard({ hostel }: { hostel: HostelDetails }) {
    const info = MAP[hostel.availability] ?? MAP['Not Available'];

    return (
        <section className="card-surface p-6">
            <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                Availability
            </h2>

            <div className="mt-4 flex items-center gap-3">
                <span
                    aria-hidden
                    className={`h-2.5 w-2.5 shrink-0 rounded-full ${info.dot}`}
                />
                <span className={`text-sm font-semibold ${info.tone}`}>{info.label}</span>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                Availability may change. Contact the hostel to confirm.
            </p>
        </section>
    );
}