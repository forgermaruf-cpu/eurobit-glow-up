import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Facebook, Youtube } from "lucide-react";
import { Logo } from "./logo";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/products", label: "Products" },
  { to: "/news", label: "News" },
  { to: "/location", label: "Location" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
      {/* Utility bar */}
      <div className="bg-primary text-primary-foreground/90 text-xs">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-2">
          <div className="flex flex-wrap items-center gap-5">
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-3.5 text-secondary" /> Lahore, Pakistan
            </span>
            <a href="mailto:info@eurobit.online" className="inline-flex items-center gap-2 hover:text-secondary">
              <Mail className="size-3.5 text-secondary" /> info@eurobit.online
            </a>
            <a href="tel:+924235710000" className="hidden sm:inline-flex items-center gap-2 hover:text-secondary">
              <Phone className="size-3.5 text-secondary" /> +92 42 3571 0000
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="Facebook" className="hover:text-secondary"><Facebook className="size-4" /></a>
            <a href="#" aria-label="YouTube" className="hover:text-secondary"><Youtube className="size-4" /></a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-background border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <Logo className="h-10 w-auto text-primary" />
            <div className="hidden sm:block leading-tight">
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Waterproofing Ind.</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="text-sm font-semibold uppercase tracking-wider text-foreground/80 transition-colors hover:text-secondary"
                activeProps={{ className: "text-secondary" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <Link
            to="/contact"
            className="rounded-full bg-secondary px-6 py-3 text-xs font-bold uppercase tracking-widest text-secondary-foreground shadow-[0_6px_18px_-6px_var(--brand-orange)] transition-transform hover:-translate-y-0.5"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </header>
  );
}
