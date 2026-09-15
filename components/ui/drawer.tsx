'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DrawerProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

export function Drawer({ open, onClose, title, children, footer }: DrawerProps) {
    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener('keydown', onKey);
        };
    }, [open, onClose]);

    return (
        <div
            className={cn(
                'fixed inset-0 z-50 lg:hidden',
                open ? 'pointer-events-auto' : 'pointer-events-none',
            )}
            aria-hidden={!open}
        >
            <div
                onClick={onClose}
                className={cn(
                    'absolute inset-0 bg-slate-900/50 transition-opacity',
                    open ? 'opacity-100' : 'opacity-0',
                )}
            />
            <aside
                role="dialog"
                aria-modal="true"
                aria-label={title}
                className={cn(
                    'absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-white shadow-xl transition-transform duration-300 dark:bg-[#0B1220]',
                    open ? 'translate-x-0' : 'translate-x-full',
                )}
            >
                <header className="flex h-16 items-center justify-between border-b border-slate-200 px-4 dark:border-slate-800">
                    <h2 className="text-base font-semibold tracking-tight">{title}</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close filters"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </header>
                <div className="flex-1 overflow-y-auto px-4 py-4">{children}</div>
                {footer && (
                    <footer className="border-t border-slate-200 px-4 py-3 dark:border-slate-800">
                        {footer}
                    </footer>
                )}
            </aside>
        </div>
    );
}