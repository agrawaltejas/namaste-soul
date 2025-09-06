import { Button } from '@/components/ui/button';
import { Mail, Plus, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary/5 border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Quick Links - Left */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#explore" className="hover:text-primary transition-smooth">All Events</a></li>
              <li><a href="#explore" className="hover:text-primary transition-smooth">🧘 Yoga</a></li>
              <li><a href="#explore" className="hover:text-primary transition-smooth">🌿 Ayurveda</a></li>
              <li><a href="#explore" className="hover:text-primary transition-smooth">🔭 Astrology</a></li>
              <li><a href="#explore" className="hover:text-primary transition-smooth">🔥 Tantra</a></li>
            </ul>
          </div>

          {/* Brand - Center */}
          <div className="text-center">
            <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              NamasteSoul
            </div>
            <p className="text-muted-foreground mb-4">
              Ancient Wisdom, Modern Wellbeing
            </p>
            <Button 
              size="lg"
              className="bg-gradient-primary hover:opacity-90 transition-gentle"
              onClick={() => window.location.href = '#submit'}
            >
              <Plus className="h-4 w-4 mr-2" />
              Submit Your Event
            </Button>
          </div>

          {/* Contact & Legal - Right */}
          <div className="text-center md:text-right">
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a 
                  href="mailto:namaste.soul.contact@gmail.com" 
                  className="hover:text-primary transition-smooth inline-flex items-center gap-2 justify-center md:justify-end"
                >
                  <Mail className="h-4 w-4" />
                  Contact Us
                </a>
              </li>
              <li><a href="#about" className="hover:text-primary transition-smooth">About</a></li>
              <li><a href="#submit" className="hover:text-primary transition-smooth">For Organizers</a></li>
              <li><a href="#legal" className="hover:text-primary transition-smooth">Privacy & Terms</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 NamasteSoul. Made with 🙏 for the spiritual community.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;