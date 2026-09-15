import { MapPin, Navigation } from 'lucide-react';
import type { HostelDetails } from '@/lib/types';

export function LocationCard({ hostel }: { hostel: HostelDetails }) {
    const hasCoords =
        typeof hostel.latitude === 'number' && typeof hostel.longitude === 'number';

    return (
        <section className="card-surface p-6">
            <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                Location
            </h2>

            <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                    <div>
                        <p className="font-medium text-slate-900 dark:text-white">
                            {hostel.area}, {hostel.city}
                        </p>
                        <p className="mt-0.5 text-slate-600 dark:text-slate-300">
                            {hostel.address || 'Address not available'}
                        </p>
                    </div>
                </div>

                {hasCoords && (
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Coordinates: {hostel.latitude!.toFixed(5)}, {hostel.longitude!.toFixed(5)}
                    </p>
                )}
            </div>

            {hostel.googleMapsUrl ? (
                <a
                    href={hostel.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-[#111A2E] dark:text-slate-200 dark:hover:bg-slate-800"
                >
                    <Navigation className="h-4 w-4" /> Open in Google Maps
                </a>
            ) : (
                <p className="mt-5 inline-flex items-center gap-2 rounded-xl border border-dashed border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-400 dark:border-slate-700 dark:bg-[#111A2E] dark:text-slate-500">
                    <Navigation className="h-4 w-4" /> Map location unavailable
                </p>
            )}
        </section>
    );
}