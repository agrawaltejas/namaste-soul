import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Filter, Calendar, MapPin, Tag, Clock } from 'lucide-react';
import { EventFilters as EventFiltersType } from '@/types/event';

interface EventFiltersProps {
  filters: EventFiltersType;
  onFiltersChange: (filters: EventFiltersType) => void;
  totalResults: number;
}

const EventFilters = ({ filters, onFiltersChange, totalResults }: EventFiltersProps) => {
  const updateFilter = (key: keyof EventFiltersType, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilter = (key: keyof EventFiltersType) => {
    const newFilters = { ...filters };
    delete newFilters[key];
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    onFiltersChange({});
  };

  const activeFiltersCount = Object.keys(filters).length;

  return (
    <Card className="p-6 mb-8 bg-gradient-card border-border shadow-soft sticky top-20 z-40">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-lg">Filters</h3>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {activeFiltersCount}
            </Badge>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear all
          </Button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Country Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            Country
          </label>
          <Select
            value={filters.country || undefined}
            onValueChange={(value) => updateFilter('country', value === 'all' ? undefined : value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All countries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All countries</SelectItem>
              <SelectItem value="Netherlands">Netherlands</SelectItem>
              <SelectItem value="India">India</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Category Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-1">
            <Tag className="h-4 w-4" />
            Category
          </label>
          <Select
            value={filters.category || undefined}
            onValueChange={(value) => updateFilter('category', value === 'all' ? undefined : value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              <SelectItem value="Yoga">🧘 Yoga</SelectItem>
              <SelectItem value="Ayurveda">🌿 Ayurveda</SelectItem>
              <SelectItem value="Astrology">🔭 Astrology</SelectItem>
              <SelectItem value="Tantra">🔥 Tantra</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Type Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Type</label>
          <Select
            value={filters.type || undefined}
            onValueChange={(value) => updateFilter('type', value === 'all' ? undefined : value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="Retreat">Retreat</SelectItem>
              <SelectItem value="Workshop">Workshop</SelectItem>
              <SelectItem value="Festival">Festival</SelectItem>
              <SelectItem value="Training">Training</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date Range Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            When
          </label>
          <Select
            value={filters.dateRange || undefined}
            onValueChange={(value) => updateFilter('dateRange', value === 'all' ? undefined : value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Anytime" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Anytime</SelectItem>
              <SelectItem value="this-weekend">This Weekend</SelectItem>
              <SelectItem value="next-30-days">Next 30 Days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Duration Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-1">
            <Clock className="h-4 w-4" />
            Duration
          </label>
          <Select
            value={filters.duration || undefined}
            onValueChange={(value) => updateFilter('duration', value === 'all' ? undefined : value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any length" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any length</SelectItem>
              <SelectItem value="1-day">1 Day</SelectItem>
              <SelectItem value="weekend">Weekend (2-3 days)</SelectItem>
              <SelectItem value="3-4-days">3-4 Days</SelectItem>
              <SelectItem value="5-7-days">5-7 Days</SelectItem>
              <SelectItem value="1-week-plus">1+ Week</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Language Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Language</label>
          <Select
            value={filters.language || undefined}
            onValueChange={(value) => updateFilter('language', value === 'all' ? undefined : value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All languages" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All languages</SelectItem>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Dutch">Dutch</SelectItem>
              <SelectItem value="Mixed">Mixed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex flex-wrap gap-2">
            {filters.country && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Country: {filters.country}
                <X
                  className="h-3 w-3 cursor-pointer hover:text-destructive"
                  onClick={() => clearFilter('country')}
                />
              </Badge>
            )}
            {filters.category && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {filters.category}
                <X
                  className="h-3 w-3 cursor-pointer hover:text-destructive"
                  onClick={() => clearFilter('category')}
                />
              </Badge>
            )}
            {filters.type && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {filters.type}
                <X
                  className="h-3 w-3 cursor-pointer hover:text-destructive"
                  onClick={() => clearFilter('type')}
                />
              </Badge>
            )}
            {filters.dateRange && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {filters.dateRange === 'this-weekend' ? 'This Weekend' :
                 filters.dateRange === 'next-30-days' ? 'Next 30 Days' :
                 filters.dateRange}
                <X
                  className="h-3 w-3 cursor-pointer hover:text-destructive"
                  onClick={() => clearFilter('dateRange')}
                />
              </Badge>
            )}
            {filters.duration && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {filters.duration === '1-day' ? '1 Day' :
                 filters.duration === 'weekend' ? 'Weekend' :
                 filters.duration === '3-4-days' ? '3-4 Days' :
                 filters.duration === '5-7-days' ? '5-7 Days' :
                 filters.duration === '1-week-plus' ? '1+ Week' : filters.duration}
                <X
                  className="h-3 w-3 cursor-pointer hover:text-destructive"
                  onClick={() => clearFilter('duration')}
                />
              </Badge>
            )}
            {filters.language && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {filters.language}
                <X
                  className="h-3 w-3 cursor-pointer hover:text-destructive"
                  onClick={() => clearFilter('language')}
                />
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="mt-4 text-sm text-muted-foreground">
        {totalResults} event{totalResults !== 1 ? 's' : ''} found
      </div>
    </Card>
  );
};

export default EventFilters;