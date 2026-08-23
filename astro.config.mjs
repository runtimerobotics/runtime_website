import { defineConfig } from 'astro/config';

// GitHub Pages supplies SITE_URL and BASE_PATH through configure-pages in CI.
// The fallback matches the configured custom domain for local builds.
//   SITE_URL=https://runtimerobotics.com npm run build
const site = process.env.SITE_URL || 'https://runtimerobotics.com';
const base = process.env.BASE_PATH || undefined;

export default defineConfig({
  site,
  ...(base ? { base } : {}),
  output: 'static',
  trailingSlash: 'always'
});
