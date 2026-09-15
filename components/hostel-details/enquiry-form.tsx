'use client';

import { useState, type FormEvent } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import { toast } from '@/components/ui/toast';

interface Props {
    hostelId: string;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

interface FieldErrors {
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
}

export function EnquiryForm({ hostelId }: Props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState(
        "I'm interested in this hostel. Please provide information about room availability and fees.",
    );
    const [status, setStatus] = useState<Status>('idle');
    const [errors, setErrors] = useState<FieldErrors>({});

    async function onSubmit(e: FormEvent) {
        e.preventDefault();
        setErrors({});
        setStatus('submitting');

        try {
            const res = await fetch('/api/enquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ hostelId, name, email, phone, message }),
            });

            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                if (res.status === 400 && body?.fieldErrors) {
                    const map: FieldErrors = {};
                    for (const fe of body.fieldErrors as { field: keyof FieldErrors; message: string }[]) {
                        map[fe.field] = fe.message;
                    }
                    setErrors(map);
                    setStatus('error');
                    return;
                }
                setStatus('error');
                toast('Unable to send enquiry. Please try again.');
                return;
            }

            setStatus('success');
            toast('Your enquiry has been sent successfully.');
            setName('');
            setEmail('');
            setPhone('');
            setMessage(
                "I'm interested in this hostel. Please provide information about room availability and fees.",
            );
        } catch {
            setStatus('error');
            toast('Unable to send enquiry. Please try again.');
        }
    }

    if (status === 'success') {
        return (
            <section id="enquiry" className="card-surface p-6">
                <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                    <div>
                        <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                            Your enquiry has been sent successfully.
                        </h2>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                            The hostel will contact you using the details you provided.
                        </p>
                        <button
                            type="button"
                            onClick={() => setStatus('idle')}
                            className="mt-4 inline-flex h-10 items-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-[#111A2E] dark:text-slate-200"
                        >
                            Send another enquiry
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="enquiry" className="card-surface p-6">
            <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                Send an Enquiry
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Ask the hostel directly about availability, fees and facilities.
            </p>

            <form onSubmit={onSubmit} className="mt-5 space-y-4" noValidate>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field
                        id="enq-name"
                        label="Full Name"
                        value={name}
                        onChange={setName}
                        error={errors.name}
                        autoComplete="name"
                        required
                    />
                    <Field
                        id="enq-email"
                        label="Email"
                        type="email"
                        value={email}
                        onChange={setEmail}
                        error={errors.email}
                        autoComplete="email"
                        required
                    />
                </div>

                <Field
                    id="enq-phone"
                    label="Phone Number"
                    type="tel"
                    value={phone}
                    onChange={setPhone}
                    error={errors.phone}
                    autoComplete="tel"
                    required
                />

                <div>
                    <label
                        htmlFor="enq-message"
                        className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
                    >
                        Message
                    </label>
                    <textarea
                        id="enq-message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                        required
                        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-[#0B1220] dark:text-white dark:placeholder:text-slate-500"
                    />
                    {errors.message && (
                        <p className="mt-1 text-xs font-medium text-rose-600 dark:text-rose-400">
                            {errors.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    <Send className="h-4 w-4" />
                    {status === 'submitting' ? 'Sending…' : 'Send Enquiry'}
                </button>

                {status === 'error' && !Object.keys(errors).length && (
                    <p className="text-sm font-medium text-rose-600 dark:text-rose-400">
                        Unable to send enquiry. Please try again.
                    </p>
                )}
            </form>
        </section>
    );
}

interface FieldProps {
    id: string;
    label: string;
    value: string;
    onChange: (v: string) => void;
    error?: string;
    type?: string;
    autoComplete?: string;
    required?: boolean;
}

function Field({
    id,
    label,
    value,
    onChange,
    error,
    type = 'text',
    autoComplete,
    required,
}: FieldProps) {
    return (
        <div>
            <label
                htmlFor={id}
                className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
            >
                {label}
            </label>
            <input
                id={id}
                type={type}
                value={value}
                required={required}
                autoComplete={autoComplete}
                onChange={(e) => onChange(e.target.value)}
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-[#0B1220] dark:text-white dark:placeholder:text-slate-500"
            />
            {error && (
                <p className="mt-1 text-xs font-medium text-rose-600 dark:text-rose-400">
                    {error}
                </p>
            )}
        </div>
    );
}