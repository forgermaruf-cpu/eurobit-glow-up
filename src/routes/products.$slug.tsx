import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft, Download, Mail } from "lucide-react";
import fallbackImg from "@/assets/product-membrane.jpg";
import { productsQuery } from "@/lib/cms-queries";

export const Route = createFileRoute("/products/$slug")({
  loader: async ({ context, params }) => {
    const products = await context.queryClient.ensureQueryData(productsQuery);
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { name: product.name, tagline: product.tagline };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Unavailable — Eurobit" }, { name: "robots", content: "noindex" }] };
    }
    return {
      meta: [
        { title: `${loaderData.name} — Eurobit` },
        { name: "description", content: loaderData.tagline },
        { property: "og:title", content: `${loaderData.name} — Eurobit` },
        { property: "og:description", content: loaderData.tagline },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductDetail,
  notFoundComponent: ProductNotFound,
});

function ProductNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="font-display text-4xl font-extrabold">Product not found</h1>
      <p className="mt-4 text-muted-foreground">The product you're looking for may have been renamed.</p>
      <Link to="/products" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground">
        <ArrowLeft className="size-4" /> Back to products
      </Link>
    </div>
  );
}

function ProductDetail() {
  const { slug } = Route.useParams();
  const { data: products } = useSuspenseQuery(productsQuery);
  const product = products.find((p) => p.slug === slug);

  if (!product) return <ProductNotFound />;

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
      <Link to="/products" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-secondary">
        <ArrowLeft className="size-3.5" /> All products
      </Link>

      <div className="mt-8 grid gap-12 lg:grid-cols-2">
        <div className="flex items-center justify-center overflow-hidden rounded-2xl border border-border bg-muted p-6">
          <img
            src={product.image_url || fallbackImg}
            alt={product.image_alt || product.name}
            width={800}
            height={600}
            className="h-auto w-full object-contain"
          />
        </div>

        <div>
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-secondary">{product.category}</div>
          <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">{product.name}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{product.tagline}</p>

          <p className="mt-6 whitespace-pre-line leading-relaxed">{product.description}</p>

          {product.specs.length > 0 && (
            <div className="mt-8">
              <h2 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-primary">Technical specifications</h2>
              <dl className="mt-4 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
                {product.specs.map((s) => (
                  <div key={s.label} className="bg-card p-4">
                    <dt className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">{s.label}</dt>
                    <dd className="mt-1 font-display text-lg font-bold text-foreground">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-bold uppercase tracking-widest text-secondary-foreground hover:brightness-110">
              <Mail className="size-4" /> Request quote
            </Link>
            <a href="#" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-bold uppercase tracking-widest text-foreground hover:border-secondary hover:text-secondary">
              <Download className="size-4" /> Datasheet
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
