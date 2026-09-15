'use client';

import { cn } from '@/lib/utils';
import {
    DISTANCE_OPTIONS,
    FACILITY_OPTIONS,
    QUICK_BUDGETS,
    RATING_OPTIONS,
} from '@/lib/hostels/filters';
import type { Availability, Gender, HostelSearchParams } from '@/lib/types';

interface Props {
    value: HostelSearchParams;
    onChange: (patch: Partial<HostelSearchParams>) => void;
    onClear: () => void;
}

const CITIES = ['Ahmedabad', 'Anand', 'Vadodara'] as const;
const GENDERS: (Gender | '')[] = ['', 'Boys', 'Girls', 'Co-ed'];
const AVAILABILITY: (Availability | '')[] = ['', 'Available', 'Limited', 'Not Available'];

export function HostelFilters({ value, onChange, onClear }: Props) {
    const selectedFacilities = new Set(value.facilities ?? []);

    const toggleFacility = (key: string) => {
        const next = new Set(selectedFacilities);
        if (next.has(key)) next.delete(key);
        else next.add(key);
        onChange({ facilities: next.size ? Array.from(next) : undefined, page: 1 });
    };

    return (
        <div className="space-y-6">
            {/* City */}
            <Section title="City">
                <Select
                    value={value.city ?? ''}
                    onChange={(v) => onChange({ city: v || undefined, page: 1 })}
                    options={[
                        { value: '', label: 'All Cities' },
                        ...CITIES.map((c) => ({ value: c, label: c })),
                    ]}
                />
            </Section>

            {/* Budget */}
            <Section title="Budget">
                <div className="grid grid-cols-2 gap-2">
                    <NumberInput
                        label="Min"
                        value={value.minRent}
                        min={0}
                        max={50000}
                        step={500}
                        onChange={(n) => onChange({ minRent: n, page: 1 })}
                    />
                    <NumberInput
                        label="Max"
                        value={value.maxRent}
                        min={0}
                        max={50000}
                        step={500}
                        onChange={(n) => onChange({ maxRent: n, page: 1 })}
                    />
                </div>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                    ₹0 – ₹50,000+
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                    {QUICK_BUDGETS.map((b) => {
                        const active = value.minRent === b.min && (value.maxRent ?? undefined) === b.max;
                        return (
                            <button
                                key={b.label}
                                type="button"
                                onClick={() =>
                                    onChange({
                                        minRent: active ? undefined : b.min,
                                        maxRent: active ? undefined : b.max,
                                        page: 1,
                                    })
                                }
                                className={cn(
                                    'rounded-full border px-3 py-1 text-xs font-medium transition',
                                    active
                                        ? 'border-brand-600 bg-brand-50 text-brand-700 dark:border-brand-400 dark:bg-brand-900/30 dark:text-brand-300'
                                        : 'border-slate-200 bg-white text-slate-700 hover:border-brand-300 dark:border-slate-700 dark:bg-[#111A2E] dark:text-slate-300',
                                )}
                            >
                                {b.label}
                            </button>
                        );
                    })}
                </div>
            </Section>

            {/* Accommodation */}
            <Section title="Accommodation Type">
                <Select
                    value={value.gender ?? ''}
                    onChange={(v) => onChange({ gender: (v || undefined) as Gender | undefined, page: 1 })}
                    options={GENDERS.map((g) => ({ value: g, label: g || 'Any' }))}
                />
            </Section>

            {/* Rating */}
            <Section title="Rating">
                <Select
                    value={value.rating != null ? String(value.rating) : ''}
                    onChange={(v) => onChange({ rating: v ? Number(v) : undefined, page: 1 })}
                    options={RATING_OPTIONS.map((r) => ({
                        value: r.value != null ? String(r.value) : '',
                        label: r.label,
                    }))}
                />
            </Section>

            {/* Distance */}
            <Section title="Distance">
                <Select
                    value={value.distance != null ? String(value.distance) : ''}
                    onChange={(v) => onChange({ distance: v ? Number(v) : undefined, page: 1 })}
                    options={DISTANCE_OPTIONS.map((d) => ({
                        value: d.value != null ? String(d.value) : '',
                        label: d.label,
                    }))}
                />
            </Section>

            {/* Facilities */}
            <Section title="Facilities">
                <ul className="grid grid-cols-1 gap-1.5">
                    {FACILITY_OPTIONS.map((f) => {
                        const checked = selectedFacilities.has(f.key);
                        return (
                            <li key={f.key}>
                                <label className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/60">
                                    <input
                                        type="checkbox"
                                        checked={checked}
                                        onChange={() => toggleFacility(f.key)}
                                        className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 dark:border-slate-600 dark:bg-slate-800"
                                    />
                                    {f.label}
                                </label>
                            </li>
                        );
                    })}
                </ul>
            </Section>

            {/* Availability */}
            <Section title="Availability">
                <Select
                    value={value.availability ?? ''}
                    onChange={(v) =>
                        onChange({
                            availability: (v || undefined) as Availability | undefined,
                            page: 1,
                        })
                    }
                    options={AVAILABILITY.map((a) => ({ value: a, label: a || 'Any' }))}
                />
            </Section>

            <button
                type="button"
                onClick={onClear}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-[#111A2E] dark:text-slate-200 dark:hover:bg-slate-800"
            >
                Clear All Filters
            </button>
        </div>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {title}
            </h3>
            {children}
        </section>
    );
}

function Select({
    value,
    onChange,
    options,
}: {
    value: string;
    onChange: (v: string) => void;
    options: { value: string; label: string }[];
}) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-[#0B1220] dark:text-white"
        >
            {options.map((o) => (
                <option key={o.value} value={o.value}>
                    {o.label}
                </option>
            ))}
        </select>
    );
}

function NumberInput({
    label,
    value,
    min,
    max,
    step,
    onChange,
}: {
    label: string;
    value?: number;
    min: number;
    max: number;
    step: number;
    onChange: (n: number | undefined) => void;
}) {
    return (
        <label className="block">
            <span className="mb-1 block text-[11px] font-medium text-slate-500 dark:text-slate-400">
                {label}
            </span>
            <input
                type="number"
                inputMode="numeric"
                value={value ?? ''}
                min={min}
                max={max}
                step={step}
                placeholder="—"
                onChange={(e) =>
                    onChange(e.target.value === '' ? undefined : Number(e.target.value))
                }
                className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-[#0B1220] dark:text-white"
            />
        </label>
    );
}