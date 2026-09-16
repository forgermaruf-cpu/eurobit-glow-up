import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Facebook, Youtube, Menu, X } from "lucide-react";
import { Logo } from "./logo";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/products", label: "Products" },
  { to: "/news", label: "News" },
  { to: "/location", label: "Location" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
      {/* Utility bar */}
      <div className="bg-primary text-primary-foreground/90 text-[11px] sm:text-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex min-w-0 flex-1 items-center gap-4 sm:gap-5">
            <span className="inline-flex shrink-0 items-center gap-2">
              <MapPin className="size-3.5 shrink-0 text-secondary" /> Nationwide · Pakistan
            </span>
            <a href="mailto:info@eurobit.online" className="hidden min-w-0 items-center gap-2 hover:text-secondary sm:inline-flex">
              <Mail className="size-3.5 shrink-0 text-secondary" /> <span className="truncate">info@eurobit.online</span>
            </a>
            <a href="tel:+924235710000" className="hidden shrink-0 items-center gap-2 hover:text-secondary md:inline-flex">
              <Phone className="size-3.5 text-secondary" /> +92 42 3571 0000
            </a>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <a href="tel:+924235710000" aria-label="Call Eurobit" className="hover:text-secondary sm:hidden"><Phone className="size-4" /></a>
            <a
              href="https://wa.me/923139544444?text=Hello%20Eurobit!%20I%20would%20like%20to%20inquire%20about%20your%20waterproofing%20products."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with Eurobit on WhatsApp"
              className="hover:text-secondary"
            >
              <MessageCircle className="size-4" />
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-secondary"><Facebook className="size-4" /></a>
            <a href="#" aria-label="YouTube" className="hover:text-secondary"><Youtube className="size-4" /></a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-background border-b border-border">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <Link to="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
            <Logo className="h-8 w-auto shrink-0 text-primary sm:h-10" />
            <div className="hidden leading-tight lg:block">
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Waterproofing Ind.</div>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
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
              className="hidden rounded-full bg-secondary px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-secondary-foreground shadow-[0_6px_18px_-6px_var(--brand-orange)] transition-transform hover:-translate-y-0.5 sm:inline-flex"
            >
              Contact Us
            </Link>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid size-10 shrink-0 place-items-center rounded-md border border-border text-primary lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="border-t border-border bg-background lg:hidden">
            <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="block border-b border-border/60 py-3 text-sm font-semibold uppercase tracking-wider text-foreground/80 last:border-0 hover:text-secondary"
                  activeProps={{ className: "text-secondary" }}
                  activeOptions={{ exact: n.to === "/" }}
                >
                  {n.label}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="my-3 block rounded-full bg-secondary px-5 py-3 text-center text-xs font-bold uppercase tracking-widest text-secondary-foreground"
              >
                Contact Us
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
