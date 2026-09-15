import type { EnquiryInput, EnquiryRow } from '@/lib/types';

export async function insertEnquiry(
    input: EnquiryInput,
): Promise<EnquiryRow | null> {
    // No database wired yet — return a synthetic, non-persisted record so the
    // UI can exercise its success path. When Supabase is connected, replace with
    // a real INSERT and return the created row (or null on failure):
    //
    //   const { data, error } = await supabase
    //     .from('enquiries')
    //     .insert({
    //       hostel_id: input.hostelId,
    //       user_id: input.userId ?? null,
    //       name: input.name,
    //       email: input.email,
    //       phone: input.phone,
    //       message: input.message,
    //       status: 'new',
    //     })
    //     .select()
    //     .single();
    //   if (error) return null;
    //   return data as EnquiryRow;
    return {
        id: `local-${Date.now()}`,
        hostel_id: input.hostelId,
        user_id: input.userId ?? null,
        name: input.name,
        email: input.email,
        phone: input.phone,
        message: input.message,
        status: 'new',
        created_at: new Date().toISOString(),
    };
}