import { defineConfig } from 'astro/config';

// GitHub Pages user site: served at the domain root, without a repository prefix.
export default defineConfig({
  site: 'https://juhyungkim12.github.io',
  base: '/',
  output: 'static',
  trailingSlash: 'always',
});
