import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Mail, Phone, Clock } from "lucide-react";

export const Route = createFileRoute("/location")({
  head: () => ({
    meta: [
      { title: "Location — Eurobit, Lahore Pakistan" },
      { name: "description", content: "Visit Eurobit's manufacturing facility in Kot Lakhpat, Lahore, Pakistan." },
      { property: "og:title", content: "Location — Eurobit" },
      { property: "og:description", content: "Eurobit facility in Kot Lakhpat, Lahore." },
    ],
  }),
  component: Location,
});

function Location() {
  return (
    <>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-secondary">Location</div>
          <h1 className="mt-3 font-display text-5xl font-extrabold tracking-tight md:text-6xl">Find us in Lahore</h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          {[
            { icon: MapPin, label: "Head Office & Factory", value: "Industrial Estate, Kot Lakhpat\nLahore, Pakistan" },
            { icon: Phone, label: "Phone", value: "+92 42 3571 0000" },
            { icon: Mail, label: "Email", value: "info@eurobit.online" },
            { icon: Clock, label: "Hours", value: "Mon – Sat · 9:00 – 18:00" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex gap-4 rounded-xl border border-border bg-card p-5">
              <div className="grid size-10 shrink-0 place-items-center rounded-md bg-secondary/10 text-secondary">
                <Icon className="size-5" />
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
                <div className="mt-1 whitespace-pre-line font-display font-bold text-foreground">{value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="overflow-hidden rounded-2xl border border-border">
          <iframe
            title="Eurobit Lahore location"
            src="https://www.google.com/maps?q=Kot+Lakhpat+Industrial+Estate+Lahore&output=embed"
            className="h-[500px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}