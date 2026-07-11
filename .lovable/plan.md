# Fix GitHub Pages 404

## Problem

The GitHub Actions workflow builds the TanStack Start app and uploads `.output/public` to GitHub Pages. TanStack Start's default build produces a **server** (Cloudflare Worker) plus a small `public/` folder — GitHub Pages is static-only, so any route other than `/` (and often even `/` itself) returns 404 because there is no server to render HTML on request.

## Fix

Switch the production build to a **fully prerendered static site** and add a SPA fallback so client-side navigation deep links work.

### Steps

1. **Configure Nitro to prerender every route** in `vite.config.ts`:
   - Set the Nitro preset to `static`.
   - Enable `prerender` with `crawlLinks: true` and seed routes for every page (`/`, `/about`, `/products`, each product slug from `src/lib/products.ts`, `/news`, `/location`, `/contact`, `/sitemap.xml`).
   - This makes the build emit real `.html` files for every route into `.output/public/`.

2. **Add SPA fallback for client-side routes**:
   - After build, copy `.output/public/index.html` to `.output/public/404.html`. GitHub Pages serves `404.html` for any unknown path, which lets the TanStack router take over and render the correct page on refresh/deep link.
   - Add a small post-build step to the GitHub Actions workflow (`.github/workflows/static.yml`).

3. **Disable Jekyll processing**:
   - Add an empty `public/.nojekyll` file so GitHub Pages serves files/folders starting with `_` (Vite's `_build` assets).

4. **Base path**: user confirmed root site (`username.github.io` or custom domain), so no `base` config change is needed.

5. **Verify** by running `bun run build` locally in the sandbox and confirming `.output/public/` contains `index.html`, `about/index.html`, `products/index.html`, product detail pages, etc.

## Notes

- Server functions and any dynamic SSR features won't work on GitHub Pages (static hosting). The current site is content-only, so this is fine. The contact form's `createServerFn` (if any) would need a different host — I'll flag it if the build fails on it.
- The Lovable-hosted URL (`eurobit-glow-up.lovable.app`) keeps working exactly as before; this only changes what the GitHub Pages workflow ships.
