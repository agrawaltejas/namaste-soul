import { Calendar, MapPin, ExternalLink, Clock, Euro } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Event } from '@/types/event';
import { format } from 'date-fns';

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const startDate = new Date(event.date_start);
  const endDate = new Date(event.date_end);
  const isSameDay = event.date_start === event.date_end;

  const formatDateRange = () => {
    if (isSameDay) {
      return format(startDate, 'MMM d, yyyy');
    }
    if (startDate.getMonth() === endDate.getMonth()) {
      return `${format(startDate, 'MMM d')} - ${format(endDate, 'd, yyyy')}`;
    }
    return `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d, yyyy')}`;
  };

  const getCategoryColor = (category: Event['category']) => {
    switch (category) {
      case 'Yoga': return 'bg-primary/10 text-primary hover:bg-primary/20';
      case 'Ayurveda': return 'bg-success/10 text-success hover:bg-success/20';
      case 'Astrology': return 'bg-accent-vibrant/10 text-accent-vibrant hover:bg-accent-vibrant/20';
      case 'Tantra': return 'bg-warning/10 text-warning hover:bg-warning/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'Retreat': return 'bg-primary-light/50 text-primary';
      case 'Workshop': return 'bg-accent/50 text-accent-foreground';
      case 'Festival': return 'bg-warning/10 text-warning';
      case 'Training': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="group hover:shadow-medium transition-smooth bg-gradient-card border-border hover:border-primary/20 rounded-xl overflow-hidden">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={event.image_url || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80'}
          alt={event.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-smooth"
        />
        {event.featured && (
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
            Featured
          </Badge>
        )}
        {event.price_from_eur && (
          <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm rounded-lg px-2 py-1 text-sm font-medium flex items-center gap-1">
            <Euro className="h-3 w-3" />
            {event.price_from_eur}+
          </div>
        )}
      </div>

      <CardHeader className="pb-3">
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="secondary" className={getCategoryColor(event.category)}>
            {event.category}
          </Badge>
          <Badge variant="outline" className={getTypeColor(event.type)}>
            {event.type}
          </Badge>
        </div>
        <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-smooth">
          {event.title}
        </h3>
      </CardHeader>

      <CardContent className="pb-4">
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {event.short_desc}
        </p>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-foreground">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{formatDateRange()}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{event.city}, {event.country}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-foreground">
            <Clock className="h-4 w-4 text-primary" />
            <span>
              {event.duration_days === 1 
                ? '1 day' 
                : `${event.duration_days} days`
              } • {event.language}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button 
          className="w-full bg-gradient-primary hover:opacity-90 transition-gentle"
          onClick={() => window.open(event.source_url, '_blank', 'noopener,noreferrer')}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          View on organizer site
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;