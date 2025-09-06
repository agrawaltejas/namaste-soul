import { Button } from '@/components/ui/button';
import { Mail, Plus, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary/5 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          {/* Brand */}
          <div className="mb-6">
            <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              NamasteSoul
            </div>
            <p className="text-muted-foreground mb-6">
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
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>© 2025 NamasteSoul. Made with 🙏 for the spiritual community.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;