# Google Analytics 4 Integration

This document explains how Google Analytics (GA4) is wired into the
OEMWears SvelteKit app. It is written for a junior developer who has
never touched the analytics layer before — read it once and you should
be able to find the ID, change it, add new events, and verify that
everything is firing correctly.

For the ticket history, see `TICKETS.md` (T16 → T20).

---

## 1. Where is the GA ID stored?

The measurement ID is the only piece of configuration you need to know
about. It lives in **`src/lib/site.config.ts`**:

```ts
export const GA_MEASUREMENT_ID = 'G-LE0NWV69GJ';
```

That is the only place in the TypeScript code that references the ID.
The HTML snippet in `src/app.html` (see §2) duplicates the literal ID
because `app.html` is plain HTML and cannot `import` from a `.ts` file
— that is the only duplication in the codebase.

To swap the ID (e.g. for staging vs. production), change **both** the
constant in `site.config.ts` and the snippet in `app.html`, then
rebuild.

---

## 2. Why does the GA snippet live in `app.html`?

This is a **pure CSR (client-side rendered) SPA**. There is no
server-side rendering and no per-route HTML. The full app is shipped
as a single `index.html` shell, and the SvelteKit client takes over
from there.

Google's installation instructions say:

> Copy and paste it in the code of every page of your website,
> immediately after the `<head>` element. Don't add more than one
> Google tag to each page.

In an SPA, "every page" collapses to a single physical page — the
shell — so the only correct place to put the tag is in
`src/app.html`, immediately after `<head>`. Putting it in
`+layout.svelte`'s `<svelte:head>` block would also work, but the tag
would be injected at runtime by SvelteKit instead of being in the
initial HTML, which can delay analytics. The `app.html` approach
matches Google's recommendation exactly.

---

## 3. What is in `app.html`?

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-LE0NWV69GJ"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-LE0NWV69GJ');
</script>
```

This is the official Google-supplied snippet, copied verbatim except
for the `<!-- comment -->` line which makes it greppable. The two
important things it does:

1. Loads `gtag.js` from `googletagmanager.com` (async, non-blocking).
2. Pushes two entries into `window.dataLayer`:
   - `gtag('js', new Date())` — registers the script-load time.
   - `gtag('config', 'G-LE0NWV69GJ')` — **fires an automatic
     `page_view` event for the current URL**.

That automatic pageview is only fired **once**, on the initial page
load. Client-side route changes (SvelteKit's CSR navigation) are
invisible to GA without extra code. That is what §4 fixes.

---

## 4. SPA route-change tracking

`src/routes/+layout.svelte` contains:

```ts
import { afterNavigate } from '$app/navigation';
import { GA_MEASUREMENT_ID } from '$lib/site.config';

afterNavigate(({ to }) => {
  if (typeof window === 'undefined' || !window.gtag || !to) return;
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: to.url.pathname + to.url.search
  });
});
```

`afterNavigate` is a SvelteKit lifecycle function that fires **on every
successful client-side navigation** (and once on initial mount in
SvelteKit 2). Each call re-issues the `config` command with a new
`page_path`, which GA interprets as a fresh pageview for that URL.

Without this handler, every SPA route change would be invisible to
GA, and the dashboard would show `1 page/session` for the entire
visit regardless of how many pages the user actually visited.

The `!window.gtag` guard is defensive: if the GA script fails to load
(e.g. ad-blocker), the handler silently no-ops instead of throwing.

---

## 5. TypeScript types for gtag

`src/app.d.ts` declares the gtag globals so any component can call
`gtag(...)` with full type-check support:

```ts
declare global {
  namespace App {}

  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}
export {};
```

The `export {}` at the bottom is what makes the file a **module**,
which is what `declare global` requires to be valid. Do not remove
it.

---

## 6. How to add a custom event

For example, to track contact-form submissions, add this inside the
submit handler of `ContactForm.svelte`:

```ts
window.gtag('event', 'contact_form_submit', {
  method: 'discord_webhook',
  has_phone: Boolean(payload.phone),
  product_interest: payload.productInterest
});
```

That event will appear in GA4 under **Reports → Engagement → Events**
within a few minutes (or instantly in **Realtime → DebugView** if you
have debug mode on — see §7).

Standard GA4 event names to know: `login`, `sign_up`, `purchase`,
`add_to_cart`, `generate_lead`, `contact`, `search`. You can also use
custom names — they show up in custom reports.

---

## 7. How to verify it works

### Quick check (no GA account needed)
1. `npm run build && npm run preview`
2. Open `http://localhost:4173` (or whatever port `preview` logs).
3. DevTools → **Network** → filter `googletagmanager` — you should see
   one request for `gtag/js?id=G-LE0NWV69GJ`.
4. DevTools → **Console** → type `window.dataLayer` — should be an
   array including the `js` and `config` pushes.
5. Navigate from `/` to `/products` to `/contact`. In the Console,
   type `window.dataLayer` again — you should see additional `config`
   pushes, one per route.

### Full check (with GA4 DebugView)
1. Install the **Google Analytics Debugger** Chrome extension.
2. Turn it on, reload the page, open GA4 → **Admin → DebugView**.
3. Your browser session should appear as a "device" and you should see
   `page_view` events for every route you visit.
4. If you added custom events (§6), they will also appear here
   immediately.

---

## 8. Things to NOT do

- **Do not** add a second `<script async src="...googletagmanager...">` block anywhere. Google
  warns explicitly against installing the tag more than once per page.
  The snippet in `app.html` is the single source of truth.
- **Do not** add a `<svelte:head>` block in `+layout.svelte` that
  re-injects the gtag snippet. It will be double-counted.
- **Do not** use the older `analytics.js` (`ga('create', ...)`)
  API. This project is GA4-only and uses `gtag.js`.
- **Do not** move the snippet to a `+page.svelte` file. SvelteKit's
  CSR will not re-inject it on navigation, but it will also be
  subject to per-page lifecycle bugs. `app.html` is correct.
- **Do not** delete the `export {}` from `app.d.ts` — it is what
  makes the `declare global` block valid TypeScript.

---

## 9. File map (quick reference)

| File | Role |
|---|---|
| `src/lib/site.config.ts` | Exports `GA_MEASUREMENT_ID` constant |
| `src/app.html` | The actual gtag.js `<script>` tag (hardcoded ID) |
| `src/app.d.ts` | TypeScript types for `window.gtag` / `window.dataLayer` |
| `src/routes/+layout.svelte` | `afterNavigate` handler that fires pageview on every CSR route change |
| `GA_INTEGRATION.md` | This document |

---

## 10. Cookie consent / GDPR (not currently implemented)

This integration fires GA unconditionally on every page load,
including from visitors in the EEA. If you ever need to add a cookie
consent banner:

1. Replace the unconditional `gtag('config', 'G-...')` call in
   `app.html` with the GA4 **consent mode** pattern
   (`gtag('consent', 'default', { analytics_storage: 'denied' })`).
2. On user opt-in, fire `gtag('consent', 'update', { analytics_storage: 'granted' })`.
3. The `afterNavigate` handler in `+layout.svelte` does not need to
   change — GA will silently drop pageviews until consent is granted.

This is a follow-up ticket, not part of the initial T16–T20 work.
