import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo className="h-10 w-auto text-primary-foreground" />
          <p className="mt-4 max-w-md text-sm text-primary-foreground/70 leading-relaxed">
            ISO 9001:2015 certified manufacturer of modified bitumen membranes,
            concrete admixtures, and protective coatings — engineered in Lahore
            for Pakistan's climate.
          </p>
          <div className="mt-6 space-y-2 text-sm text-primary-foreground/80">
            <div className="flex items-start gap-3"><MapPin className="mt-0.5 size-4 text-secondary shrink-0" /> Industrial Estate, Kot Lakhpat, Lahore, Pakistan</div>
            <div className="flex items-center gap-3"><Mail className="size-4 text-secondary" /> info@eurobit.online</div>
            <div className="flex items-center gap-3"><Phone className="size-4 text-secondary" /> +92 42 3571 0000</div>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-secondary">Explore</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/about" className="hover:text-secondary">About Us</Link></li>
            <li><Link to="/products" className="hover:text-secondary">Products</Link></li>
            <li><Link to="/news" className="hover:text-secondary">News & Guides</Link></li>
            <li><Link to="/location" className="hover:text-secondary">Location</Link></li>
            <li><Link to="/contact" className="hover:text-secondary">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-secondary">Certifications</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li>ISO 9001:2015</li>
            <li>ASTM Standards</li>
            <li>Pakistan Engineering Council</li>
            <li>Military Engineer Services</li>
            <li>SECP Registered</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-primary-foreground/60 md:flex-row">
          <p>© {new Date().getFullYear()} Eurobit Waterproofing Industries. All rights reserved.</p>
          <p className="font-mono tracking-widest uppercase">Made in Lahore</p>
        </div>
      </div>
    </footer>
  );
}
