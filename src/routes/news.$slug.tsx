import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { postsQuery } from "@/lib/cms-queries";

export const Route = createFileRoute("/news/$slug")({
  loader: async ({ context, params }) => {
    const posts = await context.queryClient.ensureQueryData(postsQuery);
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { title: post.title, excerpt: post.excerpt };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Unavailable — Eurobit" }, { name: "robots", content: "noindex" }] };
    }
    return {
      meta: [
        { title: `${loaderData.title} — Eurobit` },
        { name: "description", content: loaderData.excerpt },
        { property: "og:title", content: `${loaderData.title} — Eurobit` },
        { property: "og:description", content: loaderData.excerpt },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: PostPage,
  notFoundComponent: PostNotFound,
});

function PostNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="font-display text-4xl font-extrabold">Guide not found</h1>
      <Link to="/news" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground">
        <ArrowLeft className="size-4" /> All guides
      </Link>
    </div>
  );
}

function PostPage() {
  const { slug } = Route.useParams();
  const { data: posts } = useSuspenseQuery(postsQuery);
  const post = posts.find((p) => p.slug === slug);

  if (!post) return <PostNotFound />;

  return (
    <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <Link to="/news" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-secondary">
        <ArrowLeft className="size-3.5" /> All guides
      </Link>
      <div className="mt-8 text-[11px] font-bold uppercase tracking-[0.2em] text-secondary">{post.tag}</div>
      <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-5xl">{post.title}</h1>
      <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>
      <div className="mt-8 whitespace-pre-line leading-relaxed">{post.body}</div>
    </article>
  );
}
