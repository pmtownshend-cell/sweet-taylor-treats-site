// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Static hosting (GitHub Pages): no server runtime, everything is prerendered
  // to plain HTML plus a client-side SPA fallback.
  nitro: false,
  tanstackStart: {
    // SPA build: one static HTML shell, client-side routing after hydration.
    spa: {
      enabled: true,
      prerender: { outputPath: "index.html", crawlLinks: false },
    },
  },
});
