import EventCard from './EventCard';
import { Event } from '@/types/event';

interface FeaturedEventsProps {
  events: Event[];
}

const FeaturedEvents = ({ events }: FeaturedEventsProps) => {
  const featuredEvents = events.filter(event => event.featured).slice(0, 4);

  if (featuredEvents.length === 0) return null;

  return (
    <section className="py-16 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Featured Events
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Handpicked experiences for your spiritual journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {featuredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;