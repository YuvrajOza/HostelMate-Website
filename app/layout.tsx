import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
    title: 'HostelMate — Find • Compare • Choose',
    description:
        'AI-powered hostel and PG finder for college students in Gujarat. Search, compare and choose trusted hostels based on budget, location and lifestyle.',
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
    openGraph: {
        title: 'HostelMate — Find the Right Hostel for Your College Life',
        description:
            'Search, compare and choose trusted hostels based on your budget, location and lifestyle.',
        type: 'website',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning className={inter.variable}>
            <body className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 antialiased dark:bg-[#0B1220] dark:text-slate-100">
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}