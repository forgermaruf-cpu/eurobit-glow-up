import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Factory, Award, Users, Globe2, Beaker } from "lucide-react";
import factoryImg from "@/assets/factory.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Eurobit — Lahore's Waterproofing Manufacturer" },
      {
        name: "description",
        content:
          "Eurobit is an ISO 9001:2015 certified manufacturer of waterproofing and construction chemicals in Lahore, Pakistan. Learn about our facility, certifications, and clients.",
      },
      { property: "og:title", content: "About Eurobit" },
      { property: "og:description", content: "Lahore-based manufacturer of waterproofing and construction chemicals since 1994." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-secondary">About Us</div>
          <h1 className="mt-3 max-w-3xl font-display text-5xl font-extrabold tracking-tight md:text-6xl">
            Waterproofing pioneers, made in Lahore.
          </h1>
          <p className="mt-6 max-w-2xl text-primary-foreground/80 text-lg">
            Since 1994, Eurobit has been manufacturing modified bitumen
            membranes and construction chemicals for Pakistan's most demanding
            projects — from airports and hospitals to residential rooftops.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
        <img src={factoryImg} alt="Eurobit manufacturing facility" loading="lazy" width={1600} height={1000} className="rounded-2xl object-cover shadow-[var(--shadow-card)]" />
        <div>
          <h2 className="font-display text-3xl font-extrabold tracking-tight">Our story</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Eurobit was founded to end Pakistan's reliance on imported
            waterproofing materials. Every product in our catalogue is
            manufactured at our own facility in Lahore rather than imported —
            engineered specifically for the country's monsoon, saim, and heat.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Our clients include Nestlé, Coca-Cola, PepsiCo, Toyota, McDonald's,
            KFC, Shaukat Khanum Memorial Cancer Hospital, and Lahore Airport.
            We are registered with the Pakistan Engineering Council, Military
            Engineer Services, and the Securities and Exchange Commission of
            Pakistan.
          </p>
        </div>
      </section>

      <section className="bg-muted/40">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="font-display text-3xl font-extrabold tracking-tight">Why Eurobit</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { icon: ShieldCheck, title: "ISO 9001:2015", desc: "Certified quality management across every batch and process." },
              { icon: Factory, title: "Own facility", desc: "Manufactured in Lahore — never imported, always traceable." },
              { icon: Beaker, title: "ASTM tested", desc: "Every formulation conforms to international ASTM standards." },
              { icon: Award, title: "Long warranties", desc: "Waterproofing systems backed by up to 10-year warranties." },
              { icon: Users, title: "Trusted clients", desc: "Nestlé, Coca-Cola, Toyota, Lahore Airport and more." },
              { icon: Globe2, title: "National coverage", desc: "Delivering to sites across Punjab, Sindh, and beyond." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-xl border border-border bg-card p-6">
                <div className="grid size-10 place-items-center rounded-md bg-secondary/10 text-secondary">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}