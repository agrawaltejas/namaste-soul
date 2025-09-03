import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import EventFilters from '@/components/EventFilters';
import EventsGrid from '@/components/EventsGrid';
import FeaturedEvents from '@/components/FeaturedEvents';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import { EventFilters as EventFiltersType } from '@/types/event';
import { useEventFiltering } from '@/hooks/useEventFiltering';
import seedEvents from '@/data/events';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<EventFiltersType>({});

  // Filter events based on search and filters
  const filteredEvents = useEventFiltering(seedEvents, filters, searchQuery);

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={setSearchQuery} searchQuery={searchQuery} />
      
      <main>
        <Hero onSearch={setSearchQuery} searchQuery={searchQuery} />
        
        <FeaturedEvents events={seedEvents} />
        
        <section id="explore" className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Explore All Events
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Find your perfect spiritual experience from retreats to workshops
              </p>
            </div>
            
            <EventFilters 
              filters={filters}
              onFiltersChange={setFilters}
              totalResults={filteredEvents.length}
            />
            
            <EventsGrid events={filteredEvents} />
          </div>
        </section>
        
        <Newsletter />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
