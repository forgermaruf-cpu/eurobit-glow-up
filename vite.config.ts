// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { products } from "./src/lib/products";

// STATIC=1 => fully prerendered static site (GitHub Pages). Otherwise: normal Lovable SSR build.
const isStatic = process.env["STATIC"] === "1";
const base = process.env["BASE_PATH"] ?? "/";

const prerenderPaths = [
  "/",
  "/about",
  "/products",
  "/news",
  "/location",
  "/contact",
  ...products.map((p) => `/products/${p.slug}`),
];

export default defineConfig(
  isStatic
    ? {
        vite: { base, build: { outDir: "dist" } },
        nitro: { preset: "static", output: { dir: ".output", publicDir: "dist" } },
        tanstackStart: {
          spa: { enabled: true },
          prerender: { enabled: true, crawlLinks: true, filter: () => true },
          pages: prerenderPaths.map((path) => ({ path, prerender: { enabled: true } })),
        },
      }
    : {
        tanstackStart: {
          // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
          // nitro/vite builds from this
          server: { entry: "server" },
        },
      },
);
