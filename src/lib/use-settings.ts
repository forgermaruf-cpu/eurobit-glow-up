import { useQuery } from "@tanstack/react-query";
import { settingsQuery } from "./cms-queries";

export const settingsDefaults = {
  phone: "0313 9544444",
  phone_link: "+923139544444",
  whatsapp: "923139544444",
  email: "info@eurobit.online",
  address: "Industrial Estate, Kot Lakhpat, Lahore, Pakistan",
  coverage: "All Pakistan",
  hours: "Mon – Sat · 9:00 – 18:00",
  hero_title: "",
  hero_subtitle: "",
};

export type SiteSettings = typeof settingsDefaults;

export const whatsappMessage =
  "Hello Eurobit! I would like to inquire about your waterproofing products.";

export function useSettings(): SiteSettings & { whatsappHref: string } {
  const { data } = useQuery({ ...settingsQuery, retry: 1 });
  const merged = { ...settingsDefaults, ...(data ?? {}) } as SiteSettings;
  return {
    ...merged,
    whatsappHref: `https://wa.me/${merged.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`,
  };
}
