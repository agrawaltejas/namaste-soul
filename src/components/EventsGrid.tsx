import EventCard from './EventCard';
import { Event } from '@/types/event';
import { Search } from 'lucide-react';

interface EventsGridProps {
  events: Event[];
  isLoading?: boolean;
}

const EventsGrid = ({ events, isLoading = false }: EventsGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-muted rounded-xl h-48 mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-16">
        <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
        <h3 className="text-2xl font-semibold mb-2">No events found</h3>
        <p className="text-muted-foreground mb-6">
          Try adjusting your filters or search terms to discover more events.
        </p>
        <div className="text-sm text-muted-foreground">
          Looking for something specific? 
          <a 
            href="#submit" 
            className="text-primary hover:underline ml-1"
          >
            Submit your event
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventsGrid;