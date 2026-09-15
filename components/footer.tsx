import Link from 'next/link';
import { Home as HomeIcon } from 'lucide-react';

const MAIN_LINKS = [
    { href: '/', label: 'Home' },
    { href: '/hostels', label: 'Find Hostels' },
    { href: '/cities', label: 'Cities' },
    { href: '/compare', label: 'Compare' },
    { href: '/recommend', label: 'AI Recommendation' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
];

const CITY_LINKS = [
    { href: '/hostels?city=Ahmedabad', label: 'Ahmedabad' },
    { href: '/hostels?city=Anand', label: 'Anand' },
    { href: '/hostels?city=Vadodara', label: 'Vadodara' },
];

const LEGAL_LINKS = [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms & Conditions' },
];

export function Footer() {
    return (
        <footer className="border-t border-slate-200/70 bg-white dark:border-slate-800 dark:bg-[#0B1220]">
            <div className="container-page py-14">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-2.5">
                            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-white shadow-sm">
                                <HomeIcon className="h-5 w-5" />
                            </span>
                            <span className="flex flex-col leading-none">
                                <span className="text-base font-semibold tracking-tight text-slate-900 dark:text-white">
                                    HostelMate
                                </span>
                                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-brand-600 dark:text-brand-400">
                                    AI Hostel Finder
                                </span>
                            </span>
                        </Link>
                        <p className="mt-4 text-sm font-medium tracking-wide text-slate-500 dark:text-slate-400">
                            Find • Compare • Choose
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                            Helping students across Gujarat find the right hostel for college life.
                        </p>
                    </div>

                    {/* Links */}
                    <FooterColumn title="Explore" links={MAIN_LINKS} />
                    <FooterColumn title="Cities" links={CITY_LINKS} />
                    <FooterColumn title="Legal" links={LEGAL_LINKS} />
                </div>

                <div className="mt-12 border-t border-slate-200/70 pt-6 dark:border-slate-800">
                    <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                        © 2026 HostelMate. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

function FooterColumn({
    title,
    links,
}: {
    title: string;
    links: { href: string; label: string }[];
}) {
    return (
        <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
                {title}
            </h3>
            <ul className="mt-4 space-y-2.5">
                {links.map((l) => (
                    <li key={l.href}>
                        <Link
                            href={l.href}
                            className="text-sm text-slate-600 transition hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
                        >
                            {l.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}