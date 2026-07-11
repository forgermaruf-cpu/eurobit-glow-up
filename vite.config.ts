// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    prerender: {
      enabled: true,
      crawlLinks: true,
    },
    pages: [
      { path: "/" },
      { path: "/about" },
      { path: "/products" },
      { path: "/news" },
      { path: "/location" },
      { path: "/contact" },
      { path: "/products/eurobit-4170" },
      { path: "/products/eurobit-4170-sl" },
      { path: "/products/eurobit-garden" },
      { path: "/products/eurobit-aluminium" },
      { path: "/products/euro-plast-sp" },
      { path: "/products/euro-cure" },
      { path: "/products/euro-coat-ep" },
      { path: "/products/euro-flex-pu" },
      { path: "/products/euro-seal-pu" },
    ],
  },
});
