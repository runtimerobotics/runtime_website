import { defineConfig } from 'astro/config';

// Final custom-domain deployment:
//   SITE_URL=https://runtimerobotics.com npm run build
//
// Temporary GitHub project URL:
//   SITE_URL=https://YOUR_USER.github.io BASE_PATH=/runtime-static npm run build
const site = process.env.SITE_URL || 'https://runtimerobotics.com';
const base = process.env.BASE_PATH || undefined;

export default defineConfig({
  site,
  ...(base ? { base } : {}),
  output: 'static',
  trailingSlash: 'always'
});
