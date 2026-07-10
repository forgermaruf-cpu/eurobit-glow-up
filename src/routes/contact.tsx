import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Eurobit — Request a Quote" },
      { name: "description", content: "Request a quote or technical consultation for Eurobit waterproofing and construction chemicals." },
      { property: "og:title", content: "Contact Eurobit" },
      { property: "og:description", content: "Request a quote or technical consultation from Eurobit's engineers." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-secondary">Contact</div>
          <h1 className="mt-3 font-display text-5xl font-extrabold tracking-tight md:text-6xl">Talk to our engineers</h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/80">
            Tell us about your project — we'll recommend the right membrane,
            admixture, or coating for your site conditions.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          {[
            { icon: MapPin, label: "Visit", value: "Industrial Estate, Kot Lakhpat, Lahore" },
            { icon: Phone, label: "Call", value: "+92 42 3571 0000" },
            { icon: Mail, label: "Email", value: "info@eurobit.online" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex gap-4 rounded-xl border border-border bg-card p-5">
              <div className="grid size-10 shrink-0 place-items-center rounded-md bg-secondary/10 text-secondary">
                <Icon className="size-5" />
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
                <div className="mt-1 font-display font-bold">{value}</div>
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)]"
        >
          {sent ? (
            <div className="grid place-items-center py-16 text-center">
              <div className="grid size-14 place-items-center rounded-full bg-secondary/10 text-secondary">
                <Send className="size-6" />
              </div>
              <h2 className="mt-4 font-display text-2xl font-bold">Message sent</h2>
              <p className="mt-2 max-w-md text-muted-foreground">
                Thanks for reaching out — our team will get back to you within one business day.
              </p>
            </div>
          ) : (
            <div className="grid gap-5">
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Full name" name="name" required />
                <Field label="Company" name="company" />
                <Field label="Email" name="email" type="email" required />
                <Field label="Phone" name="phone" />
              </div>
              <Field label="Project location" name="location" placeholder="e.g. DHA Phase 6, Lahore" />
              <div>
                <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Message</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell us about your project — surface area, application, timeline…"
                  className="mt-2 w-full rounded-md border border-input bg-background p-3 text-sm outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-8 py-4 text-sm font-bold uppercase tracking-widest text-secondary-foreground hover:brightness-110"
              >
                <Send className="size-4" /> Send message
              </button>
            </div>
          )}
        </form>
      </section>
    </>
  );
}

function Field({ label, name, type = "text", required, placeholder }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{label}{required && <span className="text-secondary"> *</span>}</label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-md border border-input bg-background p-3 text-sm outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
      />
    </div>
  );
}