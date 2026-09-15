'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { ImageGallery } from './image-gallery';
import { HostelHeader } from './hostel-header';
import { ActionButtons } from './action-buttons';
import { OverviewCard } from './overview-card';
import { PriceCard } from './price-card';
import { FacilitiesCard } from './facilities-card';
import { AvailabilityCard } from './availability-card';
import { LocationCard } from './locations-card';
import { SafetyCard } from './safety-card';
import { ReviewsCard } from './reviews-card';
import { EnquiryForm } from './enquiry-form';
import { SimilarHostels } from './similar-hostels';
import type { Hostel, HostelDetails } from '@/lib/types';

export function HostelDetailsClient({
    hostel,
    similar,
}: {
    hostel: HostelDetails;
    similar: Hostel[];
}) {
    return (
        <div className="container-page py-8">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                    <li>
                        <Link href="/" className="hover:text-brand-600 dark:hover:text-brand-400">
                            Home
                        </Link>
                    </li>
                    <li aria-hidden>
                        <ChevronRight className="h-3.5 w-3.5" />
                    </li>
                    <li>
                        <Link
                            href="/hostels"
                            className="hover:text-brand-600 dark:hover:text-brand-400"
                        >
                            Hostels
                        </Link>
                    </li>
                    <li aria-hidden>
                        <ChevronRight className="h-3.5 w-3.5" />
                    </li>
                    <li
                        aria-current="page"
                        className="max-w-[180px] truncate font-medium text-slate-700 dark:text-slate-200"
                    >
                        {hostel.name}
                    </li>
                </ol>
            </nav>

            {/* Gallery */}
            <ImageGallery images={hostel.images} alt={hostel.name} />

            {/* Header + actions */}
            <HostelHeader hostel={hostel} />
            <ActionButtons hostel={hostel} />

            {/* Body */}
            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
                <div className="space-y-6">
                    <OverviewCard hostel={hostel} />
                    <FacilitiesCard hostel={hostel} />
                    <LocationCard hostel={hostel} />
                    <SafetyCard hostel={hostel} />
                    <ReviewsCard hostel={hostel} />
                    <EnquiryForm hostelId={hostel.id} />
                </div>

                <aside className="space-y-6">
                    <PriceCard hostel={hostel} />
                    <AvailabilityCard hostel={hostel} />
                </aside>
            </div>

            {/* Similar */}
            <SimilarHostels hostels={similar} />
        </div>
    );
}