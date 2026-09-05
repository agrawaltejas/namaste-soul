import EventCard from './EventCard';
import Reveal from './Reveal';
import { Event } from '@/types/event';

interface EventsGridProps {
  events: Event[];
  isLoading?: boolean;
}

const EventsGrid = ({ events, isLoading = false }: EventsGridProps) => {
  if (isLoading) {
    return (
      <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[3/2] bg-muted" />
            <div className="space-y-3 pt-4">
              <div className="h-2 w-24 bg-muted" />
              <div className="h-4 w-3/4 bg-muted" />
              <div className="h-3 w-full bg-muted" />
              <div className="h-3 w-2/3 bg-muted" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="border-t border-border py-24 text-center">
        <div className="label-eyebrow text-muted-foreground mb-5">
          Nothing matches
        </div>
        <h3 className="text-display-sm font-display font-light mb-5">
          No events found
        </h3>
        <p className="mx-auto mb-10 max-w-md font-light leading-relaxed text-muted-foreground">
          Try widening your filters or searching a different city. New listings
          are gathered every day.
        </p>
        <a
          href="#submit"
          className="label-eyebrow link-underline text-primary"
        >
          Submit an event
        </a>
      </div>
    );
  }

  return (
    <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event, i) => (
        // Stagger only the first screenful; later rows arrive on scroll anyway.
        <Reveal key={event.id} delay={Math.min(i, 5) * 80}>
          <EventCard event={event} />
        </Reveal>
      ))}
    </div>
  );
};

export default EventsGrid;
