import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/create-article", label: "Create" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

const socialLinks = [
  { href: "https://x.com", label: "X" },
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://linkedin.com", label: "LinkedIn" },
  { href: "https://github.com", label: "GitHub" },
] as const;

const contactItems = [
  {
    href: "mailto:hello@articles-platform.dev",
    label: "hello@articles-platform.dev",
    icon: Mail,
  },
  {
    href: "tel:+1234567890",
    label: "+1 (234) 567-890",
    icon: Phone,
  },
  {
    href: "/contact",
    label: "123 Main St, Anytown",
    icon: MapPin,
  },
] as const;

export function Footer() {
  return (
    <footer className="bg-muted/40 text-muted-foreground mt-auto w-full min-w-0 border-t">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-5 sm:py-12 md:px-6 lg:grid-cols-4 lg:gap-10">
        <div className="space-y-3 sm:col-span-2 lg:col-span-1">
          <Link
            href="/"
            className="text-foreground inline-block text-lg font-semibold tracking-tight"
          >
            Alex<span className="text-primary">Bek</span>
          </Link>
          <p className="max-w-xs text-sm leading-relaxed">
            A platform for writing and discovering articles.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-foreground/80 text-sm font-medium tracking-wide">
            Links
          </h2>
          <ul className="space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="text-foreground/80 text-sm font-medium tracking-wide">
            Social
          </h2>
          <ul className="space-y-2 text-sm">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="text-foreground/80 text-sm font-medium tracking-wide">
            Contact
          </h2>
          <ul className="space-y-2.5 text-sm">
            {contactItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="hover:text-foreground inline-flex items-start gap-2 transition-colors"
                >
                  <item.icon
                    className="mt-0.5 size-3.5 shrink-0 opacity-60"
                    aria-hidden
                  />
                  <span className="break-all">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-border/50 border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-4 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-5 md:px-6">
          <p>© 2026 AlexBek. All rights reserved.</p>
          <p className="opacity-70">Write. Share. Discover.</p>
        </div>
      </div>
    </footer>
  );
}
