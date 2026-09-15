import { Suspense } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { HostelsClient } from '@/components/hostels-client';
import { HostelListSkeleton } from '@/components/hostel-skeletons';

export const metadata = {
    title: 'Find Hostels — HostelMate',
    description:
        'Search and filter hostels based on your location, budget and preferences.',
};

export default function HostelsPage() {
    return (
        <>
            <Navbar />
            <main>
                <Suspense
                    fallback={
                        <div className="container-page py-10">
                            <HostelListSkeleton />
                        </div>
                    }
                >
                    <HostelsClient />
                </Suspense>
            </main>
            <Footer />
        </>
    );
}