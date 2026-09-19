import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { productCategories } from "@/lib/cms-queries";

export const Route = createFileRoute("/_authenticated/admin/products")({
  component: AdminProducts,
});

type Spec = { label: string; value: string };

type Row = {
  id: string;
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  specs: Spec[];
  image_url: string | null;
  image_alt: string;
  sort_order: number;
  published: boolean;
};

const blank: Omit<Row, "id"> = {
  slug: "",
  name: "",
  category: "Bitumen Membrane",
  tagline: "",
  description: "",
  specs: [],
  image_url: "",
  image_alt: "",
  sort_order: 100,
  published: true,
};

function toSpecs(v: unknown): Spec[] {
  return Array.isArray(v) ? (v as Spec[]).filter((s) => s && typeof s.label === "string") : [];
}

function AdminProducts() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Row | Omit<Row, "id"> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data: rows = [], isLoading } = useQuery({
    queryKey: ["admin", "products"],
    queryFn: async (): Promise<Row[]> => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []).map((r) => ({ ...r, specs: toSpecs(r.specs) })) as Row[];
    },
  });

  const save = useMutation({
    mutationFn: async (row: Row | Omit<Row, "id">) => {
      const payload = {
        slug: row.slug.trim(),
        name: row.name.trim(),
        category: row.category,
        tagline: row.tagline,
        description: row.description,
        specs: row.specs,
        image_url: row.image_url?.trim() || null,
        image_alt: row.image_alt,
        sort_order: Number(row.sort_order) || 0,
        published: row.published,
        updated_at: new Date().toISOString(),
      };
      const res =
        "id" in row
          ? await supabase.from("products").update(payload).eq("id", row.id)
          : await supabase.from("products").insert(payload);
      if (res.error) throw res.error;
    },
    onSuccess: () => {
      setEditing(null);
      setError(null);
      qc.invalidateQueries({ queryKey: ["admin", "products"] });
      qc.invalidateQueries({ queryKey: ["cms", "products"] });
    },
    onError: (e: Error) => setError(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "products"] });
      qc.invalidateQueries({ queryKey: ["cms", "products"] });
    },
  });

  if (editing) {
    return (
      <ProductForm
        value={editing}
        onChange={setEditing}
        onCancel={() => {
          setEditing(null);
          setError(null);
        }}
        onSave={() => save.mutate(editing)}
        saving={save.isPending}
        error={error}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <p className="text-muted-foreground">Add, edit or hide the products shown on your website.</p>
        <button
          onClick={() => setEditing({ ...blank })}
          className="inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-secondary-foreground"
        >
          <Plus className="size-4" /> New product
        </button>
      </div>

      {isLoading ? (
        <p className="mt-8 text-sm text-muted-foreground">Loading…</p>
      ) : (
        <div className="mt-6 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
          {rows.map((r) => (
            <div key={r.id} className="flex flex-wrap items-center gap-4 p-4">
              <div className="min-w-0 flex-1">
                <div className="font-display font-bold">{r.name}</div>
                <div className="truncate text-xs text-muted-foreground">
                  {r.category} · {r.tagline}
                </div>
              </div>
              {!r.published && (
                <span className="rounded-full bg-muted px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Hidden
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
                  if (confirm(`Delete ${r.name}?`)) remove.mutate(r.id);
                }}
                aria-label={`Delete ${r.name}`}
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

function ProductForm({
  value,
  onChange,
  onCancel,
  onSave,
  saving,
  error,
}: {
  value: Row | Omit<Row, "id">;
  onChange: (v: Row | Omit<Row, "id">) => void;
  onCancel: () => void;
  onSave: () => void;
  saving: boolean;
  error: string | null;
}) {
  const set = (patch: Partial<Row>) => onChange({ ...value, ...patch });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave();
      }}
      className="grid max-w-3xl gap-5 rounded-2xl border border-border bg-card p-6"
    >
      <Text label="Product name" value={value.name} onChange={(v) => set({ name: v })} required />
      <Text
        label="Web address (lowercase, dashes)"
        value={value.slug}
        onChange={(v) => set({ slug: v })}
        required
      />
      <div>
        <Label>Category</Label>
        <select
          value={value.category}
          onChange={(e) => set({ category: e.target.value })}
          className="mt-2 w-full rounded-md border border-input bg-background p-3 text-sm"
        >
          {productCategories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>
      <Text label="Short tagline" value={value.tagline} onChange={(v) => set({ tagline: v })} />
      <Area label="Description" value={value.description} onChange={(v) => set({ description: v })} />
      <Text
        label="Photo link (optional)"
        value={value.image_url ?? ""}
        onChange={(v) => set({ image_url: v })}
      />
      <Text
        label="Photo description (for accessibility)"
        value={value.image_alt}
        onChange={(v) => set({ image_alt: v })}
      />

      <div>
        <Label>Specifications</Label>
        <div className="mt-2 grid gap-2">
          {value.specs.map((s, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={s.label}
                placeholder="Label"
                onChange={(e) => {
                  const specs = [...value.specs];
                  specs[i] = { ...s, label: e.target.value };
                  set({ specs });
                }}
                className="w-1/2 rounded-md border border-input bg-background p-2 text-sm"
              />
              <input
                value={s.value}
                placeholder="Value"
                onChange={(e) => {
                  const specs = [...value.specs];
                  specs[i] = { ...s, value: e.target.value };
                  set({ specs });
                }}
                className="w-1/2 rounded-md border border-input bg-background p-2 text-sm"
              />
              <button
                type="button"
                aria-label="Remove specification"
                onClick={() => set({ specs: value.specs.filter((_, j) => j !== i) })}
                className="grid size-9 shrink-0 place-items-center rounded-md border border-border text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => set({ specs: [...value.specs, { label: "", value: "" }] })}
            className="justify-self-start rounded-full border border-border px-4 py-2 text-xs font-bold uppercase tracking-widest hover:border-secondary hover:text-secondary"
          >
            Add specification
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={value.published}
            onChange={(e) => set({ published: e.target.checked })}
          />
          Show on website
        </label>
        <label className="flex items-center gap-2 text-sm">
          Order
          <input
            type="number"
            value={value.sort_order}
            onChange={(e) => set({ sort_order: Number(e.target.value) })}
            className="w-24 rounded-md border border-input bg-background p-2 text-sm"
          />
        </label>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-secondary px-6 py-3 text-xs font-bold uppercase tracking-widest text-secondary-foreground disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-border px-6 py-3 text-xs font-bold uppercase tracking-widest"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
      {children}
    </span>
  );
}

export function Text({
  label,
  value,
  onChange,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-md border border-input bg-background p-3 text-sm outline-none focus:border-secondary"
      />
    </div>
  );
}

export function Area({
  label,
  value,
  onChange,
  rows = 5,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <textarea
        value={value}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-md border border-input bg-background p-3 text-sm outline-none focus:border-secondary"
      />
    </div>
  );
}
