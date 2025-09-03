import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Mail, Send, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Simulate newsletter subscription
    setTimeout(() => {
      setIsSubscribed(true);
      toast({
        title: "Welcome to NamasteSoul! 🙏",
        description: "You'll receive curated event updates weekly.",
      });
      setEmail('');
    }, 1000);
  };

  if (isSubscribed) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto text-center p-8 bg-gradient-card border-primary/20 shadow-medium">
            <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Thank you for subscribing!</h3>
            <p className="text-muted-foreground">
              You're all set to receive our weekly digest of the most inspiring holistic events.
            </p>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto text-center p-8 bg-gradient-card border-border shadow-medium">
          <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Stay In The Flow</h3>
          <p className="text-muted-foreground mb-6">
            Get weekly updates on the most inspiring yoga retreats, ayurveda workshops, 
            and spiritual events in your inbox.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-background border-border"
              required
            />
            <Button 
              type="submit"
              className="bg-gradient-primary hover:opacity-90 transition-gentle px-6"
            >
              <Send className="h-4 w-4 mr-2" />
              Subscribe
            </Button>
          </form>
          
          <p className="text-sm text-muted-foreground mt-4">
            Free weekly digest • Unsubscribe anytime • No spam, just soulful events
          </p>
        </Card>
      </div>
    </section>
  );
};

export default Newsletter;