import { queryOptions } from "@tanstack/react-query";
import { getPosts, getProducts, getSettings } from "./cms.functions";

export const productsQuery = queryOptions({
  queryKey: ["cms", "products"],
  queryFn: () => getProducts(),
  staleTime: 60_000,
});

export const postsQuery = queryOptions({
  queryKey: ["cms", "posts"],
  queryFn: () => getPosts(),
  staleTime: 60_000,
});

export const settingsQuery = queryOptions({
  queryKey: ["cms", "settings"],
  queryFn: () => getSettings(),
  staleTime: 60_000,
});

export const productCategories = [
  "Bitumen Membrane",
  "Admixture",
  "Coating",
  "Sealant",
] as const;
