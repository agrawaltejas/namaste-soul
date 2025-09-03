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
      className="relative min-h-[70vh] flex items-center justify-center bg-gradient-hero overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Brand & Tagline */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              NamasteSoul
            </span>
          </h1>
          <h2 className="text-xl md:text-2xl text-muted-foreground font-medium mb-8">
            Ancient Wisdom, Modern Wellbeing
          </h2>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground leading-tight">
            Discover Holistic Events in Netherlands
          </h3>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
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