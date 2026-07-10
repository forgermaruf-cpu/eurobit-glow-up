import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Guides — Eurobit" },
      { name: "description", content: "Expert waterproofing guides for Lahore, Islamabad, Karachi and beyond." },
      { property: "og:title", content: "News & Guides — Eurobit" },
      { property: "og:description", content: "Expert waterproofing guides from Eurobit." },
    ],
  }),
  component: News,
});

const posts = [
  { tag: "Bahria Town · Lahore & Islamabad", title: "Water Leakage Solutions in Bahria Town", excerpt: "Roof leakage, bathroom seepage, basement moisture & tank cracks — what causes each problem in Bahria Town and how to fix it permanently." },
  { tag: "DHA · Lahore & Islamabad", title: "Water Leakage Solutions in DHA", excerpt: "Why DHA homes keep leaking after repairs — and the permanent fix for roof, bathroom, basement and water tank problems." },
  { tag: "Islamabad · All Sectors & Phases", title: "Waterproofing Problems in Islamabad", excerpt: "Clay soil, hillside terrain and freeze-thaw winters make Islamabad's waterproofing needs completely different from Lahore." },
  { tag: "Lahore · DHA, Johar Town, Gulberg", title: "Roof Leakage & Saim in Lahore", excerpt: "Lahore's extreme heat, monsoon rains and high water table — why saim and roof leakage keep coming back." },
  { tag: "Pakistan · Industry Guide 2026", title: "Top 10 Waterproofing Companies in Pakistan", excerpt: "Ranked by experience, certifications, product quality, and coverage." },
  { tag: "Lahore · GT Road", title: "Waterproofing in Bismillah Housing Scheme", excerpt: "Roof leakage, seepage, and construction chemical solutions for all sectors of Bismillah Housing Scheme." },
];

function News() {
  return (
    <>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-secondary">News & Guides</div>
          <h1 className="mt-3 font-display text-5xl font-extrabold tracking-tight md:text-6xl">Expert waterproofing guides</h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/80">
            Deep-dive articles on leakage causes, permanent fixes, and product
            selection — city by city.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <article key={p.title} className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-secondary">{p.tag}</div>
              <h2 className="mt-3 font-display text-xl font-bold leading-tight group-hover:text-primary">{p.title}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{p.excerpt}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary group-hover:text-secondary">
                Read guide <ArrowRight className="size-3.5" />
              </span>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}