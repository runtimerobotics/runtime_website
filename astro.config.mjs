import { defineConfig } from 'astro/config';

// GitHub Pages supplies SITE_URL and BASE_PATH through configure-pages in CI.
// The fallback matches this repository's default project URL for local builds.
//   SITE_URL=https://runtimerobotics.github.io BASE_PATH=/runtime_website npm run build
const site = process.env.SITE_URL || 'https://runtimerobotics.github.io';
const base = process.env.BASE_PATH || undefined;

export default defineConfig({
  site,
  ...(base ? { base } : {}),
  output: 'static',
  trailingSlash: 'always'
});
