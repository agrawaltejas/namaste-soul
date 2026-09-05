import EventCard from './EventCard';
import Reveal from './Reveal';
import { Event } from '@/types/event';

interface FeaturedEventsProps {
  events: Event[];
}

const FeaturedEvents = ({ events }: FeaturedEventsProps) => {
  const featured = events.filter((event) => event.featured).slice(0, 5);
  if (featured.length === 0) return null;

  // Asymmetric by design: a lead story, a companion, then an even row.
  const [lead, second, ...rest] = featured;

  return (
    <section id="featured" className="bg-surface py-16 md:py-20">
      <div className="container mx-auto">
        {/* Section head — left-aligned, the way a magazine sets a department */}
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10 md:mb-12">
            <div>
              <div className="label-eyebrow text-primary mb-3">Selected</div>
              <h2 className="text-3xl md:text-4xl font-display font-light max-w-lg">
                Gatherings worth
                <span className="italic"> travelling for</span>
              </h2>
            </div>
            <a
              href="#explore"
              className="label-eyebrow link-underline text-muted-foreground hover:text-foreground transition-colors pb-1"
            >
              All events
            </a>
          </div>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-10 items-start">
          <Reveal className="lg:col-span-7">
            <EventCard event={lead} variant="feature" />
          </Reveal>

          {second && (
            <Reveal className="lg:col-span-5" delay={120}>
              <EventCard event={second} />
            </Reveal>
          )}
        </div>

        {rest.length > 0 && (
          <div className="mt-12 grid gap-10 border-t border-border pt-12 md:grid-cols-3">
            {rest.map((event, i) => (
              <Reveal key={event.id} delay={i * 100}>
                <EventCard event={event} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedEvents;
