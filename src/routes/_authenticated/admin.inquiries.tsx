import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/inquiries")({
  component: AdminInquiries,
});

type Row = {
  id: string;
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
  location: string | null;
  message: string;
  status: string;
  created_at: string;
};

function AdminInquiries() {
  const qc = useQueryClient();

  const { data: rows = [], isLoading } = useQuery({
    queryKey: ["admin", "inquiries"],
    queryFn: async (): Promise<Row[]> => {
      const { data, error } = await supabase
        .from("inquiries")
        .select("id,name,company,email,phone,location,message,status,created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const update = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("inquiries").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin"] }),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("inquiries").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin"] }),
  });

  if (isLoading) return <p className="text-sm text-muted-foreground">Loading…</p>;
  if (!rows.length)
    return <p className="text-muted-foreground">No messages yet. They will appear here automatically.</p>;

  return (
    <div className="grid gap-4">
      {rows.map((r) => (
        <article key={r.id} className="rounded-xl border border-border bg-card p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="font-display text-lg font-bold">
                {r.name}
                {r.company ? ` · ${r.company}` : ""}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                <a href={`mailto:${r.email}`} className="hover:text-secondary">{r.email}</a>
                {r.phone && (
                  <>
                    {" · "}
                    <a href={`tel:${r.phone}`} className="hover:text-secondary">{r.phone}</a>
                  </>
                )}
                {r.location && ` · ${r.location}`}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {new Date(r.created_at).toLocaleDateString()}
              </span>
              <select
                value={r.status}
                onChange={(e) => update.mutate({ id: r.id, status: e.target.value })}
                className="rounded-md border border-input bg-background px-2 py-1 text-xs"
              >
                <option value="new">New</option>
                <option value="in_progress">In progress</option>
                <option value="done">Done</option>
              </select>
              <button
                onClick={() => {
                  if (confirm("Delete this message?")) remove.mutate(r.id);
                }}
                aria-label="Delete message"
                className="grid size-8 place-items-center rounded-md border border-border text-muted-foreground hover:border-destructive hover:text-destructive"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
          <p className="mt-4 whitespace-pre-line text-sm">{r.message}</p>
        </article>
      ))}
    </div>
  );
}
