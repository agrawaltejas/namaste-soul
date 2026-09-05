import {
  CalendarDays,
  Clock,
  Flower2,
  Languages,
  MapPin,
  Shapes,
  X,
  type LucideIcon
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { EventFilters as EventFiltersType } from '@/types/event';

interface EventFiltersProps {
  filters: EventFiltersType;
  onFiltersChange: (filters: EventFiltersType) => void;
  totalResults: number;
}

interface Field {
  key: keyof EventFiltersType;
  placeholder: string;
  icon: LucideIcon;
  options: { value: string; label: string }[];
}

/* Declarative field config — one source of truth for the controls, their icons
   and the labels shown on the active-filter chips. A new facet is one entry. */
const FIELDS: Field[] = [
  {
    key: 'country',
    placeholder: 'Anywhere',
    icon: MapPin,
    options: [
      { value: 'Netherlands', label: 'Netherlands' },
      { value: 'India', label: 'India' }
    ]
  },
  {
    key: 'category',
    placeholder: 'All practices',
    icon: Flower2,
    options: [
      { value: 'Yoga', label: 'Yoga' },
      { value: 'Ayurveda', label: 'Ayurveda' },
      { value: 'Astrology', label: 'Astrology' },
      { value: 'Tantra', label: 'Tantra' }
    ]
  },
  {
    key: 'type',
    placeholder: 'Any format',
    icon: Shapes,
    options: [
      { value: 'Retreat', label: 'Retreat' },
      { value: 'Workshop', label: 'Workshop' },
      { value: 'Festival', label: 'Festival' },
      { value: 'Training', label: 'Training' }
    ]
  },
  {
    key: 'dateRange',
    placeholder: 'Anytime',
    icon: CalendarDays,
    options: [
      { value: 'this-weekend', label: 'This weekend' },
      { value: 'next-30-days', label: 'Next 30 days' },
      { value: 'custom', label: 'Custom range' }
    ]
  },
  {
    key: 'duration',
    placeholder: 'Any length',
    icon: Clock,
    options: [
      { value: '1-day', label: '1 day' },
      { value: 'weekend', label: 'Weekend' },
      { value: '3-4-days', label: '3–4 days' },
      { value: '5-7-days', label: '5–7 days' },
      { value: '1-week-plus', label: '1 week +' }
    ]
  },
  {
    key: 'language',
    placeholder: 'Any language',
    icon: Languages,
    options: [
      { value: 'English', label: 'English' },
      { value: 'Dutch', label: 'Dutch' },
      { value: 'Mixed', label: 'Mixed' }
    ]
  }
];

const EventFilters = ({ filters, onFiltersChange, totalResults }: EventFiltersProps) => {
  const updateFilter = (key: keyof EventFiltersType, value: string | undefined) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilter = (key: keyof EventFiltersType) => {
    const next = { ...filters };
    delete next[key];
    onFiltersChange(next);
  };

  const activeCount = Object.keys(filters).length;

  const labelFor = (key: string, value: unknown) => {
    const field = FIELDS.find((f) => f.key === key);
    return field?.options.find((o) => o.value === value)?.label ?? String(value);
  };

  return (
    <div className="sticky top-[3.75rem] z-40 mb-14 border-y border-border bg-background/92 backdrop-blur-md">
      <div className="flex flex-wrap items-center gap-x-7 gap-y-3 py-4">
        {FIELDS.map(({ key, placeholder, icon: Icon, options }) => {
          // A set filter colours its whole control, so the active facets are
          // legible at a glance without reading the chip row below.
          const isActive = Boolean(filters[key]);

          return (
            <Select
              key={key}
              value={(filters[key] as string) || undefined}
              onValueChange={(value) =>
                updateFilter(key, value === 'all' ? undefined : value)
              }
            >
              <SelectTrigger
                aria-label={placeholder}
                className={[
                  'group h-10 w-auto gap-2.5 rounded-none border-0 border-b bg-transparent px-1 pb-2',
                  'text-sm font-normal shadow-none transition-colors',
                  'focus:ring-0 focus:ring-offset-0 [&>span]:truncate',
                  isActive
                    ? 'border-primary text-primary'
                    : 'border-border text-foreground hover:border-border-strong'
                ].join(' ')}
              >
                <Icon
                  className={[
                    'h-4 w-4 shrink-0 transition-colors',
                    isActive ? 'text-primary' : 'text-border-strong group-hover:text-muted-foreground'
                  ].join(' ')}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>

              <SelectContent className="rounded-none border-border">
                <SelectItem value="all">{placeholder}</SelectItem>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        })}

        <div className="ml-auto flex items-center gap-5">
          {activeCount > 0 && (
            <button
              onClick={() => onFiltersChange({})}
              className="label-eyebrow text-muted-foreground transition-colors hover:text-primary"
            >
              Clear all
            </button>
          )}
          <div className="whitespace-nowrap text-sm text-muted-foreground">
            <span className="font-display text-base text-foreground">
              {totalResults}
            </span>{' '}
            {totalResults === 1 ? 'event' : 'events'}
          </div>
        </div>
      </div>

      {activeCount > 0 && (
        <div className="flex flex-wrap gap-2 border-t border-border py-3">
          {Object.entries(filters).map(([key, value]) =>
            value === undefined ? null : (
              <button
                key={key}
                onClick={() => clearFilter(key as keyof EventFiltersType)}
                className="label-eyebrow group flex items-center gap-2 border border-primary/30 bg-primary/[0.06] px-2.5 py-1.5
                           text-primary transition-colors hover:border-primary hover:bg-primary/10"
              >
                {labelFor(key, value)}
                <X className="h-3 w-3 opacity-60 transition-opacity group-hover:opacity-100" />
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default EventFilters;
