import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Factory, Droplets, Award } from "lucide-react";
import heroImg from "@/assets/hero-application.jpg";
import factoryImg from "@/assets/factory.jpg";
import { products } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Eurobit — Waterproofing & Construction Chemicals, Lahore" },
      {
        name: "description",
        content:
          "ISO 9001:2015 certified manufacturer of bitumen membranes, admixtures and protective coatings — trusted by Nestlé, Coca-Cola, Toyota and Lahore Airport.",
      },
    ],
  }),
  component: Home,
});

const clients = ["Nestlé", "Coca-Cola", "Toyota", "PepsiCo", "McDonald's", "KFC", "Shaukat Khanum", "Lahore Airport"];

function Home() {
  const featured = products.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-primary text-primary-foreground">
        <img
          src={heroImg}
          alt="Eurobit crew applying bitumen waterproofing membrane on an industrial rooftop in Lahore"
          width={1920}
          height={1200}
          className="absolute inset-0 -z-10 size-full object-cover opacity-40"
        />
        <div className="absolute inset-0 -z-10 bg-[image:var(--gradient-hero)]" />
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-24 lg:grid-cols-12 lg:py-32">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-secondary/40 bg-secondary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-secondary">
              <ShieldCheck className="size-3.5" /> ISO 9001:2015 Certified Manufacturer
            </div>
            <h1 className="mt-6 max-w-4xl font-display text-5xl font-extrabold leading-[1.02] tracking-tight md:text-7xl">
              Waterproofing & construction chemicals,{" "}
              <span className="text-secondary">engineered in Lahore.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-primary-foreground/80">
              Eurobit manufactures modified bitumen membranes, concrete
              admixtures, and protective coatings — built to withstand
              Pakistan's monsoon rains, rising damp, and extreme summer heat.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-full bg-secondary px-7 py-4 text-sm font-bold uppercase tracking-widest text-secondary-foreground shadow-[0_10px_30px_-10px_var(--brand-orange)] transition-transform hover:-translate-y-0.5"
              >
                View Products <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/5 px-7 py-4 text-sm font-bold uppercase tracking-widest transition-colors hover:bg-primary-foreground/10"
              >
                Request a Quote
              </Link>
            </div>
          </div>
          <div className="hidden lg:col-span-4 lg:flex lg:flex-col lg:justify-end lg:gap-4">
            {[
              { k: "30+", v: "Years manufacturing" },
              { k: "200+", v: "Major projects delivered" },
              { k: "9001", v: "ISO Quality certified" },
            ].map((s) => (
              <div key={s.v} className="rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 p-5 backdrop-blur-sm">
                <div className="font-display text-4xl font-black text-secondary">{s.k}</div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-primary-foreground/70">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client marquee */}
      <section className="border-b border-border bg-muted/50">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-4 px-6 py-8">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">Trusted by</span>
          {clients.map((c) => (
            <span key={c} className="font-display text-sm font-bold uppercase tracking-wider text-foreground/60">
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* Product grid */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-secondary">Our catalogue</div>
            <h2 className="mt-2 font-display text-4xl font-extrabold tracking-tight md:text-5xl">
              Products
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Modified bitumen membranes, admixtures, and coatings —
              manufactured at our Lahore facility, conforming to ASTM standards.
            </p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary hover:text-secondary"
          >
            View all <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => (
            <Link
              key={p.slug}
              to="/products/$slug"
              params={{ slug: p.slug }}
              className="group flex flex-col rounded-xl border border-border bg-card p-3 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-muted">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  width={800}
                  height={1000}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute left-3 top-3 rounded-full bg-primary/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                  {p.category}
                </div>
              </div>
              <div className="px-1 pb-1 pt-4">
                <h3 className="font-display text-sm font-bold uppercase tracking-tight text-foreground group-hover:text-secondary">
                  {p.name}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{p.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* About strip */}
      <section className="bg-muted/40">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-card)]">
            <img src={factoryImg} alt="Eurobit manufacturing facility in Lahore" loading="lazy" width={1600} height={1000} className="size-full object-cover" />
            <div className="absolute bottom-6 left-6 right-6 rounded-lg bg-primary/95 p-5 text-primary-foreground backdrop-blur">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Kot Lakhpat, Lahore</div>
              <div className="mt-1 font-display text-lg font-bold">Own manufacturing facility since 1994</div>
            </div>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-secondary">About Eurobit</div>
            <h2 className="mt-2 font-display text-4xl font-extrabold tracking-tight md:text-5xl">
              Local precision.<br />Global standards.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Eurobit is a Lahore-based, ISO 9001:2015 certified manufacturer of
              modified bitumen membranes, concrete admixtures, and protective
              coatings — engineered for Pakistan's climate. We are registered
              with the Pakistan Engineering Council, Military Engineer Services,
              and the SECP.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { icon: Factory, label: "In-house manufacturing" },
                { icon: Droplets, label: "ASTM-compliant products" },
                { icon: Award, label: "10-year warranties" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="rounded-lg border border-border bg-card p-4">
                  <Icon className="size-5 text-secondary" />
                  <div className="mt-3 text-xs font-semibold uppercase tracking-wider">{label}</div>
                </div>
              ))}
            </div>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary hover:text-secondary"
            >
              More about us <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* News */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-secondary">Latest guides</div>
            <h2 className="mt-2 font-display text-4xl font-extrabold tracking-tight">From the Eurobit blog</h2>
          </div>
          <Link to="/news" className="hidden md:inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary hover:text-secondary">
            All posts <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { tag: "Bahria Town · Lahore", title: "Water Leakage Solutions in Bahria Town", excerpt: "Roof leakage, bathroom seepage, basement moisture & tank cracks — causes and permanent fixes." },
            { tag: "DHA · Lahore & Islamabad", title: "Water Leakage Solutions in DHA", excerpt: "Why DHA homes keep leaking after repairs — and the permanent fix." },
            { tag: "Pakistan · Industry Guide 2026", title: "Top 10 Waterproofing Companies in Pakistan", excerpt: "Ranked by experience, certifications, product quality, and coverage." },
          ].map((p) => (
            <article key={p.title} className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-secondary">{p.tag}</div>
              <h3 className="mt-3 font-display text-xl font-bold leading-tight text-foreground group-hover:text-primary">{p.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{p.excerpt}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary group-hover:text-secondary">
                Read guide <ArrowRight className="size-3.5" />
              </span>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 py-16 md:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
              Need waterproofing for your next project?
            </h2>
            <p className="mt-3 max-w-xl text-primary-foreground/70">
              Our engineers will help you specify the right membrane, admixture
              or coating for your site conditions.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link to="/contact" className="rounded-full bg-secondary px-7 py-4 text-sm font-bold uppercase tracking-widest text-secondary-foreground hover:brightness-110">
              Get in touch
            </Link>
            <a href="tel:+924235710000" className="rounded-full border border-primary-foreground/25 px-7 py-4 text-sm font-bold uppercase tracking-widest hover:bg-primary-foreground/10">
              Call sales
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
