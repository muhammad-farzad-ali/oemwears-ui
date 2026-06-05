/**
 * Tiny SEO helpers used by every page's `<svelte:head>` block.
 */

import { BRAND } from '$lib/site.config';

/** Build a `<title>` value: `"<page title> | <brand name>"`. */
export function pageTitle(section: string): string {
  return `${section} | ${BRAND.name}`;
}
