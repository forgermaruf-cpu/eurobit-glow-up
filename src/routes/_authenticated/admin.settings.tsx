import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/settings")({
  component: AdminSettings,
});

const fields: { key: string; label: string; multiline?: boolean }[] = [
  { key: "phone", label: "Phone number (as shown)" },
  { key: "phone_link", label: "Phone number for calling (e.g. +923139544444)" },
  { key: "whatsapp", label: "WhatsApp number (e.g. 923139544444)" },
  { key: "email", label: "Email address" },
  { key: "address", label: "Address", multiline: true },
  { key: "coverage", label: "Delivery coverage", multiline: true },
  { key: "hours", label: "Opening hours" },
  { key: "hero_title", label: "Homepage headline", multiline: true },
  { key: "hero_subtitle", label: "Homepage intro paragraph", multiline: true },
];

function AdminSettings() {
  const qc = useQueryClient();
  const [values, setValues] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  const { data } = useQuery({
    queryKey: ["admin", "settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("key,value");
      if (error) throw error;
      return Object.fromEntries((data ?? []).map((r) => [r.key, r.value])) as Record<string, string>;
    },
  });

  useEffect(() => {
    if (data) setValues(data);
  }, [data]);

  const save = useMutation({
    mutationFn: async () => {
      const rows = fields.map((f) => ({
        key: f.key,
        value: values[f.key] ?? "",
        updated_at: new Date().toISOString(),
      }));
      const { error } = await supabase.from("site_settings").upsert(rows, { onConflict: "key" });
      if (error) throw error;
    },
    onSuccess: () => {
      setSaved(true);
      qc.invalidateQueries({ queryKey: ["cms", "settings"] });
      setTimeout(() => setSaved(false), 2500);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        save.mutate();
      }}
      className="grid max-w-2xl gap-5"
    >
      <p className="text-muted-foreground">
        These details appear in the top bar, footer, contact page and homepage.
      </p>
      {fields.map((f) => (
        <div key={f.key}>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            {f.label}
          </span>
          {f.multiline ? (
            <textarea
              rows={3}
              value={values[f.key] ?? ""}
              onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
              className="mt-2 w-full rounded-md border border-input bg-background p-3 text-sm outline-none focus:border-secondary"
            />
          ) : (
            <input
              value={values[f.key] ?? ""}
              onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
              className="mt-2 w-full rounded-md border border-input bg-background p-3 text-sm outline-none focus:border-secondary"
            />
          )}
        </div>
      ))}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={save.isPending}
          className="rounded-full bg-secondary px-6 py-3 text-xs font-bold uppercase tracking-widest text-secondary-foreground disabled:opacity-60"
        >
          {save.isPending ? "Saving…" : "Save changes"}
        </button>
        {saved && <span className="text-sm text-secondary">Saved</span>}
      </div>
    </form>
  );
}
