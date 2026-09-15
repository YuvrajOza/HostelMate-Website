'use client';

import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { Search, MapPin, Wallet, Users } from 'lucide-react';
import { buildHostelsUrl, CITIES, BUDGETS, ACCOMMODATIONS } from '@/lib/utils';

export function SearchBox() {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [city, setCity] = useState('');
    const [budget, setBudget] = useState('');
    const [gender, setGender] = useState('');

    function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const url = buildHostelsUrl({ query, city, budget, gender });
        router.push(url);
    }

    return (
        <form
            onSubmit={onSubmit}
            className="card-surface p-4 sm:p-6"
            aria-label="Find your perfect hostel"
        >
            <h2 className="mb-4 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                Find your perfect hostel
            </h2>

            {/* Main query */}
            <div className="relative">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by city, area, college or hostel..."
                    aria-label="Search by city, area, college or hostel"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-[#0B1220] dark:text-white dark:placeholder:text-slate-500"
                />
            </div>

            {/* Filters */}
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <SelectField
                    label="City"
                    icon={<MapPin className="h-4 w-4 text-slate-400" />}
                    value={city}
                    onChange={setCity}
                    placeholder="Select City"
                    options={CITIES.map((c) => ({ label: c, value: c }))}
                />
                <SelectField
                    label="Budget"
                    icon={<Wallet className="h-4 w-4 text-slate-400" />}
                    value={budget}
                    onChange={setBudget}
                    options={BUDGETS.map((b) => ({ label: b.label, value: b.value }))}
                />
                <SelectField
                    label="Accommodation"
                    icon={<Users className="h-4 w-4 text-slate-400" />}
                    value={gender}
                    onChange={setGender}
                    options={ACCOMMODATIONS.map((a) => ({ label: a.label, value: a.value }))}
                />
            </div>

            <button
                type="submit"
                className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 focus-ring"
            >
                <Search className="h-4 w-4" />
                Search Hostels
            </button>

            {/* Popular searches */}
            <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
                <span className="text-slate-500 dark:text-slate-400">Popular Searches:</span>
                {CITIES.map((c) => (
                    <button
                        key={c}
                        type="button"
                        onClick={() => router.push(`/hostels?city=${encodeURIComponent(c)}`)}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:border-brand-700 dark:hover:bg-brand-900/30 dark:hover:text-brand-300"
                    >
                        {c}
                    </button>
                ))}
            </div>
        </form>
    );
}

interface SelectFieldProps {
    label: string;
    icon: React.ReactNode;
    value: string;
    onChange: (v: string) => void;
    options: { label: string; value: string }[];
    placeholder?: string;
}

function SelectField({ label, icon, value, onChange, options, placeholder }: SelectFieldProps) {
    return (
        <label className="relative block">
            <span className="sr-only">{label}</span>
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2">
                {icon}
            </span>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                aria-label={label}
                className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-10 pr-8 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-[#0B1220] dark:text-white"
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map((o) => (
                    <option key={o.value || o.label} value={o.value}>
                        {o.label}
                    </option>
                ))}
            </select>
            <svg
                aria-hidden
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                />
            </svg>
        </label>
    );
}