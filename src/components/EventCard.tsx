import { ArrowUpRight } from 'lucide-react';
import { Event } from '@/types/event';
import { buildAffiliateUrl } from '@/lib/utils';
import { format } from 'date-fns';

interface EventCardProps {
  event: Event;
  /** The lead card in the featured block renders larger and landscape. */
  variant?: 'default' | 'feature';
}

/* One quiet earth tone per discipline, shown as a single dot rather than
   four competing badge colours. Restraint is the point. */
const categoryDot: Record<Event['category'], string> = {
  Yoga: 'bg-primary',      // terracotta
  Ayurveda: 'bg-secondary', // moss
  Astrology: 'bg-night',    // indigo
  Tantra: 'bg-saffron'      // marigold
};

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80';

const EventCard = ({ event, variant = 'default' }: EventCardProps) => {
  const startDate = new Date(event.date_start);
  const endDate = new Date(event.date_end);

  const formatDateRange = () => {
    if (event.date_start === event.date_end) {
      return format(startDate, 'd MMM yyyy');
    }
    if (startDate.getMonth() === endDate.getMonth()) {
      return `${format(startDate, 'd')}–${format(endDate, 'd MMM yyyy')}`;
    }
    return `${format(startDate, 'd MMM')} – ${format(endDate, 'd MMM yyyy')}`;
  };

  const isFeature = variant === 'feature';

  return (
    <a
      href={buildAffiliateUrl(event.source_url)}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="group block focus-visible:outline-offset-4"
    >
      {/* Image */}
      <div
        className={[
          'relative overflow-hidden bg-muted',
          isFeature ? 'aspect-[16/9]' : 'aspect-[3/2]'
        ].join(' ')}
      >
        <img
          src={event.image_url || FALLBACK_IMAGE}
          alt={event.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform [transition-duration:1200ms] ease-out-soft group-hover:scale-[1.05]"
        />

        {event.featured && !isFeature && (
          <span className="label-eyebrow absolute left-4 top-4 bg-background/92 px-2.5 py-1.5 text-foreground">
            Featured
          </span>
        )}

        {/* Arrow affordance — the only hover ornament */}
        <span
          aria-hidden="true"
          className="absolute right-0 bottom-0 grid h-9 w-9 place-items-center bg-background
                     translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out-soft"
        >
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
        </span>
      </div>

      {/* Type */}
      <div className={isFeature ? 'pt-5' : 'pt-4'}>
        <div className="label-eyebrow flex items-center gap-2.5 text-muted-foreground">
          <span
            aria-hidden="true"
            className={`h-1.5 w-1.5 rounded-full ${categoryDot[event.category]}`}
          />
          <span>{event.category}</span>
          <span aria-hidden="true" className="text-border-strong">/</span>
          <span>{event.type}</span>
        </div>

        <h3
          className={[
            'font-display font-normal leading-snug mt-2.5 transition-colors duration-300 group-hover:text-primary',
            isFeature ? 'text-xl md:text-2xl' : 'text-lg'
          ].join(' ')}
        >
          {event.title}
        </h3>

        <p
          className={[
            'mt-2 font-light leading-relaxed text-muted-foreground',
            isFeature ? 'text-base line-clamp-3 max-w-xl' : 'text-sm line-clamp-2'
          ].join(' ')}
        >
          {event.short_desc}
        </p>

        {/* Metadata sits below a hairline, in the print-caption register */}
        <div className="mt-4 flex items-end justify-between gap-6 border-t border-border pt-3">
          <div className="min-w-0 text-sm">
            <div className="text-foreground">{formatDateRange()}</div>
            <div className="mt-1 truncate text-muted-foreground">
              {event.city}
              <span aria-hidden="true" className="mx-1.5 text-border-strong">·</span>
              {event.duration_days === 1 ? '1 day' : `${event.duration_days} days`}
              <span aria-hidden="true" className="mx-1.5 text-border-strong">·</span>
              {event.language}
            </div>
          </div>

          <div className="shrink-0 text-right">
            {event.price_from_eur ? (
              <>
                <div className="label-eyebrow text-muted-foreground">From</div>
                <div className="font-display text-lg leading-tight">
                  €{event.price_from_eur}
                </div>
              </>
            ) : (
              <div className="label-eyebrow text-muted-foreground">On request</div>
            )}
          </div>
        </div>
      </div>
    </a>
  );
};

export default EventCard;
