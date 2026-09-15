import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function Page() {
    return (
        <>
            <Navbar />
            <main className="container-page py-20">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Coming Soon
                </h1>
                <p className="mt-3 text-slate-600 dark:text-slate-300">
                    This page will be built in a later step.
                </p>
            </main>
            <Footer />
        </>
    );
}