# NamasteSoul

Curated yoga, Ayurveda, astrology and tantra events in the Netherlands (India coming later).

Live: **https://www.namastesoul.org**

## Stack

| Layer | Choice |
|---|---|
| Frontend | Vite + React 18 + TypeScript |
| UI | Tailwind CSS + shadcn/ui (Radix primitives) |
| Data | Supabase (Postgres + Auth + RLS) |
| Hosting | GitHub Pages (static SPA) via GitHub Actions |

## Getting started

```sh
npm install
cp .env.example .env    # fill in your Supabase project values
npm run dev             # http://localhost:8080
```

### Environment variables

| Variable | Purpose |
|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key (public; safe to ship, guarded by RLS) |
| `VITE_AFFILIATE_ID` | Tripaneer affiliate ID for outbound booking links |

## Scripts

| Command | Does |
|---|---|
| `npm run dev` | Dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint |

## Layout

```
src/
  components/     Page sections (Hero, EventsGrid, EventCard, Filters, ...)
    ui/           shadcn/ui primitives — only the 10 actually in use
  pages/          Route components (Index, NotFound)
  hooks/          useEventFiltering, use-toast, use-mobile
  lib/            supabase client, buildAffiliateUrl, cn
  types/          Event, EventFilters, EventFormData
  data/           Seed events (temporary — being replaced by Supabase)
```

Need another shadcn component? `npx shadcn@latest add <name>` — unused ones were
removed deliberately to keep the tree small.

## Database

Supabase holds six tables: `events`, `profiles`, `event_submissions`,
`newsletter_subscribers`, `contact_messages`, `scrape_logs`. Row Level Security
is enabled on all of them.

## Deployment

Pushing to `main` triggers [.github/workflows/deploy.yml](.github/workflows/deploy.yml),
which builds and publishes to GitHub Pages. The custom domain is pinned by [CNAME](CNAME).

## Roadmap

- [x] Supabase schema + client, affiliate URL builder
- [ ] Read events from Supabase instead of `src/data/events.ts`
- [ ] Daily ingest: JSON-LD / `wp-json` / ICS sources → `events` (status `pending`)
- [ ] Tripaneer XML feed integration
- [ ] Organizer submission flow
- [ ] Per-event pages with `schema.org/Event` markup
