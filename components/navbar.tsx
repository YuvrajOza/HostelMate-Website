'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Heart, Home as HomeIcon, Menu, X } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
    { href: '/', label: 'Home' },
    { href: '/hostels', label: 'Find Hostels' },
    { href: '/cities', label: 'Cities' },
    { href: '/compare', label: 'Compare' },
    { href: '/recommend', label: 'AI Recommendation' },
];

export function Navbar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => setOpen(false), [pathname]);

    return (
        <header
            className={cn(
                'sticky top-0 z-50 w-full border-b transition-colors',
                scrolled
                    ? 'border-slate-200/70 bg-white/85 backdrop-blur-md dark:border-slate-800 dark:bg-[#0B1220]/85'
                    : 'border-transparent bg-transparent',
            )}
        >
            <nav className="container-page flex h-16 items-center justify-between gap-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 focus-ring rounded-xl">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-white shadow-sm">
                        <HomeIcon className="h-5 w-5" />
                    </span>
                    <span className="flex flex-col leading-none">
                        <span className="text-base font-semibold tracking-tight text-slate-900 dark:text-white">
                            HostelMate
                        </span>
                        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-brand-600 dark:text-brand-400">
                            Find • Compare • Choose
                        </span>
                    </span>
                </Link>

                {/* Desktop nav */}
                <ul className="hidden items-center gap-1 md:flex">
                    {NAV_LINKS.map((link) => {
                        const active = pathname === link.href;
                        return (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={cn(
                                        'rounded-lg px-3 py-2 text-sm font-medium transition focus-ring',
                                        active
                                            ? 'text-brand-700 dark:text-brand-300'
                                            : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white',
                                    )}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {/* Right actions */}
                <div className="flex items-center gap-2">
                    <Link
                        href="/favourites"
                        aria-label="Favourites"
                        className="hidden h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 hover:text-rose-500 focus-ring dark:border-slate-700 dark:bg-[#111A2E] dark:text-slate-200 dark:hover:bg-slate-800 sm:inline-flex"
                    >
                        <Heart className="h-5 w-5" />
                    </Link>

                    <ThemeToggle />

                    <Link
                        href="/login"
                        className="hidden h-10 items-center justify-center rounded-xl bg-brand-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 focus-ring sm:inline-flex"
                    >
                        Login
                    </Link>

                    <button
                        type="button"
                        aria-label="Toggle menu"
                        aria-expanded={open}
                        onClick={() => setOpen((v) => !v)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 focus-ring dark:border-slate-700 dark:bg-[#111A2E] dark:text-slate-200 dark:hover:bg-slate-800 md:hidden"
                    >
                        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </nav>

            {/* Mobile menu */}
            {open && (
                <div className="border-t border-slate-200 bg-white md:hidden dark:border-slate-800 dark:bg-[#0B1220]">
                    <ul className="container-page flex flex-col gap-1 py-3">
                        {NAV_LINKS.map((link) => {
                            const active = pathname === link.href;
                            return (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            'block rounded-lg px-3 py-3 text-sm font-medium transition',
                                            active
                                                ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300'
                                                : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            );
                        })}
                        <li className="mt-2 flex items-center gap-2">
                            <Link
                                href="/favourites"
                                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-3 text-sm font-medium text-slate-700 dark:border-slate-700 dark:text-slate-200"
                            >
                                <Heart className="h-4 w-4" /> Favourites
                            </Link>
                            <Link
                                href="/login"
                                className="flex flex-1 items-center justify-center rounded-xl bg-brand-600 px-3 py-3 text-sm font-semibold text-white"
                            >
                                Login
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
}