import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { Logo } from "./logo";
import { useSettings } from "@/lib/use-settings";

export function SiteFooter() {
  const s = useSettings();
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo className="h-10 w-auto text-primary-foreground" />
          <p className="mt-4 max-w-md text-sm text-primary-foreground/70 leading-relaxed">
            ISO 9001:2015 certified manufacturer of modified bitumen membranes,
            concrete admixtures, and protective coatings — made in Pakistan and
            delivered nationwide.
          </p>
          <div className="mt-6 space-y-2 text-sm text-primary-foreground/80">
            <div className="flex items-start gap-3"><MapPin className="mt-0.5 size-4 text-secondary shrink-0" /> Industrial Estate, Kot Lakhpat, Lahore — serving all Pakistan</div>
            <div className="flex items-center gap-3"><Mail className="size-4 text-secondary" /> info@eurobit.online</div>
            <div className="flex items-center gap-3"><Phone className="size-4 text-secondary" /> <a href="tel:+923139544444" className="hover:text-secondary">0313 9544444</a></div>
            <div className="flex items-center gap-3">
              <MessageCircle className="size-4 text-secondary shrink-0" />
              <a
                href="https://wa.me/923139544444?text=Hello%20Eurobit!%20I%20would%20like%20to%20inquire%20about%20your%20waterproofing%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary"
              >
                WhatsApp: +92 313 9544444
              </a>
            </div>
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
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 py-5 text-xs text-primary-foreground/60 md:flex-row">
          <p>© {new Date().getFullYear()} Eurobit Waterproofing Industries. All rights reserved.</p>
          <p className="font-mono tracking-widest uppercase">Made in Pakistan · Delivered nationwide</p>
        </div>
      </div>
    </footer>
  );
}
