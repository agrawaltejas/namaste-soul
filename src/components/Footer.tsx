import {
  ArrowUpRight,
  CalendarDays,
  Compass,
  FileText,
  Flame,
  Flower2,
  Info,
  Leaf,
  Mail,
  MoonStar,
  Send,
  Sparkles,
  Tent,
  type LucideIcon
} from 'lucide-react';

interface FooterLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

const columns: { heading: string; links: FooterLink[] }[] = [
  {
    heading: 'Practices',
    links: [
      { label: 'Yoga', href: '#explore', icon: Flower2 },
      { label: 'Ayurveda', href: '#explore', icon: Leaf },
      { label: 'Astrology', href: '#explore', icon: MoonStar },
      { label: 'Tantra', href: '#explore', icon: Flame }
    ]
  },
  {
    heading: 'Browse',
    links: [
      { label: 'All events', href: '#explore', icon: Compass },
      { label: 'Retreats', href: '#explore', icon: Tent },
      { label: 'Workshops', href: '#explore', icon: Sparkles },
      { label: 'Festivals', href: '#explore', icon: CalendarDays }
    ]
  },
  {
    heading: 'Connect',
    links: [
      { label: 'About', href: '#about', icon: Info },
      { label: 'For organizers', href: '#submit', icon: Send },
      { label: 'Contact', href: 'mailto:namaste.soul.contact@gmail.com', icon: Mail },
      { label: 'Privacy & terms', href: '#legal', icon: FileText }
    ]
  }
];

const Footer = () => (
  <footer className="border-t border-border bg-background">
    <div className="container mx-auto">
      {/* Masthead */}
      <div className="flex flex-wrap items-end justify-between gap-8 py-16 md:py-20">
        <div>
          <div className="font-display text-display-sm font-light leading-none">
            Namaste<span className="italic">Soul</span>
          </div>
          <p className="label-eyebrow mt-5 text-muted-foreground">
            Ancient wisdom, modern wellbeing
          </p>
        </div>

        <a
          href="#submit"
          className="group inline-flex items-center gap-3 bg-primary px-8 py-4 text-primary-foreground
                     transition-colors hover:bg-foreground"
        >
          <span className="label-eyebrow text-[0.8rem] font-semibold">
            Submit your event
          </span>
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-500 ease-out-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={1.5}
          />
        </a>
      </div>

      {/* Link columns — line icons, drawn at the same weight as the type
          so they read as part of the text rather than as decoration. */}
      <div className="grid gap-10 border-t border-border py-14 sm:grid-cols-3">
        {columns.map((column) => (
          <div key={column.heading}>
            <h4 className="label-eyebrow mb-5 text-[0.8rem] font-semibold text-foreground">
              {column.heading}
            </h4>
            <ul className="space-y-3.5">
              {column.links.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="group flex items-center gap-3 text-sm font-light transition-colors hover:text-primary"
                  >
                    <Icon
                      className="h-4 w-4 shrink-0 text-border-strong transition-colors group-hover:text-primary"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <span className="link-underline">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Colophon */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border py-8">
        <p className="label-eyebrow text-muted-foreground">
          © {new Date().getFullYear()} NamasteSoul
        </p>
        <p className="label-eyebrow text-muted-foreground">
          Made in the Netherlands
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
