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

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : undefined));

const inquirySchema = z.object({
  name: z.string().trim().min(2).max(120),
  company: optionalText(160),
  email: z.string().trim().email().max(254),
  phone: optionalText(40),
  location: optionalText(160),
  message: z.string().trim().min(5).max(5000),
  product: optionalText(160),
});

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inquirySchema.parse(data))
  .handler(async ({ data }) => {
    const { error } = await publicClient()
      .from("inquiries")
      .insert({ ...data, status: "new" });
    if (error) throw new Error(error.message);
    return { ok: true };
  });
