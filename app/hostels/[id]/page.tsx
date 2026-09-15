import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { HostelDetailsClient } from '@/components/hostel-details/hostel-details-client';
import { getHostelById, getSimilarHostels } from '@/lib/hostels/service';

interface Params {
    params: { id: string };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const hostel = await getHostelById(params.id);
    if (!hostel) {
        return {
            title: 'Hostel Not Found | HostelMate',
            description:
                'The hostel you are looking for may have been removed or is unavailable.',
        };
    }
    return {
        title: `${hostel.name} | HostelMate`,
        description: `View details, facilities, ratings, pricing and contact information for ${hostel.name} on HostelMate.`,
    };
}

export default async function HostelDetailsPage({ params }: Params) {
    const hostel = await getHostelById(params.id);
    if (!hostel) notFound();

    const similar = await getSimilarHostels(hostel.city, hostel.id, 4);

    return (
        <>
            <Navbar />
            <main>
                <HostelDetailsClient hostel={hostel} similar={similar} />
            </main>
            <Footer />
        </>
    );
}