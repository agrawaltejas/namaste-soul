# AGENTS.md — NamasteSoul

Working notes for anyone (human or agent) changing this site. Read the
**Design system** and **Gotchas** sections before touching styling.

Live: https://www.namastesoul.org · Stack: Vite + React 18 + TS + Tailwind +
shadcn/ui, data in Supabase, deployed to GitHub Pages via GitHub Actions.

---

## Commands

```sh
npm run dev        # dev server, HMR          → http://localhost:8080
npm run build      # production build         → dist/
npm run preview    # serve the real build     → http://localhost:4173
npm run lint       # eslint
npx tsc --noEmit -p tsconfig.app.json         # typecheck only
```

Always run **typecheck + build** after a change. Rollup fails hard on a missing
import, so a green build proves nothing is orphaned. `npm run lint` should
report **0 errors** (one warning inside shadcn's `ui/sonner.tsx` is expected).

---

## Layout

```
src/
  components/        Page sections — one file per section
    ui/              shadcn primitives — ONLY the 7 in use
  pages/             Index, NotFound
  hooks/             useEventFiltering, use-toast, use-mobile
  lib/               supabase client, buildAffiliateUrl, cn
  types/event.ts     Event, EventFilters, EventFormData — the data contract
  data/events.ts     20 seed events (temporary; Supabase will replace this)
  index.css          Design tokens + component classes  ← start here for styling
tailwind.config.ts   Colour/type/animation scale        ← and here
```

Sections: `Header · Hero · FeaturedEvents · EventFilters · EventsGrid ·
Pagination · Newsletter · Footer`, plus `Reveal` (scroll-reveal wrapper).

**Only 7 shadcn components remain** — `input select sheet sonner toast toaster
tooltip`. Everything else was deleted as unreachable. Need another?
`npx shadcn@latest add <name>`. Don't hand-write one.

---

## Design system — "Editorial Sanctuary"

Warm paper, deep ink, one earthen accent. The feeling is spiritual through
**restraint and materiality**, not through symbols. References: Aesop, Kinfolk,
Wanderlust.

### Rules (these are the design, not preferences)

1. **Hairlines, not shadows.** Structure comes from `border-border` rules.
   `--shadow-lift` exists but is essentially unused. Don't add drop shadows.
2. **No emoji.** Ever. Use lucide line icons at `strokeWidth={1.5}`.
   Emoji render differently per OS and clash with the serif type.
3. **One saturated colour.** Terracotta `--primary` carries the page.
   `--secondary` (moss), `--accent` (ochre), `--night` (indigo) and
   `--saffron` appear only as small marks — category dots, eyebrows.
4. **Near-square geometry.** `--radius: 0.125rem`. Printed, not bubbly.
5. **Metadata is `.label-eyebrow`** — 11px, uppercase, `0.16em` tracking.
   Category labels, section eyebrows, footer headings, nav, buttons.
6. **Display type is Fraunces, body is Inter.** `h1/h2/h3` pick up Fraunces
   automatically via `index.css`. Use `font-display` elsewhere.
7. **Motion is a gentle rise.** Wrap in `<Reveal>`. No pulses, no bounces.
   Everything is neutralised under `prefers-reduced-motion`.

### Colour tokens (`src/index.css`, HSL triplets, no `hsl()` wrapper)

| Token | Light | Role |
|---|---|---|
| `--background` | `38 28% 96%` | warm bone paper |
| `--foreground` | `25 18% 13%` | warm ink |
| `--surface` | `36 26% 93%` | sand band (FeaturedEvents) |
| `--primary` | `16 56% 44%` | **terracotta — the accent** |
| `--secondary` | `145 12% 36%` | muted moss |
| `--accent` | `38 52% 50%` | ochre |
| `--night` | `236 34% 34%` | deep indigo |
| `--saffron` | `32 76% 52%` | marigold |
| `--border` | `30 14% 84%` | hairline |
| `--border-strong` | `28 12% 72%` | icons at rest, dividers |

Every token has a `.dark` counterpart. **Keep them in sync** — a dark-mode
toggle isn't wired up yet, but the tokens are ready for it.

To restyle the whole site, change `--background`, `--foreground` and
`--primary`. Everything inherits.

### Type scale

`text-display-lg / -md / -sm` are fluid `clamp()` sizes in `tailwind.config.ts`.
Section headings currently use `text-3xl md:text-4xl` (FeaturedEvents) and
`text-display-sm` (the index) — **these two are deliberately unmatched right
now**; match them if asked.

### Helper classes (`index.css`, `@layer components`)

- `.label-eyebrow` — the tracked micro-label
- `.link-underline` — underline grows from the left on hover
- `.scrim-warm` — dark gradient over hero imagery
- `.reveal` / `.reveal-in` — used by `<Reveal>`

---

## Common changes

**Palette / mood** → the token block at the top of `src/index.css`. Six numbers.

**Hero** (`components/Hero.tsx`) — full-bleed image, `scrim-warm`, light type,
`justify-center` in a `52vh`/`56vh` box. The crop is `object-bottom` **on
purpose**: the lotuses and stacked stones live in the lower third of
`hero-bg.jpg` (1920×1080), and a centred crop of a wide frame discards them.
Content is centred, not bottom-aligned — bottom-aligning pools all slack under
the fixed header and sits type on the lotuses.

**Add a filter facet** → one entry in the `FIELDS` array in
`components/EventFilters.tsx`. It drives the control, its icon and the
active-filter chip label. Also add the key to `EventFilters` in
`types/event.ts` and handle it in `hooks/useEventFiltering.ts`.

**Page size** → `PAGE_SIZE` in `pages/Index.tsx` (currently 12 = 4 rows of 3).
Pagination is client-side; the page is clamped on render so narrowing filters
can't strand you on an empty page, and any filter change resets to page 1.

**Nav / CTA** → `navItems` in `components/Header.tsx`. An item with
`cta: true` renders as a bordered button instead of a text link.

**Card layout** → `components/EventCard.tsx`. `variant="feature"` is the larger
landscape lead used in FeaturedEvents. Images are `3/2` (default) and `16/9`
(feature) — they were `4/5` and got shortened because portrait crops ate the
fold.

---

## Gotchas (all of these have already bitten once)

- **Tailwind's spacing scale has no `30`.** `pt-30` compiles to nothing,
  silently, with no error. 28/32/36 exist. Use `pt-[7.5rem]` for in-between
  values, and check the built CSS if a spacing change appears to do nothing.
- **`duration-*` is ambiguous** (transition vs animation) and warns at build.
  Use `[transition-duration:1200ms]` instead.
- **Don't `@apply` a utility inside a rule that includes its own class.**
  `h1, h2, h3, .font-display { @apply font-display }` is a circular reference
  and fails the build. Use `font-family: theme('fontFamily.display')`.
- **`SUPABASE_SERVICE_ROLE_KEY` must never get a `VITE_` prefix.** Vite inlines
  every `VITE_*` var into the client bundle. Only the anon key belongs there
  (it's public by design and guarded by RLS).
- **Fonts load from Google Fonts** via `index.html`. Offline dev falls back to
  Georgia/system sans, which looks wrong but isn't broken.
- **A double hyphen is illegal inside an XML comment.** Writing `--primary` in
  a comment in `favicon.svg` silently produced an invalid file that browsers
  refused to render. Say "the primary token" instead.
- **The favicon is `public/favicon.svg`** (a lotus on terracotta), with
  `favicon.ico` (64px PNG) and `apple-touch-icon.png` (180px) as fallbacks,
  all declared in `index.html`. Chrome caches `/favicon.ico` hard, so replace
  those bytes rather than deleting the file.
- Utilities beat `@layer components`, so a `text-[0.8rem]` utility correctly
  overrides `.label-eyebrow`'s size. That's how the footer headings and nav
  are sized up.

---

## Known gaps

- **`#submit` points at the newsletter section.** Three prominent buttons say
  "Submit your event" and land on an email signup. There is no submission form
  yet — `event_submissions` exists in Supabase but nothing writes to it.
- **`#about`, `#contact`, `#legal` have links but no targets.** Five dead links.
- **The site still reads `src/data/events.ts`, not Supabase.** `lib/supabase.ts`
  exists but nothing imports it.
- **No per-event pages.** One route (`/`), client-rendered, so there is nothing
  for Google to index per event and no `schema.org/Event` markup. This is the
  main SEO blocker; it needs SSR/SSG, which means a framework/hosting decision.
- **Pagination is client-side** — page 2 isn't linkable or crawlable.
- `zod` and `react-hook-form` were removed as unused; re-add them when the
  submission form is built.

---

## Data & ingest context

`types/event.ts` is the contract every source normalises into. The plan for
filling `events`:

1. **Tripaneer XML feed** (affiliate `aid=11461`) — retreats/trainings only,
   ~65–70 NL listings. Requested; awaiting reply.
2. **Structured public data** — `schema.org/Event` JSON-LD, WordPress
   `/wp-json/tribe/events/v1/events`, ICS feeds, sitemaps. This is the bulk of
   the long tail and needs no AI.
3. **AI extraction** (Firecrawl or Playwright + LLM) only for sources with no
   structured data.
4. **Organizer submissions** → `event_submissions`.

Ingest should run in GitHub Actions or a Supabase Edge Function, write with
`status: 'pending'`, and log to `scrape_logs`. Keep the human approval gate.

`buildAffiliateUrl()` (`lib/utils.ts`) appends `aid` and is wired into
`EventCard`. Outbound links use `rel="noopener noreferrer sponsored"`.
