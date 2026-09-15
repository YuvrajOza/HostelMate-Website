import type { EnquiryInput } from '@/lib/types';
import { insertEnquiry } from './repository';

export interface ValidationError {
    field: 'name' | 'email' | 'phone' | 'message';
    message: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+0-9][0-9\s-]{6,20}$/;

export function validateEnquiry(input: Partial<EnquiryInput>): ValidationError[] {
    const errors: ValidationError[] = [];
    if (!input.name || input.name.trim().length < 2) {
        errors.push({ field: 'name', message: 'Please enter your full name.' });
    }
    if (!input.email || !EMAIL_RE.test(input.email.trim())) {
        errors.push({ field: 'email', message: 'Please enter a valid email.' });
    }
    if (!input.phone || !PHONE_RE.test(input.phone.trim())) {
        errors.push({ field: 'phone', message: 'Please enter a valid phone number.' });
    }
    if (!input.message || input.message.trim().length < 10) {
        errors.push({
            field: 'message',
            message: 'Please provide a short message (10+ characters).',
        });
    }
    if (!input.hostelId) {
        errors.push({ field: 'name', message: 'Missing hostel reference.' });
    }
    return errors;
}

export async function submitEnquiry(input: EnquiryInput) {
    const errors = validateEnquiry(input);
    if (errors.length) return { ok: false as const, errors };
    const row = await insertEnquiry(input);
    if (!row) return { ok: false as const, errors: [], serverError: true as const };
    return { ok: true as const, enquiry: row };
}