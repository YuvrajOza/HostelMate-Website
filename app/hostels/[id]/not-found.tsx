import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function NotFound() {
    return (
        <>
            <Navbar />
            <main className="container-page py-20">
                <div className="card-surface mx-auto max-w-lg p-8 text-center">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Hostel Not Found
                    </h1>
                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                        The hostel you are looking for may have been removed or is unavailable.
                    </p>
                    <Link
                        href="/hostels"
                        className="mt-6 inline-flex h-11 items-center rounded-xl bg-brand-600 px-5 text-sm font-semibold text-white hover:bg-brand-700"
                    >
                        Back to Hostels
                    </Link>
                </div>
            </main>
            <Footer />
        </>
    );
}