import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: AdminHome,
});

function AdminHome() {
  const { data } = useQuery({
    queryKey: ["admin", "counts"],
    queryFn: async () => {
      const [products, posts, inquiries, unread] = await Promise.all([
        supabase.from("products").select("*", { count: "exact", head: true }),
        supabase.from("posts").select("*", { count: "exact", head: true }),
        supabase.from("inquiries").select("*", { count: "exact", head: true }),
        supabase.from("inquiries").select("*", { count: "exact", head: true }).eq("status", "new"),
      ]);
      return {
        products: products.count ?? 0,
        posts: posts.count ?? 0,
        inquiries: inquiries.count ?? 0,
        unread: unread.count ?? 0,
      };
    },
  });

  const cards = [
    { to: "/admin/products", label: "Products", value: data?.products },
    { to: "/admin/posts", label: "Guides", value: data?.posts },
    { to: "/admin/inquiries", label: "New inquiries", value: data?.unread },
    { to: "/admin/inquiries", label: "Total inquiries", value: data?.inquiries },
  ] as const;

  return (
    <div>
      <p className="max-w-2xl text-muted-foreground">
        Everything on the public website is edited here. Changes appear on the live site straight away.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            to={c.to}
            className="rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
          >
            <div className="font-display text-4xl font-black text-secondary">{c.value ?? "—"}</div>
            <div className="mt-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              {c.label}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
