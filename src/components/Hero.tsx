import { Search } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

interface HeroProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

const disciplines = ['Yoga', 'Ayurveda', 'Astrology', 'Tantra'];

const Hero = ({ onSearch, searchQuery }: HeroProps) => {
  return (
    <section
      id="top"
      className="relative flex min-h-[52vh] flex-col justify-center overflow-hidden md:min-h-[56vh]"
    >
      {/* Background photograph. Anchored to the bottom: the lotuses and the
          stacked stones live in the lower third, and a centred crop of a wide
          frame discards them along with the sun, leaving only hillside. */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-bottom animate-ken-burns"
        />
        <div className="absolute inset-0 scrim-warm" />
      </div>

      <div className="container relative mx-auto pb-14 pt-28 md:pb-16 md:pt-[7.5rem]">
        <div className="max-w-2xl">
          <div className="label-eyebrow mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-background/70 animate-fade-up">
            <span>Netherlands</span>
            {disciplines.map((d) => (
              <span key={d} className="flex items-center gap-3">
                <span aria-hidden="true" className="text-background/40">/</span>
                {d}
              </span>
            ))}
          </div>

          <h1
            className="text-display-md font-display font-light text-background mb-4 animate-fade-up"
            style={{ animationDelay: '80ms' }}
          >
            Ancient wisdom,
            <br />
            <span className="italic">modern wellbeing.</span>
          </h1>

          <p
            className="mb-8 max-w-md text-base font-light leading-relaxed text-background/80 md:text-lg animate-fade-up"
            style={{ animationDelay: '160ms' }}
          >
            A curated index of retreats, workshops and festivals across the
            Netherlands — gathered in one place.
          </p>

          {/* Search — a rule, not a box */}
          <form
            onSubmit={(e) => e.preventDefault()}
            role="search"
            className="max-w-lg animate-fade-up"
            style={{ animationDelay: '240ms' }}
          >
            <div className="flex items-center border-b border-background/35 transition-colors duration-500 focus-within:border-background">
              <Search
                className="h-5 w-5 shrink-0 text-background/60"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Search retreats, workshops, cities…"
                aria-label="Search events"
                className="w-full bg-transparent px-4 py-3.5 text-base font-light text-background
                           placeholder:text-background/50 focus:outline-none md:text-lg
                           [&::-webkit-search-cancel-button]:appearance-none"
              />
              <a
                href="#explore"
                className="label-eyebrow shrink-0 pl-4 text-background/70 transition-colors hover:text-background"
              >
                Browse
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
