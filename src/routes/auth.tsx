import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Logo } from "@/components/logo";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Sign in — Eurobit Admin" },
      { name: "description", content: "Sign in to manage Eurobit products, guides and inquiries." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Sign in — Eurobit Admin" },
      { property: "og:description", content: "Eurobit content management sign in." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/admin" },
        });
        if (error) throw error;
        if (!data.session) {
          setNotice("Check your email to confirm your address, then sign in.");
          setMode("signin");
          return;
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      navigate({ to: "/admin" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  async function onGoogle() {
    setError(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setError("Google sign-in failed. Try email and password instead.");
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/admin" });
  }

  return (
    <section className="mx-auto flex max-w-md flex-col px-4 py-16 sm:py-24">
      <Logo className="mx-auto h-10 w-auto text-primary" />
      <h1 className="mt-8 text-center font-display text-3xl font-extrabold tracking-tight">
        {mode === "signin" ? "Sign in to manage your site" : "Create your admin account"}
      </h1>
      <p className="mt-2 text-center text-sm text-muted-foreground">
        Only Eurobit staff should use this page.
      </p>

      <form onSubmit={onSubmit} className="mt-8 grid gap-4 rounded-2xl border border-border bg-card p-6">
        <div>
          <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-md border border-input bg-background p-3 text-sm outline-none focus:border-secondary"
          />
        </div>
        <div>
          <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Password</label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-md border border-input bg-background p-3 text-sm outline-none focus:border-secondary"
          />
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}
        {notice && <p className="text-sm text-secondary">{notice}</p>}

        <button
          type="submit"
          disabled={busy}
          className="rounded-full bg-secondary px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-secondary-foreground disabled:opacity-60"
        >
          {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
        </button>

        <button
          type="button"
          onClick={onGoogle}
          className="rounded-full border border-border px-6 py-3.5 text-xs font-bold uppercase tracking-widest hover:border-secondary hover:text-secondary"
        >
          Continue with Google
        </button>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "signin" ? "signup" : "signin");
            setError(null);
          }}
          className="text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-secondary"
        >
          {mode === "signin" ? "Need an account? Create one" : "Already have an account? Sign in"}
        </button>
      </form>
    </section>
  );
}
