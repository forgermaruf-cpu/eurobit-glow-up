import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import fallbackImg from "@/assets/product-membrane.jpg";
import { productCategories, productsQuery } from "@/lib/cms-queries";

export const Route = createFileRoute("/products")({
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQuery),
  head: () => ({
    meta: [
      { title: "Products — Eurobit Waterproofing & Construction Chemicals" },
      {
        name: "description",
        content:
          "Explore Eurobit's full catalogue: APP/SBS bitumen membranes, concrete admixtures, protective coatings and sealants — manufactured in Pakistan and delivered nationwide.",
      },
      { property: "og:title", content: "Eurobit Product Catalogue" },
      { property: "og:description", content: "APP/SBS membranes, admixtures, coatings and sealants." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const { data: products } = useSuspenseQuery(productsQuery);
  const [active, setActive] = useState<string>("All");
  const filtered = active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-secondary">Products</div>
          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-6xl">Our catalogue</h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/80">
            Every product manufactured in Pakistan and delivered nationwide,
            conforming to ASTM standards.
            Technical data sheets available on request.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex flex-wrap gap-2">
          {["All", ...productCategories].map((c) => {
            const isActive = active === c;
            return (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground/70 hover:border-secondary hover:text-secondary"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p) => (
            <Link
              key={p.slug}
              to="/products/$slug"
              params={{ slug: p.slug }}
              className="group flex flex-col rounded-xl border border-border bg-card p-3 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-muted">
                <img
                  src={p.image_url || fallbackImg}
                  alt={p.image_alt || p.name}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="size-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute left-3 top-3 rounded-full bg-primary/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                  {p.category}
                </div>
              </div>
              <div className="px-1 pb-1 pt-4">
                <h3 className="font-display text-sm font-bold uppercase tracking-tight group-hover:text-secondary">
                  {p.name}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{p.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
