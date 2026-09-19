import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { postsQuery } from "@/lib/cms-queries";

export const Route = createFileRoute("/news")({
  loader: ({ context }) => context.queryClient.ensureQueryData(postsQuery),
  head: () => ({
    meta: [
      { title: "News & Guides — Eurobit" },
      { name: "description", content: "Expert waterproofing guides for Lahore, Islamabad, Karachi, Peshawar, Quetta and beyond." },
      { property: "og:title", content: "News & Guides — Eurobit" },
      { property: "og:description", content: "Expert waterproofing guides from Eurobit." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: News,
});

function News() {
  const { data: posts } = useSuspenseQuery(postsQuery);

  return (
    <>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-secondary">News & Guides</div>
          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-6xl">Expert waterproofing guides</h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/80">
            Deep-dive articles on leakage causes, permanent fixes, and product
            selection — city by city.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {posts.length === 0 ? (
          <p className="text-muted-foreground">New guides are on the way.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <Link
                key={p.slug}
                to="/news/$slug"
                params={{ slug: p.slug }}
                className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
              >
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-secondary">{p.tag}</div>
                <h2 className="mt-3 font-display text-xl font-bold leading-tight group-hover:text-primary">{p.title}</h2>
                <p className="mt-3 text-sm text-muted-foreground">{p.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary group-hover:text-secondary">
                  Read guide <ArrowRight className="size-3.5" />
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
