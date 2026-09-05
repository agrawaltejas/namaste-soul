import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // TODO: replace with a Supabase insert into `newsletter_subscribers`
    setIsSubscribed(true);
    toast({
      title: 'You are on the list',
      description: 'A curated digest will reach you each week.'
    });
    setEmail('');
  };

  return (
    <section
      id="submit"
      className="bg-foreground py-24 text-background md:py-32"
    >
      <div className="container mx-auto">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <div>
            <div className="label-eyebrow mb-5 text-background/50">
              The weekly letter
            </div>
            <h2 className="text-display-sm font-display font-light">
              Stay in
              <span className="italic"> the flow</span>
            </h2>
          </div>

          <div>
            {isSubscribed ? (
              <div className="flex items-start gap-4 border-t border-background/20 pt-8">
                <Check className="mt-1 h-5 w-5 shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="font-display text-xl">Thank you.</p>
                  <p className="mt-2 font-light leading-relaxed text-background/60">
                    Your first digest of retreats, workshops and festivals will
                    arrive next week.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <p className="mb-8 max-w-md font-light leading-relaxed text-background/70">
                  One considered email a week — the most compelling yoga,
                  Ayurveda and wellbeing gatherings across the Netherlands. No
                  noise.
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="flex items-center border-b border-background/30 transition-colors focus-within:border-background">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      aria-label="Email address"
                      required
                      className="w-full bg-transparent py-4 text-lg font-light text-background
                                 placeholder:text-background/40 focus:outline-none"
                    />
                    <button
                      type="submit"
                      aria-label="Subscribe"
                      className="group flex shrink-0 items-center gap-3 py-4 pl-6 transition-opacity hover:opacity-70"
                    >
                      <span className="label-eyebrow">Subscribe</span>
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-500 ease-out-soft group-hover:translate-x-1"
                        strokeWidth={1.5}
                      />
                    </button>
                  </div>
                </form>

                <p className="label-eyebrow mt-5 text-background/40">
                  Free · Unsubscribe anytime
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
