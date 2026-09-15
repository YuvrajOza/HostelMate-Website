'use client';

import { useState } from 'react';
import {
    BedDouble,
    Building2,
    Check,
    ExternalLink,
    Heart,
    MapPin,
    Phone,
    Scale,
    ShieldCheck,
    Star,
    Utensils,
    Wifi,
    Wind,
    WashingMachine,
    Car,
    Cctv,
    Shield,
    BookOpen,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/toast';
import type { Hostel } from '@/lib/types';
import Link from 'next/link';

interface Props {
    hostel: Hostel;
    selectedForCompare: boolean;
    onToggleCompare: (id: string) => void;
    compareDisabled?: boolean;
    initialSaved?: boolean;
}

const NA = 'Not available';

export function HostelCard({
    hostel,
    selectedForCompare,
    onToggleCompare,
    compareDisabled,
    initialSaved = false,
}: Props) {
    const [saved, setSaved] = useState(initialSaved);

    const facilities = pickFacilities(hostel);
    const hasRating = hostel.googleRating != null;
    const hasReviews = hostel.googleReviewCount != null;

    const handleSave = () => {
        setSaved((s) => {
            toast(!s ? 'Saved to favourites' : 'Removed from favourites');
            return !s;
        });
    };

    const handleCompare = () => {
        if (!selectedForCompare && compareDisabled) {
            toast('You can compare up to 3 hostels');
            return;
        }
        onToggleCompare(hostel.id);
    };

    const image = hostel.images[0];

    return (
        <article className="card-surface overflow-hidden">
            {/* Image */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                {image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={image}
                        alt={hostel.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-400">
                        <Building2 className="h-10 w-10" />
                    </div>
                )}

                {hostel.verificationStatus === 'verified' && (
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-emerald-600/95 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
                        <ShieldCheck className="h-3.5 w-3.5" /> Verified
                    </span>
                )}

                <span
                    className={cn(
                        'absolute right-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-sm',
                        hostel.availability === 'Available' &&
                        'bg-emerald-600/95 text-white',
                        hostel.availability === 'Limited' && 'bg-amber-500/95 text-white',
                        hostel.availability === 'Not Available' &&
                        'bg-slate-600/95 text-white',
                    )}
                >
                    {hostel.availability}
                </span>
            </div>

            {/* Body */}
            <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <h3 className="truncate text-base font-semibold tracking-tight text-slate-900 dark:text-white">
                            {hostel.name}
                        </h3>
                        <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                            <MapPin className="h-3.5 w-3.5" />
                            <span className="truncate">
                                {hostel.area}, {hostel.city}
                            </span>
                        </p>
                    </div>

                    {hasRating ? (
                        <div className="shrink-0 text-right">
                            <span className="inline-flex items-center gap-1 rounded-lg bg-amber-50 px-2 py-1 text-sm font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
                                <Star className="h-3.5 w-3.5 fill-current" />
                                {hostel.googleRating!.toFixed(1)}
                            </span>
                            <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                                {hasReviews ? `${hostel.googleReviewCount} reviews` : NA}
                            </p>
                        </div>
                    ) : (
                        <span className="shrink-0 rounded-lg bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                            No rating
                        </span>
                    )}
                </div>

                {/* Address */}
                <p className="mt-3 line-clamp-1 text-xs text-slate-500 dark:text-slate-400">
                    {hostel.address || NA}
                </p>

                {/* Rent + meta */}
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <div>
                        <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                            ₹{hostel.monthlyRent.toLocaleString('en-IN')}
                        </span>
                        <span className="text-sm text-slate-500 dark:text-slate-400"> / month</span>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        {hostel.gender}
                    </span>
                    {hostel.roomType && (
                        <span className="inline-flex items-center gap-1 text-xs text-slate-600 dark:text-slate-300">
                            <BedDouble className="h-3.5 w-3.5" /> {hostel.roomType}
                        </span>
                    )}
                </div>

                {/* Facilities */}
                {facilities.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-2">
                        {facilities.map((f) => (
                            <li
                                key={f.label}
                                className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:border-slate-700 dark:bg-[#0B1220] dark:text-slate-300"
                            >
                                <Check className="h-3 w-3 text-emerald-500" />
                                {f.label}
                            </li>
                        ))}
                    </ul>
                )}

                {/* Contact row */}
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                    {hostel.phone ? (
                        <a
                            href={`tel:${hostel.phone}`}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                        >
                            <Phone className="h-3.5 w-3.5" /> Call
                        </a>
                    ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-slate-200 px-2.5 py-1.5 font-medium text-slate-400 dark:border-slate-700 dark:text-slate-500">
                            <Phone className="h-3.5 w-3.5" /> Phone unavailable
                        </span>
                    )}

                    {hostel.website ? (
                        <a
                            href={hostel.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                        >
                            <ExternalLink className="h-3.5 w-3.5" /> Website
                        </a>
                    ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-slate-200 px-2.5 py-1.5 font-medium text-slate-400 dark:border-slate-700 dark:text-slate-500">
                            <ExternalLink className="h-3.5 w-3.5" /> Website unavailable
                        </span>
                    )}

                    {hostel.googleMapsUrl ? (
                        <a
                            href={hostel.googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                        >
                            <MapPin className="h-3.5 w-3.5" /> Google Maps
                        </a>
                    ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-slate-200 px-2.5 py-1.5 font-medium text-slate-400 dark:border-slate-700 dark:text-slate-500">
                            <MapPin className="h-3.5 w-3.5" /> Map location unavailable
                        </span>
                    )}
                </div>

                {/* Actions */}
                <div className="mt-5 flex items-center gap-2">
                    <Link
                        href={`/hostels/${hostel.id}`}
                        className="inline-flex h-10 flex-1 items-center justify-center rounded-xl bg-brand-600 px-4 text-sm font-semibold text-white transition hover:bg-brand-700"
                    >
                        View Details
                    </Link>

                    <button
                        type="button"
                        onClick={handleCompare}
                        aria-pressed={selectedForCompare}
                        className={cn(
                            'inline-flex h-10 items-center gap-1.5 rounded-xl border px-3 text-sm font-semibold transition',
                            selectedForCompare
                                ? 'border-brand-600 bg-brand-50 text-brand-700 dark:border-brand-400 dark:bg-brand-900/30 dark:text-brand-300'
                                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-[#0B1220] dark:text-slate-200 dark:hover:bg-slate-800',
                        )}
                    >
                        {selectedForCompare ? (
                            <>
                                <Check className="h-4 w-4" /> Added
                            </>
                        ) : (
                            <>
                                <Scale className="h-4 w-4" /> Compare
                            </>
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={handleSave}
                        aria-pressed={saved}
                        aria-label={saved ? 'Remove from favourites' : 'Save to favourites'}
                        className={cn(
                            'inline-flex h-10 w-10 items-center justify-center rounded-xl border transition',
                            saved
                                ? 'border-rose-300 bg-rose-50 text-rose-600 dark:border-rose-500/40 dark:bg-rose-500/10 dark:text-rose-300'
                                : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-rose-500 dark:border-slate-700 dark:bg-[#0B1220] dark:text-slate-400 dark:hover:bg-slate-800',
                        )}
                    >
                        <Heart className={cn('h-4 w-4', saved && 'fill-current')} />
                    </button>
                </div>
            </div>
        </article>
    );
}

function pickFacilities(h: Hostel) {
    const list: { label: string; icon: React.ReactNode }[] = [];
    if (h.wifi) list.push({ label: 'Wi-Fi', icon: <Wifi className="h-3 w-3" /> });
    if (h.food) list.push({ label: 'Food', icon: <Utensils className="h-3 w-3" /> });
    if (h.ac) list.push({ label: 'AC', icon: <Wind className="h-3 w-3" /> });
    if (h.laundry) list.push({ label: 'Laundry', icon: <WashingMachine className="h-3 w-3" /> });
    if (h.parking) list.push({ label: 'Parking', icon: <Car className="h-3 w-3" /> });
    if (h.cctv) list.push({ label: 'CCTV', icon: <Cctv className="h-3 w-3" /> });
    if (h.security24x7) list.push({ label: '24/7 Security', icon: <Shield className="h-3 w-3" /> });
    if (h.studyRoom) list.push({ label: 'Study Room', icon: <BookOpen className="h-3 w-3" /> });
    return list;
}