import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import EventFilters from '@/components/EventFilters';
import EventsGrid from '@/components/EventsGrid';
import FeaturedEvents from '@/components/FeaturedEvents';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import Pagination from '@/components/Pagination';
import Reveal from '@/components/Reveal';
import { EventFilters as EventFiltersType } from '@/types/event';
import { useEventFiltering } from '@/hooks/useEventFiltering';
import seedEvents from '@/data/events';

/** Four rows of three. Twenty seed events therefore split across two pages. */
const PAGE_SIZE = 12;

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<EventFiltersType>({});
  const [page, setPage] = useState(1);

  const filteredEvents = useEventFiltering(seedEvents, filters, searchQuery);

  const totalPages = Math.max(1, Math.ceil(filteredEvents.length / PAGE_SIZE));

  // Narrowing the results can leave you stranded past the last page, so clamp
  // on render rather than trusting state to be in range.
  const currentPage = Math.min(page, totalPages);

  const pageEvents = filteredEvents.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // Any change to the query or the filters starts you back at page one.
  useEffect(() => {
    setPage(1);
  }, [filters, searchQuery]);

  const handlePageChange = (next: number) => {
    setPage(next);
    // Return to the top of the listing; scroll-padding-top clears the header.
    document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={setSearchQuery} searchQuery={searchQuery} />

      <main>
        <Hero onSearch={setSearchQuery} searchQuery={searchQuery} />

        <FeaturedEvents events={seedEvents} />

        <section id="explore" className="py-24 md:py-32">
          <div className="container mx-auto">
            <Reveal>
              <div className="mb-12 max-w-2xl">
                <div className="label-eyebrow mb-4 text-night">The index</div>
                <h2 className="text-display-sm font-display font-light">
                  Every gathering,
                  <span className="italic"> in one place</span>
                </h2>
                <p className="mt-6 font-light leading-relaxed text-muted-foreground">
                  Retreats, workshops, trainings and festivals across the
                  Netherlands — filter by practice, format, length or language.
                </p>
              </div>
            </Reveal>

            <EventFilters
              filters={filters}
              onFiltersChange={setFilters}
              totalResults={filteredEvents.length}
            />

            <EventsGrid events={pageEvents} />

            <Pagination
              page={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </section>

        <Newsletter />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
