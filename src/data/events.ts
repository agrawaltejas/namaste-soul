import { Event } from '@/types/event';

// Calculate duration helper
const calculateDuration = (startDate: string, endDate: string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
};

// Seed events data based on provided listings
export const seedEvents: Event[] = [
  {
    id: 'yoga-1771771269884-q3frg',
    title: '7-Day Yoga and Meditation Retreat',
    category: 'Yoga',
    type: 'Retreat',
    country: 'Netherlands',
    city: 'Utrecht',
    venue: 'Yoga Moves',
    date_start: '2026-04-10',
    date_end: '2026-04-17',
    duration_days: 8,
    language: 'English',
    price_from_eur: 850,
    short_desc: 'Join us for a rejuvenating week of yoga and meditation in the serene surroundings of Utrecht.',
    
    organizer: 'Yoga Moves',
    source_url: 'https://www.bookretreats.com/7-day-yoga-and-meditation-retreat-utrecht',
    tags: 'yoga, meditation, wellness',
    status: 'published',
    
    rating: 4,
    rating_reason: 'Reputable organizer, immersive program, but lacks instructor details.',
    created_at: '2026-02-22T14:41:09.884Z',
    updated_at: '2026-02-22T14:41:09.884Z'
  },
  {
    id: 'yoga-1771771269884-iv58i',
    title: 'Kundalini Yoga Workshop',
    category: 'Yoga',
    type: 'Workshop',
    country: 'Netherlands',
    city: 'Amsterdam',
    venue: 'Delight Yoga',
    date_start: '2026-05-15',
    date_end: '2026-05-15',
    duration_days: 1,
    language: 'Dutch',
    price_from_eur: 120,
    short_desc: 'Explore the transformative power of Kundalini Yoga in this intensive workshop.',
    
    organizer: 'Delight Yoga',
    source_url: 'https://www.eventbrite.nl/e/kundalini-yoga-workshop-amsterdam-tickets-123456789',
    tags: 'kundalini, yoga, workshop',
    status: 'published',
    
    rating: 4,
    rating_reason: 'Reputable organizer, good venue, lacks multi-day depth',
    created_at: '2026-02-22T14:41:09.884Z',
    updated_at: '2026-02-22T14:41:09.884Z'
  },
  {
    id: 'meditation-1771771269884-ff47h',
    title: '10-Day Vipassana Meditation Retreat',
    category: 'Yoga',
    type: 'Retreat',
    country: 'Netherlands',
    city: 'Haarlem',
    venue: 'Vipassana Meditation Center',
    date_start: '2026-07-01',
    date_end: '2026-07-11',
    duration_days: 11,
    language: 'English',
    price_from_eur: 450,
    short_desc: 'Immerse yourself in silence and mindfulness with a 10-day Vipassana retreat.',
    
    organizer: 'Vipassana Meditation Center',
    source_url: 'https://www.retraite.nl/vipassana-meditation-retreat-haarlem',
    tags: 'vipassana, meditation, silent retreat',
    status: 'published',
    
    rating: 4.5,
    rating_reason: 'Reputable center, immersive program, fair price, lacks instructor details',
    created_at: '2026-02-22T14:41:09.884Z',
    updated_at: '2026-02-22T14:41:09.884Z'
  },
  {
    id: 'tantra-1771771269884-q5lnt',
    title: 'Tantra and Yoga Weekend Retreat',
    category: 'Tantra',
    type: 'Retreat',
    country: 'Netherlands',
    city: 'Rotterdam',
    venue: 'Tantra Temple',
    date_start: '2026-09-10',
    date_end: '2026-09-12',
    duration_days: 3,
    language: 'English',
    price_from_eur: 500,
    short_desc: 'Discover the art of Tantra and deepen your yoga practice in this weekend retreat.',
    
    organizer: 'Tantra Temple',
    source_url: 'https://www.bookretreats.com/tantra-and-yoga-weekend-retreat-rotterdam',
    tags: 'tantra, yoga, weekend retreat',
    status: 'published',
    
    rating: 3.5,
    rating_reason: 'Reputable organizer, immersive program, lacks instructor details',
    created_at: '2026-02-22T14:41:09.884Z',
    updated_at: '2026-02-22T14:41:09.884Z'
  },
  {
    id: 'ayurveda-1771771269884-q5zf0',
    title: 'Ayurveda and Yoga Retreat',
    category: 'Ayurveda',
    type: 'Retreat',
    country: 'Netherlands',
    city: 'The Hague',
    venue: 'Ayurveda Center',
    date_start: '2026-11-05',
    date_end: '2026-11-12',
    duration_days: 8,
    language: 'English',
    price_from_eur: 950,
    short_desc: 'Balance your body and mind with Ayurveda practices and yoga sessions.',
    
    organizer: 'Ayurveda Center',
    source_url: 'https://www.yogapoint.nl/ayurveda-and-yoga-retreat-the-hague',
    tags: 'ayurveda, yoga, wellness',
    status: 'published',
    
    rating: 3.5,
    rating_reason: 'Reputable organizer, immersive program, but lacks instructor details.',
    created_at: '2026-02-22T14:41:09.884Z',
    updated_at: '2026-02-22T14:41:09.884Z'
  },
  {
    id: 'yoga-1771771269884-xn95i',
    title: 'Yin Yoga and Mindfulness Workshop',
    category: 'Yoga',
    type: 'Workshop',
    country: 'Netherlands',
    city: 'Eindhoven',
    venue: 'Yoga Studio Eindhoven',
    date_start: '2026-12-03',
    date_end: '2026-12-03',
    duration_days: 1,
    language: 'Dutch',
    price_from_eur: 75,
    short_desc: 'Experience deep relaxation and mindfulness through Yin Yoga.',
    
    organizer: 'Yoga Studio Eindhoven',
    source_url: 'https://www.eventbrite.nl/e/yin-yoga-and-mindfulness-workshop-eindhoven-tickets-987654321',
    tags: 'yin yoga, mindfulness, relaxation',
    status: 'published',
    
    rating: 3.5,
    rating_reason: 'Reputable organizer, good venue, lacks instructor details.',
    created_at: '2026-02-22T14:41:09.884Z',
    updated_at: '2026-02-22T14:41:09.884Z'
  },
  {
    id: 'meditation-1771771269884-cr1ie',
    title: '5-Day Silent Meditation Retreat',
    category: 'Yoga',
    type: 'Retreat',
    country: 'Netherlands',
    city: 'Groningen',
    venue: 'Silent Retreat Center',
    date_start: '2027-01-15',
    date_end: '2027-01-20',
    duration_days: 6,
    language: 'English',
    price_from_eur: 400,
    short_desc: 'Join us for a peaceful silent retreat to deepen your meditation practice.',
    
    organizer: 'Silent Retreat Center',
    source_url: 'https://www.retraite.nl/silent-meditation-retreat-groningen',
    tags: 'silent retreat, meditation, mindfulness',
    status: 'published',
    
    rating: 4,
    rating_reason: 'Reputable organizer, premium venue, immersive program, fair price.',
    created_at: '2026-02-22T14:41:09.884Z',
    updated_at: '2026-02-22T14:41:09.884Z'
  },
  {
    id: 'tantra-1771771269884-m8glw',
    title: 'Tantra Yoga Immersion',
    category: 'Tantra',
    type: 'Training',
    country: 'Netherlands',
    city: 'Leiden',
    venue: 'Tantra School',
    date_start: '2026-03-20',
    date_end: '2026-03-27',
    duration_days: 8,
    language: 'English',
    price_from_eur: 1200,
    short_desc: 'Dive deep into the teachings of Tantra Yoga with this immersive training.',
    
    organizer: 'Tantra School',
    source_url: 'https://www.bookretreats.com/tantra-yoga-immersion-leiden',
    tags: 'tantra, yoga, training',
    status: 'published',
    
    rating: 3.5,
    rating_reason: 'Reputable organizer, immersive program, but high price and unclear instructor info.',
    created_at: '2026-02-22T14:41:09.884Z',
    updated_at: '2026-02-22T14:41:09.884Z'
  },
  {
    id: 'ayurveda-1771771269884-57mnn',
    title: 'Weekend Yoga and Ayurveda Retreat',
    category: 'Ayurveda',
    type: 'Retreat',
    country: 'Netherlands',
    city: 'Maastricht',
    venue: 'Wellness Center Maastricht',
    date_start: '2026-08-19',
    date_end: '2026-08-21',
    duration_days: 3,
    language: 'English',
    price_from_eur: 600,
    short_desc: 'Rebalance your life with yoga and Ayurveda practices in a serene setting.',
    
    organizer: 'Wellness Center Maastricht',
    source_url: 'https://www.yogapoint.nl/weekend-yoga-and-ayurveda-retreat-maastricht',
    tags: 'yoga, ayurveda, wellness',
    status: 'published',
    
    rating: 3.5,
    rating_reason: 'Reputable organizer, premium venue, but high price and limited info.',
    created_at: '2026-02-22T14:41:09.884Z',
    updated_at: '2026-02-22T14:41:09.884Z'
  },
  {
    id: 'yoga-1771771269884-skgdt',
    title: 'Advanced Kundalini Yoga Retreat',
    category: 'Yoga',
    type: 'Retreat',
    country: 'Netherlands',
    city: 'Nijmegen',
    venue: 'Kundalini Center',
    date_start: '2026-10-05',
    date_end: '2026-10-12',
    duration_days: 8,
    language: 'English',
    price_from_eur: 1100,
    short_desc: 'Elevate your Kundalini practice with advanced techniques and teachings.',
    
    organizer: 'Kundalini Center',
    source_url: 'https://www.bookretreats.com/advanced-kundalini-yoga-retreat-nijmegen',
    tags: 'kundalini, yoga, advanced',
    status: 'published',
    
    rating: 4,
    rating_reason: 'Reputable organizer, immersive program, but high price without clear value.',
    created_at: '2026-02-22T14:41:09.884Z',
    updated_at: '2026-02-22T14:41:09.884Z'
  }
];

// Calculate duration for all events
seedEvents.forEach(event => {
  event.duration_days = calculateDuration(event.date_start, event.date_end);
});

export default seedEvents;
