'use client';

import { useEffect, useState } from 'react';

let showFn: ((msg: string) => void) | null = null;

export function toast(msg: string) {
    showFn?.(msg);
}

export function ToastHost() {
    const [msg, setMsg] = useState<string | null>(null);

    useEffect(() => {
        showFn = (m) => {
            setMsg(m);
            window.setTimeout(() => setMsg(null), 2400);
        };
        return () => {
            showFn = null;
        };
    }, []);

    if (!msg) return null;

    return (
        <div
            role="status"
            aria-live="polite"
            className="pointer-events-none fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-card dark:bg-white dark:text-slate-900"
        >
            {msg}
        </div>
    );
}