import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Calendar } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

interface HeroProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

const Hero = ({ onSearch, searchQuery }: HeroProps) => {
  return (
    <section 
      className="relative min-h-[50vh] flex items-center justify-center bg-gradient-hero overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Brand & Tagline */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Ancient Wisdom, Modern Wellbeing
            </span>
          </h1>
          <h2 className="text-base md:text-lg font-medium text-muted-foreground leading-tight">
            Discover Holistic Events in Netherlands
          </h2>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search for yoga retreats, ayurveda workshops, astrology courses..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              className="pl-12 pr-24 h-14 text-lg bg-card/80 backdrop-blur-sm border-border shadow-medium focus:ring-primary focus:border-primary rounded-xl"
            />
            <Button 
              size="lg" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-primary hover:opacity-90 transition-gentle rounded-lg"
            >
              Search
            </Button>
          </div>
        </div>

        {/* Quick Stats/Features */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <span>Netherlands</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-muted-foreground rounded-full"></div>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <span>Updated Daily</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-muted-foreground rounded-full"></div>
          <div className="flex items-center gap-2">
            <span className="h-5 w-5 text-primary text-xl">🧘</span>
            <span>Curated Events</span>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-primary/5 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-accent-vibrant/10 rounded-full blur-2xl animate-pulse delay-700"></div>
    </section>
  );
};

export default Hero;