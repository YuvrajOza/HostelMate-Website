'use client';

import { useCallback, useEffect, useState } from 'react';

const KEY = 'hostelmate:compare';
const MAX = 3;
const EVENT = 'hostelmate:compare-change';

function read(): string[] {
    if (typeof window === 'undefined') return [];
    try {
        const raw = window.localStorage.getItem(KEY);
        const arr = raw ? (JSON.parse(raw) as unknown) : [];
        return Array.isArray(arr) ? arr.filter((x): x is string => typeof x === 'string') : [];
    } catch {
        return [];
    }
}

function write(ids: string[]) {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(KEY, JSON.stringify(ids));
    window.dispatchEvent(new Event(EVENT));
}

export function useCompare() {
    const [ids, setIds] = useState<string[]>([]);

    useEffect(() => {
        setIds(read());
        const sync = () => setIds(read());
        window.addEventListener(EVENT, sync);
        window.addEventListener('storage', sync);
        return () => {
            window.removeEventListener(EVENT, sync);
            window.removeEventListener('storage', sync);
        };
    }, []);

    const toggle = useCallback((id: string) => {
        const current = read();
        const next = current.includes(id)
            ? current.filter((x) => x !== id)
            : current.length >= MAX
                ? current
                : [...current, id];
        write(next);
    }, []);

    const remove = useCallback((id: string) => {
        write(read().filter((x) => x !== id));
    }, []);

    const clear = useCallback(() => write([]), []);

    return { ids, toggle, remove, clear, max: MAX };
}