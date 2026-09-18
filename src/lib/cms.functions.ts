import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

function publicClient() {
  return createClient<Database>(
    process.env["SUPABASE_URL"]!,
    process.env["SUPABASE_PUBLISHABLE_KEY"]!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );
}

export type Spec = { label: string; value: string };

export type CmsProduct = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  specs: Spec[];
  image_url: string | null;
  image_alt: string;
};

export type CmsPost = {
  slug: string;
  title: string;
  tag: string;
  excerpt: string;
  body: string;
  published_at: string;
};

export type CmsSettings = Record<string, string>;

function toSpecs(value: unknown): Spec[] {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (s): s is Spec =>
      !!s && typeof s === "object" && typeof (s as Spec).label === "string",
  );
}

export const getProducts = createServerFn({ method: "GET" }).handler(
  async (): Promise<CmsProduct[]> => {
    const { data, error } = await publicClient()
      .from("products")
      .select("slug,name,category,tagline,description,specs,image_url,image_alt")
      .eq("published", true)
      .order("sort_order", { ascending: true });
    if (error) throw new Error(error.message);
    return (data ?? []).map((p) => ({ ...p, specs: toSpecs(p.specs) }));
  },
);

export const getPosts = createServerFn({ method: "GET" }).handler(
  async (): Promise<CmsPost[]> => {
    const { data, error } = await publicClient()
      .from("posts")
      .select("slug,title,tag,excerpt,body,published_at")
      .eq("published", true)
      .order("published_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  },
);

export const getSettings = createServerFn({ method: "GET" }).handler(
  async (): Promise<CmsSettings> => {
    const { data, error } = await publicClient().from("site_settings").select("key,value");
    if (error) throw new Error(error.message);
    return Object.fromEntries((data ?? []).map((r) => [r.key, r.value]));
  },
);

const inquirySchema = z.object({
  name: z.string().min(1).max(200),
  company: z.string().max(200).optional(),
  email: z.string().email().max(200),
  phone: z.string().max(60).optional(),
  location: z.string().max(200).optional(),
  message: z.string().min(1).max(5000),
  product: z.string().max(200).optional(),
});

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inquirySchema.parse(data))
  .handler(async ({ data }) => {
    const { error } = await publicClient().from("inquiries").insert(data);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
