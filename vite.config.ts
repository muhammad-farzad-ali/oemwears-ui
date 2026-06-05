import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { copyFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * GitHub Pages serves `404.html` (or its 404 page) when a path is not
 * found. For a single-page app to handle client-side routes (e.g.
 * `/contact`, `/products`), the 404 page must be the same SPA shell as
 * `index.html`. This plugin copies `build/index.html` to `build/404.html`
 * and writes a `.nojekyll` marker after each build.
 */
function githubPagesFallback() {
  return {
    name: 'github-pages-fallback',
    closeBundle() {
      const buildDir = resolve(process.cwd(), 'build');
      const indexPath = resolve(buildDir, 'index.html');
      const notFoundPath = resolve(buildDir, '404.html');
      const noJekyllPath = resolve(buildDir, '.nojekyll');

      if (existsSync(indexPath)) {
        copyFileSync(indexPath, notFoundPath);
      }
      if (existsSync(buildDir)) {
        writeFileSync(noJekyllPath, '');
      }
    }
  };
}

export default defineConfig({
  plugins: [tailwindcss(), sveltekit(), githubPagesFallback()]
});
