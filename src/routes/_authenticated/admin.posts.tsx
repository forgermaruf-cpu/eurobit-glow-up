import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Area, Text } from "./admin.products";

export const Route = createFileRoute("/_authenticated/admin/posts")({
  component: AdminPosts,
});

type Row = {
  id: string;
  slug: string;
  title: string;
  tag: string;
  excerpt: string;
  body: string;
  published: boolean;
};

const blank: Omit<Row, "id"> = {
  slug: "",
  title: "",
  tag: "",
  excerpt: "",
  body: "",
  published: true,
};

function AdminPosts() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Row | Omit<Row, "id"> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data: rows = [], isLoading } = useQuery({
    queryKey: ["admin", "posts"],
    queryFn: async (): Promise<Row[]> => {
      const { data, error } = await supabase
        .from("posts")
        .select("id,slug,title,tag,excerpt,body,published")
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const save = useMutation({
    mutationFn: async (row: Row | Omit<Row, "id">) => {
      const payload = {
        slug: row.slug.trim(),
        title: row.title.trim(),
        tag: row.tag,
        excerpt: row.excerpt,
        body: row.body,
        published: row.published,
        updated_at: new Date().toISOString(),
      };
      const res =
        "id" in row
          ? await supabase.from("posts").update(payload).eq("id", row.id)
          : await supabase.from("posts").insert(payload);
      if (res.error) throw res.error;
    },
    onSuccess: () => {
      setEditing(null);
      setError(null);
      qc.invalidateQueries({ queryKey: ["admin", "posts"] });
      qc.invalidateQueries({ queryKey: ["cms", "posts"] });
    },
    onError: (e: Error) => setError(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "posts"] });
      qc.invalidateQueries({ queryKey: ["cms", "posts"] });
    },
  });

  if (editing) {
    const set = (patch: Partial<Row>) => setEditing({ ...editing, ...patch });
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          save.mutate(editing);
        }}
        className="grid max-w-3xl gap-5 rounded-2xl border border-border bg-card p-6"
      >
        <Text label="Title" value={editing.title} onChange={(v) => set({ title: v })} required />
        <Text
          label="Web address (lowercase, dashes)"
          value={editing.slug}
          onChange={(v) => set({ slug: v })}
          required
        />
        <Text label="Label (e.g. DHA · Lahore)" value={editing.tag} onChange={(v) => set({ tag: v })} />
        <Area label="Short summary" value={editing.excerpt} onChange={(v) => set({ excerpt: v })} rows={3} />
        <Area label="Full article" value={editing.body} onChange={(v) => set({ body: v })} rows={12} />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={editing.published}
            onChange={(e) => set({ published: e.target.checked })}
          />
          Show on website
        </label>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={save.isPending}
            className="rounded-full bg-secondary px-6 py-3 text-xs font-bold uppercase tracking-widest text-secondary-foreground disabled:opacity-60"
          >
            {save.isPending ? "Saving…" : "Save"}
          </button>
          <button
            type="button"
            onClick={() => {
              setEditing(null);
              setError(null);
            }}
            className="rounded-full border border-border px-6 py-3 text-xs font-bold uppercase tracking-widest"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <p className="text-muted-foreground">Write and publish guides for the News section.</p>
        <button
          onClick={() => setEditing({ ...blank })}
          className="inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-secondary-foreground"
        >
          <Plus className="size-4" /> New guide
        </button>
      </div>

      {isLoading ? (
        <p className="mt-8 text-sm text-muted-foreground">Loading…</p>
      ) : (
        <div className="mt-6 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
          {rows.map((r) => (
            <div key={r.id} className="flex flex-wrap items-center gap-4 p-4">
              <div className="min-w-0 flex-1">
                <div className="font-display font-bold">{r.title}</div>
                <div className="truncate text-xs text-muted-foreground">{r.tag}</div>
              </div>
              {!r.published && (
                <span className="rounded-full bg-muted px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Draft
                </span>
              )}
              <button
                onClick={() => setEditing(r)}
                className="rounded-full border border-border px-4 py-2 text-xs font-bold uppercase tracking-widest hover:border-secondary hover:text-secondary"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  if (confirm(`Delete "${r.title}"?`)) remove.mutate(r.id);
                }}
                aria-label={`Delete ${r.title}`}
                className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground hover:border-destructive hover:text-destructive"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
