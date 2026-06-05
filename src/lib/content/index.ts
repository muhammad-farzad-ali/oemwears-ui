/**
 * i18n entry point.
 *
 * Picks the right content file based on the build-time `LOCALE` constant
 * in `src/lib/site.config.ts`. Visitors cannot change the language at
 * runtime — to switch, edit `LOCALE` and rebuild.
 *
 * The other locale's bundle (~15 KB) is still emitted by the build but
 * is never executed or reached in the DOM. The conditional is kept as a
 * simple ternary so the codebase stays readable; a future Rollup upgrade
 * or a custom Vite plugin could tree-shake the unused locale, but the
 * current trade-off prioritises clarity over a few KB of dead code.
 */

import type { SiteContent } from '../types';
import { LOCALE } from '../site.config';
import en from './en';
import de from './de';

const t: SiteContent = LOCALE === 'de' ? de : en;

export { t, LOCALE };
