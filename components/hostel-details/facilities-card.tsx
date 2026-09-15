import {
    BookOpen,
    Car,
    Cctv,
    Shield,
    Utensils,
    WashingMachine,
    Wifi,
    Wind,
} from 'lucide-react';
import type { HostelDetails } from '@/lib/types';

const FACILITIES: {
    key: keyof HostelDetails;
    label: string;
    icon: React.ReactNode;
}[] = [
        { key: 'wifi', label: 'Wi-Fi', icon: <Wifi className="h-4 w-4" /> },
        { key: 'food', label: 'Food', icon: <Utensils className="h-4 w-4" /> },
        { key: 'ac', label: 'AC', icon: <Wind className="h-4 w-4" /> },
        { key: 'laundry', label: 'Laundry', icon: <WashingMachine className="h-4 w-4" /> },
        { key: 'parking', label: 'Parking', icon: <Car className="h-4 w-4" /> },
        { key: 'cctv', label: 'CCTV', icon: <Cctv className="h-4 w-4" /> },
        { key: 'security24x7', label: '24/7 Security', icon: <Shield className="h-4 w-4" /> },
        { key: 'studyRoom', label: 'Study Room', icon: <BookOpen className="h-4 w-4" /> },
    ];

export function FacilitiesCard({ hostel }: { hostel: HostelDetails }) {
    const available = FACILITIES.filter((f) => Boolean(hostel[f.key]));

    return (
        <section className="card-surface p-6">
            <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                Facilities &amp; Amenities
            </h2>

            {available.length === 0 ? (
                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                    Facility information is not available for this hostel.
                </p>
            ) : (
                <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {available.map((f) => (
                        <li
                            key={f.key}
                            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-[#0B1220] dark:text-slate-200"
                        >
                            <span className="text-brand-600 dark:text-brand-400">{f.icon}</span>
                            {f.label}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}