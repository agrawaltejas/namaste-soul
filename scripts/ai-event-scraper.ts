import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Load configuration
const configPath = path.join(process.cwd(), 'ai-config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

// Initialize AI client based on config
const aiProvider = process.env.AI_PROVIDER || config.aiProvider || 'openai';
let aiClient: OpenAI | Anthropic;

if (aiProvider === 'anthropic') {
  aiClient = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY || '',
  });
} else {
  aiClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
  });
}

interface Event {
  id: string;
  title: string;
  category: 'Yoga' | 'Ayurveda' | 'Astrology' | 'Tantra';
  type: 'Retreat' | 'Workshop' | 'Festival' | 'Training';
  country: 'Netherlands' | 'India';
  city: string;
  venue?: string;
  date_start: string;
  date_end: string;
  duration_days: number;
  language: string;
  price_from_eur?: number;
  short_desc: string;
  image_url?: string;
  organizer: string;
  source_url: string;
  tags?: string;
  status: 'published' | 'pending' | 'archived';
  featured?: boolean;
  rating?: number;
  rating_reason?: string;
  created_at: string;
  updated_at: string;
}

// Main AI scraping function
async function scrapeEventsWithAI(): Promise<Event[]> {
  console.log('🤖 Starting AI event scraper...');
  console.log(`Provider: ${aiProvider}`);

  const prompt = buildSearchPrompt();
  console.log('\n📝 Sending prompt to AI...\n');
  console.log(prompt);

  let response: string;

  if (aiProvider === 'anthropic' && aiClient instanceof Anthropic) {
    const message = await aiClient.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 8000,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });
    response = message.content[0].type === 'text' ? message.content[0].text : '';
  } else if (aiClient instanceof OpenAI) {
    const completion = await aiClient.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an expert at finding and curating high-quality yoga and wellness events.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.3,
    });
    response = completion.choices[0].message.content || '';
  } else {
    throw new Error('Invalid AI provider');
  }

  console.log('✅ AI response received\n');

  // Parse AI response to extract events
  const events = parseAIResponse(response);
  console.log(`📊 Found ${events.length} potential events`);

  // Rate each event
  const ratedEvents = await rateEvents(events);

  // Filter by minimum rating
  const qualityEvents = ratedEvents.filter(
    (e) => (e.rating || 0) >= config.ratingCriteria.minimumRating
  );

  console.log(`⭐ ${qualityEvents.length} events passed quality threshold (≥${config.ratingCriteria.minimumRating} stars)\n`);

  return qualityEvents;
}

// Build the search prompt for AI
function buildSearchPrompt(): string {
  const today = new Date().toISOString().split('T')[0];
  const oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
  const endDate = oneYearFromNow.toISOString().split('T')[0];

  return `
Search for yoga retreats, workshops, and meditation events in the Netherlands for the next 12 months. Look for events from reputable organizations and provide accurate booking information.

**Search Parameters:**
- Date range: ${today} to ${endDate}
- Country: Netherlands only
- Focus keywords: ${config.searchPrompts.keywords.join(', ')}
- Look for events on: ${config.searchPrompts.sources.join(', ')}
- Exclude: ${config.searchPrompts.exclusions.join(', ')}

**CRITICAL: Each event MUST have a REAL, WORKING URL where users can book/get info. Do NOT make up URLs!**

**Required Information for Each Event:**
- Exact title (as it appears on the booking site)
- Category (Yoga, Ayurveda, Astrology, or Tantra)
- Type (Retreat, Workshop, Festival, or Training)
- City in Netherlands
- Venue name (if available)
- Start date (YYYY-MM-DD)
- End date (YYYY-MM-DD)
- Language
- Price in EUR (if available)
- Brief description (max 300 chars)
- Organizer name (actual organization running the event)
- **REAL source URL** (actual booking page - DO NOT FABRICATE)
- Any relevant tags

**URL VALIDATION:**
- Every URL must be a real, accessible event page
- Users must be able to click the URL and find the event
- If you cannot find a real URL, DO NOT include that event
- Prefer well-known booking platforms (BookRetreats, Eventbrite, Meetup)

**Output Format:**
Return ONLY valid JSON array of events, no additional text or explanations. Example:
[
  {
    "title": "5 Day Silent Vipassana Retreat",
    "category": "Yoga",
    "type": "Retreat",
    "city": "Amsterdam",
    "venue": "De Rode Hoed",
    "date_start": "2026-06-15",
    "date_end": "2026-06-20",
    "language": "English",
    "price_from_eur": 395,
    "short_desc": "Deep meditation practice in the heart of Amsterdam",
    "organizer": "Vipassana Center NL",
    "source_url": "https://example.com/event",
    "tags": "meditation, silent retreat, mindfulness"
  }
]

Find up to ${config.schedule.maxEventsPerRun} high-quality events. Prioritize reputable organizers and established venues.

**IMPORTANT: Only include events with real, verified URLs. Each URL must lead to an actual event page where users can learn more and book. Do not fabricate or guess URLs.**
`;
}

// Parse AI response into structured events
function parseAIResponse(response: string): Partial<Event>[] {
  try {
    // Extract JSON from response (handle markdown code blocks)
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      console.error('❌ No JSON array found in AI response');
      return [];
    }

    const events = JSON.parse(jsonMatch[0]);

    // Add computed fields
    return events.map((event: any) => ({
      ...event,
      id: generateEventId(event),
      country: 'Netherlands' as const,
      duration_days: calculateDuration(event.date_start, event.date_end),
      status: 'published' as const,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));
  } catch (error) {
    console.error('❌ Failed to parse AI response:', error);
    return [];
  }
}

// Rate events based on criteria
async function rateEvents(events: Partial<Event>[]): Promise<Event[]> {
  console.log('\n⭐ Rating events...');

  const ratedEvents: Event[] = [];

  for (const event of events) {
    const ratingPrompt = buildRatingPrompt(event);

    let ratingResponse: string;

    if (aiProvider === 'anthropic' && aiClient instanceof Anthropic) {
      const message = await aiClient.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 500,
        messages: [{ role: 'user', content: ratingPrompt }],
      });
      ratingResponse = message.content[0].type === 'text' ? message.content[0].text : '';
    } else if (aiClient instanceof OpenAI) {
      const completion = await aiClient.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are an expert at evaluating yoga and wellness events.',
          },
          { role: 'user', content: ratingPrompt },
        ],
        temperature: 0.2,
      });
      ratingResponse = completion.choices[0].message.content || '';
    } else {
      throw new Error('Invalid AI provider');
    }

    const { rating, reason } = parseRating(ratingResponse);

    ratedEvents.push({
      ...event,
      rating,
      rating_reason: reason,
    } as Event);

    console.log(`  ${event.title}: ${rating}⭐ - ${reason}`);
  }

  return ratedEvents;
}

// Build rating prompt
function buildRatingPrompt(event: Partial<Event>): string {
  return `
Rate this yoga/wellness event from 1-5 stars based on these criteria:

**Event Details:**
- Title: ${event.title}
- Organizer: ${event.organizer}
- Type: ${event.type}
- Venue: ${event.venue || 'Not specified'}
- Duration: ${event.duration_days} days
- Price: ${event.price_from_eur ? `€${event.price_from_eur}` : 'Not specified'}
- Description: ${event.short_desc}

**Rating Criteria (${JSON.stringify(config.ratingCriteria.weights)}):**
${config.ratingCriteria.rules.map((r: any) => `- ${r.condition} → ${r.impact} (${r.reason})`).join('\n')}

**Output Format:**
Return ONLY a JSON object:
{
  "rating": 4.5,
  "reason": "Brief explanation (max 100 chars)"
}
`;
}

// Parse rating from AI response
function parseRating(response: string): { rating: number; reason: string } {
  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        rating: Math.max(1, Math.min(5, parsed.rating)),
        reason: parsed.reason.substring(0, 100),
      };
    }
  } catch (error) {
    console.error('Failed to parse rating, using default');
  }

  return { rating: 3.0, reason: 'Unable to rate' };
}

// Helper: Calculate duration
function calculateDuration(start: string, end: string): number {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
}

// Helper: Generate event ID
function generateEventId(event: any): string {
  const category = event.category.toLowerCase();
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 7);
  return `${category}-${timestamp}-${random}`;
}

// Deduplicate events
function deduplicateEvents(newEvents: Event[], existingEvents: Event[]): Event[] {
  const deduplicated: Event[] = [];

  for (const newEvent of newEvents) {
    const duplicate = existingEvents.find((existing) => {
      // Same title and organizer
      if (
        existing.title.toLowerCase() === newEvent.title.toLowerCase() &&
        existing.organizer.toLowerCase() === newEvent.organizer.toLowerCase()
      ) {
        return true;
      }

      // Same venue and dates
      if (
        existing.venue &&
        newEvent.venue &&
        existing.venue.toLowerCase() === newEvent.venue.toLowerCase() &&
        existing.date_start === newEvent.date_start
      ) {
        return true;
      }

      return false;
    });

    if (!duplicate) {
      deduplicated.push(newEvent);
    } else {
      console.log(`  ⚠️  Skipping duplicate: ${newEvent.title}`);
    }
  }

  return deduplicated;
}

// Update events.ts file
async function updateEventsFile(newEvents: Event[]): Promise<void> {
  const eventsFilePath = path.join(process.cwd(), 'src/data/events.ts');
  const fileContent = fs.readFileSync(eventsFilePath, 'utf-8');

  // Parse existing events from file
  const existingEvents = parseExistingEvents(fileContent);
  
  // Filter out past events (keep only future events)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const validEvents = existingEvents.filter((event) => {
    const eventEndDate = new Date(event.date_end);
    return eventEndDate >= today;
  });

  const pastEventsCount = existingEvents.length - validEvents.length;
  if (pastEventsCount > 0) {
    console.log(`\n🗑️  Removing ${pastEventsCount} past events`);
  }

  // Deduplicate new events against valid existing events
  const uniqueNewEvents = deduplicateEvents(newEvents, validEvents);

  if (uniqueNewEvents.length === 0) {
    console.log('\n✅ No new unique events to add');
    if (pastEventsCount > 0) {
      // Still need to update file to remove past events
      await rewriteEventsFile(validEvents);
    }
    return;
  }

  console.log(`\n📝 Adding ${uniqueNewEvents.length} new events to events.ts...`);
  console.log(`📊 Keeping ${validEvents.length} existing valid events`);

  // Combine valid existing events with new events
  const allEvents = [...validEvents, ...uniqueNewEvents];

  // Rewrite the entire file
  await rewriteEventsFile(allEvents);
  
  console.log('✅ events.ts updated successfully\n');
}

// Parse existing events from the file content
function parseExistingEvents(fileContent: string): Partial<Event>[] {
  const events: Partial<Event>[] = [];
  
  // Extract the seedEvents array content
  const match = fileContent.match(/export const seedEvents: Event\[\] = \[([\s\S]*?)\];/);
  if (!match) {
    return events;
  }

  const eventsText = match[1];
  
  // Split by event objects (looking for closing brace followed by comma and opening brace)
  const eventMatches = eventsText.match(/\{[^}]*\}/gs);
  
  if (eventMatches) {
    for (const eventText of eventMatches) {
      try {
        // Extract key fields for deduplication
        const title = eventText.match(/title:\s*['"]([^'"]+)['"]/)?.[1];
        const organizer = eventText.match(/organizer:\s*['"]([^'"]+)['"]/)?.[1];
        const venue = eventText.match(/venue:\s*['"]([^'"]+)['"]/)?.[1];
        const date_start = eventText.match(/date_start:\s*['"]([^'"]+)['"]/)?.[1];
        const date_end = eventText.match(/date_end:\s*['"]([^'"]+)['"]/)?.[1];
        
        if (title && organizer && date_start && date_end) {
          events.push({
            title,
            organizer,
            venue,
            date_start,
            date_end,
          });
        }
      } catch (error) {
        console.error('Error parsing event:', error);
      }
    }
  }
  
  return events;
}

// Rewrite the entire events.ts file with new event data
async function rewriteEventsFile(events: Event[]): Promise<void> {
  const eventsFilePath = path.join(process.cwd(), 'src/data/events.ts');
  
  const eventsCode = events
    .map((event) => {
      return `  {
    id: '${event.id}',
    title: '${event.title}',
    category: '${event.category}',
    type: '${event.type}',
    country: '${event.country}',
    city: '${event.city}',
    ${event.venue ? `venue: '${event.venue}',` : ''}
    date_start: '${event.date_start}',
    date_end: '${event.date_end}',
    duration_days: ${event.duration_days},
    language: '${event.language}',
    ${event.price_from_eur ? `price_from_eur: ${event.price_from_eur},` : ''}
    short_desc: '${(event.short_desc || '').replace(/'/g, "\\'")}',
    ${event.image_url ? `image_url: '${event.image_url}',` : ''}
    organizer: '${event.organizer}',
    source_url: '${event.source_url}',
    ${event.tags ? `tags: '${event.tags}',` : ''}
    status: '${event.status}',
    ${event.featured ? `featured: ${event.featured},` : ''}
    ${event.rating ? `rating: ${event.rating},` : ''}
    ${event.rating_reason ? `rating_reason: '${(event.rating_reason || '').replace(/'/g, "\\'")}',` : ''}
    created_at: '${event.created_at}',
    updated_at: '${event.updated_at}'
  }`;
    })
    .join(',\n');

  const fileContent = `import { Event } from '@/types/event';

// Calculate duration helper
const calculateDuration = (startDate: string, endDate: string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
};

// Seed events data based on provided listings
export const seedEvents: Event[] = [
${eventsCode}
];

// Calculate duration for all events
seedEvents.forEach(event => {
  event.duration_days = calculateDuration(event.date_start, event.date_end);
});

export default seedEvents;
`;

  fs.writeFileSync(eventsFilePath, fileContent, 'utf-8');
}

// Main execution
async function main() {
  try {
    console.log('🚀 AI Event Scraper started\n');
    console.log(`Time: ${new Date().toISOString()}`);
    console.log(`Config: ${configPath}\n`);

    const events = await scrapeEventsWithAI();

    if (events.length === 0) {
      console.log('ℹ️  No new events found');
      return;
    }

    await updateEventsFile(events);

    console.log('✅ Event scraping completed successfully!');
    console.log(`\n📊 Summary:`);
    console.log(`  - Events found: ${events.length}`);
    console.log(`  - Average rating: ${(events.reduce((sum, e) => sum + (e.rating || 0), 0) / events.length).toFixed(1)}⭐`);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();
