export interface Event {
  id: string;
  title: string;
  category: 'Yoga' | 'Ayurveda' | 'Astrology' | 'Tantra';
  type: 'Retreat' | 'Workshop' | 'Festival' | 'Training';
  country: 'Netherlands' | 'India';
  city: string;
  venue?: string;
  date_start: string; // YYYY-MM-DD
  date_end: string; // YYYY-MM-DD
  duration_days: number; // computed
  language: string;
  price_from_eur?: number;
  short_desc: string; // <= 300 chars
  image_url?: string;
  organizer: string;
  source_url: string; // external official page
  tags?: string; // comma-separated
  status: 'published' | 'pending' | 'archived';
  featured?: boolean;
  created_at: string;
  updated_at: string;
}

export interface EventFilters {
  country?: 'Netherlands' | 'India';
  city?: string;
  category?: Event['category'];
  type?: Event['type'];
  language?: string;
  dateRange?: 'this-weekend' | 'next-30-days' | 'custom';
  customStartDate?: string;
  customEndDate?: string;
  duration?: '1-day' | 'weekend' | '3-4-days' | '5-7-days' | '1-week-plus';
  priceRange?: {
    min?: number;
    max?: number;
  };
  search?: string;
}

export interface EventFormData {
  title: string;
  category: Event['category'];
  type: Event['type'];
  country: Event['country'];
  city: string;
  venue?: string;
  date_start: string;
  date_end: string;
  language: string;
  price_from_eur?: number;
  short_desc: string;
  image_url?: string;
  organizer: string;
  source_url: string;
  contact_email: string;
  consent: boolean;
}