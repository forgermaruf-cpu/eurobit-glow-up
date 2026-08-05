// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { readFileSync } from "node:fs";

// STATIC=1 => fully prerendered static site (GitHub Pages). Otherwise: normal Lovable SSR build.
const isStatic = process.env["STATIC"] === "1";
const base = process.env["BASE_PATH"] ?? "/";

const productSlugs = Array.from(
  readFileSync("./src/lib/products.ts", "utf8").matchAll(/slug:\s*"([^"]+)"/g),
).map((m) => m[1]);

const prerenderPaths = [
  "/",
  "/about",
  "/products",
  "/news",
  "/location",
  "/contact",
  ...productSlugs.map((slug) => `/products/${slug}`),
];

export default defineConfig(
  isStatic
    ? {
        vite: { base },
        nitro: false,
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
