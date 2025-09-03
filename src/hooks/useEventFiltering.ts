import { useMemo } from 'react';
import { Event, EventFilters } from '@/types/event';

export const useEventFiltering = (events: Event[], filters: EventFilters, searchQuery: string) => {
  return useMemo(() => {
    let filtered = events.filter(event => event.status === 'published');

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(query) ||
        event.short_desc.toLowerCase().includes(query) ||
        event.category.toLowerCase().includes(query) ||
        event.type.toLowerCase().includes(query) ||
        event.city.toLowerCase().includes(query) ||
        event.organizer.toLowerCase().includes(query)
      );
    }

    // Country filter
    if (filters.country) {
      filtered = filtered.filter(event => event.country === filters.country);
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(event => event.category === filters.category);
    }

    // Type filter
    if (filters.type) {
      filtered = filtered.filter(event => event.type === filters.type);
    }

    // Language filter
    if (filters.language) {
      filtered = filtered.filter(event => 
        event.language.toLowerCase().includes(filters.language!.toLowerCase())
      );
    }

    // Date range filter
    if (filters.dateRange) {
      const now = new Date();
      const startOfWeekend = new Date(now);
      const endOfWeekend = new Date(now);
      const next30Days = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000));
      
      // Get next Saturday and Sunday
      const daysUntilSaturday = (6 - now.getDay()) % 7;
      startOfWeekend.setDate(now.getDate() + daysUntilSaturday);
      endOfWeekend.setDate(startOfWeekend.getDate() + 1);

      if (filters.dateRange === 'this-weekend') {
        filtered = filtered.filter(event => {
          const eventStart = new Date(event.date_start);
          const eventEnd = new Date(event.date_end);
          return (eventStart >= startOfWeekend && eventStart <= endOfWeekend) ||
                 (eventEnd >= startOfWeekend && eventEnd <= endOfWeekend) ||
                 (eventStart <= startOfWeekend && eventEnd >= endOfWeekend);
        });
      } else if (filters.dateRange === 'next-30-days') {
        filtered = filtered.filter(event => {
          const eventStart = new Date(event.date_start);
          return eventStart >= now && eventStart <= next30Days;
        });
      }
    }

    // Duration filter
    if (filters.duration) {
      filtered = filtered.filter(event => {
        switch (filters.duration) {
          case '1-day':
            return event.duration_days === 1;
          case 'weekend':
            return event.duration_days >= 2 && event.duration_days <= 3;
          case '3-4-days':
            return event.duration_days >= 3 && event.duration_days <= 4;
          case '5-7-days':
            return event.duration_days >= 5 && event.duration_days <= 7;
          case '1-week-plus':
            return event.duration_days >= 7;
          default:
            return true;
        }
      });
    }

    // Price range filter
    if (filters.priceRange?.min !== undefined || filters.priceRange?.max !== undefined) {
      filtered = filtered.filter(event => {
        if (!event.price_from_eur) return filters.priceRange?.min === undefined || filters.priceRange.min === 0;
        
        const meetsMin = filters.priceRange?.min === undefined || event.price_from_eur >= filters.priceRange.min;
        const meetsMax = filters.priceRange?.max === undefined || event.price_from_eur <= filters.priceRange.max;
        
        return meetsMin && meetsMax;
      });
    }

    // Sort by: Featured first, then by start date
    filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      
      const dateA = new Date(a.date_start);
      const dateB = new Date(b.date_start);
      return dateA.getTime() - dateB.getTime();
    });

    return filtered;
  }, [events, filters, searchQuery]);
};