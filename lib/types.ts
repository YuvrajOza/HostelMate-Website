export type Gender = 'Boys' | 'Girls' | 'Co-ed';
export type Availability = 'Available' | 'Limited' | 'Not Available';
export type VerificationStatus = 'verified' | 'unverified' | 'pending';

export interface Hostel {
    id: string;
    name: string;
    slug: string;
    city: string;
    area: string;
    address: string;

    latitude?: number;
    longitude?: number;

    googleRating?: number;          // 0..5, from Google
    googleReviewCount?: number;
    googleMapsUrl?: string;

    phone?: string;
    website?: string;

    hostelType?: string;            // e.g. "PG", "Hostel", "Co-living"
    gender: Gender;
    monthlyRent: number;
    securityDeposit?: number;
    roomType?: string;              // "Single / Double Sharing"

    food: boolean;
    wifi: boolean;
    laundry: boolean;
    ac: boolean;
    parking: boolean;
    cctv: boolean;
    security24x7: boolean;
    studyRoom: boolean;

    availability: Availability;
    description?: string;
    images: string[];

    verificationStatus: VerificationStatus;
    lastVerified?: string;

    createdAt: string;
    updatedAt: string;
}

/** Raw DB row shape (snake_case, as it would come from Postgres). */
export interface HostelRow {
    id: string;
    name: string;
    slug: string;
    city: string;
    area: string;
    address: string;
    latitude: number | null;
    longitude: number | null;
    google_rating: number | null;
    google_review_count: number | null;
    google_maps_url: string | null;
    phone: string | null;
    website: string | null;
    hostel_type: string | null;
    gender: Gender;
    monthly_rent: number;
    security_deposit: number | null;
    room_type: string | null;
    food: boolean;
    wifi: boolean;
    laundry: boolean;
    ac: boolean;
    parking: boolean;
    cctv: boolean;
    security_24x7: boolean;
    study_room: boolean;
    availability: Availability;
    description: string | null;
    images: string[] | null;
    verification_status: VerificationStatus;
    last_verified: string | null;
    created_at: string;
    updated_at: string;
}

export interface HostelSearchParams {
    q?: string;
    city?: string;
    minRent?: number;
    maxRent?: number;
    gender?: Gender;
    rating?: number;
    distance?: number;
    facilities?: string[];
    availability?: Availability;
    sort?: SortOption;
    page: number;
    limit: number;
}

export type SortOption =
    | 'recommended'
    | 'highest-rated'
    | 'most-reviewed'
    | 'lowest-rent'
    | 'highest-rent'
    | 'nearest';

export interface HostelSearchResult {
    data: Hostel[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface EnquiryInput {
    hostelId: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    userId?: string;
}

export interface EnquiryRow {
    id: string;
    hostel_id: string;
    user_id: string | null;
    name: string;
    email: string;
    phone: string;
    message: string;
    status: 'new' | 'contacted' | 'closed';
    created_at: string;
}

export interface ReviewRow {
    id: string;
    hostel_id: string;
    user_id: string;
    rating: number;
    comment: string | null;
    created_at: string;
    user_name?: string;
}

export interface Review {
    id: string;
    hostelId: string;
    userId: string;
    rating: number;
    comment?: string;
    createdAt: string;
    userName?: string;
}

export interface HostelDetails extends Hostel {
    reviews: Review[];
    reviewAverage?: number;
    reviewCount: number;
}