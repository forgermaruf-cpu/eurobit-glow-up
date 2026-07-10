import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Download, Mail } from "lucide-react";
import { products, type Product } from "@/lib/products";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product not found — Eurobit" }, { name: "robots", content: "noindex" }] };
    }
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} — Eurobit` },
        { name: "description", content: product.tagline },
        { property: "og:title", content: `${product.name} — Eurobit` },
        { property: "og:description", content: product.tagline },
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
  const { product } = Route.useLoaderData();

  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <Link to="/products" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-secondary">
        <ArrowLeft className="size-3.5" /> All products
      </Link>

      <div className="mt-8 grid gap-12 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-border bg-muted">
          <img src={product.image} alt={product.name} width={800} height={1000} className="size-full object-cover" />
        </div>

        <div>
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-secondary">{product.category}</div>
          <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight md:text-5xl">{product.name}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{product.tagline}</p>

          <p className="mt-6 leading-relaxed">{product.description}</p>

          <div className="mt-8">
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-primary">Technical specifications</h2>
            <dl className="mt-4 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
              {product.specs.map((s: Product["specs"][number]) => (
                <div key={s.label} className="bg-card p-4">
                  <dt className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">{s.label}</dt>
                  <dd className="mt-1 font-display text-lg font-bold text-foreground">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

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