import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminLayout,
});

const tabs = [
  { to: "/admin", label: "Overview", exact: true },
  { to: "/admin/products", label: "Products" },
  { to: "/admin/posts", label: "Guides" },
  { to: "/admin/inquiries", label: "Inquiries" },
  { to: "/admin/settings", label: "Contact details" },
] as const;

function AdminLayout() {
  const navigate = useNavigate();
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      const uid = userData.user?.id;
      if (!uid) return;
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", uid)
        .eq("role", "admin")
        .maybeSingle();
      if (!cancelled) setAllowed(!!data);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (allowed === false) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-extrabold">No access</h1>
        <p className="mt-3 text-muted-foreground">
          This account is signed in but is not an administrator. Ask the site owner to give you access.
        </p>
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            navigate({ to: "/auth" });
          }}
          className="mt-8 rounded-full bg-primary px-6 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-extrabold tracking-tight">Site manager</h1>
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            navigate({ to: "/auth" });
          }}
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-bold uppercase tracking-widest hover:border-secondary hover:text-secondary"
        >
          <LogOut className="size-3.5" /> Sign out
        </button>
      </div>

      <nav className="mt-6 flex flex-wrap gap-2 border-b border-border pb-4">
        {tabs.map((t) => (
          <Link
            key={t.to}
            to={t.to}
            activeOptions={{ exact: "exact" in t }}
            activeProps={{ className: "border-primary bg-primary text-primary-foreground" }}
            className="rounded-full border border-border px-4 py-2 text-xs font-bold uppercase tracking-widest text-foreground/70 hover:border-secondary hover:text-secondary"
          >
            {t.label}
          </Link>
        ))}
      </nav>

      <div className="py-8">
        {allowed === null ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}
