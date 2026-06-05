# OEMWears SvelteKit

The public website for OEMWears — a sportswear manufacturer. Built as a
single-page application with SvelteKit + Svelte 5 + Tailwind 4, fully
client-side rendered, hosted on GitHub Pages. All content (products,
contact info, page copy) lives in plain JSON / TS files in this repo — no
database, no server.

The original site (Next.js + Prisma + Resend + admin dashboard) is kept
under `oemwears/` for reference only. Do not edit files inside that
folder.

---

## Prerequisites

- **Node.js 20 or newer** (check with `node -v`)
- **npm** (bundled with Node)

## Quick start

```bash
npm install      # install dependencies
npm run dev      # start a hot-reloading dev server on http://localhost:5173
```

To produce a production build into `build/`:

```bash
npm run build
npm run preview  # serves the build/ output locally on http://localhost:4173
```

To type-check the project:

```bash
npm run check
```

## Project layout

```
src/
├── app.css                     # Tailwind 4 + theme variables
├── app.d.ts                    # ambient type declarations (build-time defines)
├── app.html                    # HTML shell (lang attribute here must match LOCALE)
├── lib/
│   ├── site.config.ts          # ⭐ edit this to change locale / brand / contact / webhook
│   ├── content/                # i18n UI strings (en.ts, de.ts)
│   ├── data/                   # static JSON "database" (products, categories, …)
│   ├── types.ts                # TypeScript shapes for data + i18n
│   ├── utils/                  # cn(), discord webhook, SEO helper
│   └── components/             # UI primitives, layout, page sections, contact
└── routes/
    ├── +error.svelte           # 404 + runtime error page
    ├── +layout.svelte          # navigation + footer + WhatsApp button
    ├── +page.svelte            # home
    ├── about/                  # one folder per public page
    ├── certifications/
    ├── contact/
    ├── customization/
    ├── policies/
    └── products/
```

**Documentation**

- `README.md` (this file) — onboarding, common tasks, build & deploy.
- `TRANSLATIONS.md` — full reference for the bilingual content system:
  the `*De` convention, the `localizeRow` / `localizeList` /
  `localizePolicies` helpers, policy-table row labels, the dead-code
  trade-off, and how to add a new bilingual entity.

## Common tasks

### Switch the site's language

The active language is locked in at build time. To switch from English
to German (or vice versa):

1. Open `src/lib/site.config.ts`.
2. Change the `LOCALE` constant:
   ```ts
   export const LOCALE: Locale = 'de'; // was 'en'
   ```
3. The static HTML shell in `src/app.html` carries a `<html lang="…">`
   attribute as the initial value — the root layout's `$effect` updates
   it at runtime from `LOCALE`, so the visible value is always correct
   in JS-enabled browsers. Keep them in sync for the no-JS fallback.
4. Rebuild: `npm run build`.

> If the German page copy in `src/lib/content/de.ts` is out of date,
> edit that file directly. Both `en.ts` and `de.ts` must satisfy the
> `SiteContent` type in `src/lib/types.ts`.

#### Where German content lives

There are **two content layers**, and both must be kept in sync:

| Layer | Files | Holds |
|---|---|---|
| UI strings | `src/lib/content/{en,de}.ts` | Navigation, hero copy, footer, form labels, validation messages, page subtitles, the "USPs"… |
| CMS-style data | `src/lib/data/*.json` | Products, customizations, certifications, about sections, policies, testimonials |

For the **data layer**, every user-facing field can carry an optional
`*De` sibling (`name` + `nameDe`, `description` + `descriptionDe`, …).
When `LOCALE === 'de'`, the data loader in `src/lib/data/index.ts` swaps
the base field for its `*De` sibling. Component code keeps reading
`product.name`, `cat.label`, `cert.description` — the swap is invisible.

For the full reference (the `*De` field map per file, the
`localizeRow` / `localizeList` / `localizePolicies` helpers, the
policy-table row-label lookup, and how to add a new bilingual entity),
see **[`TRANSLATIONS.md`](./TRANSLATIONS.md)**.

### Add a new product

1. Open `src/lib/data/products.json`.
2. Add a new object to the array. Use the same shape as the existing
   entries. Include `*De` fields if you want the German build to show
   translated text — if you leave them out, the loader falls back to
   the English base value:
   ```json
   {
     "id": "p-jersey-basketball",
     "name": "Basketball Jersey",
     "nameDe": "Basketballtrikot",
     "category": "jerseys",
     "description": "Lightweight basketball jersey with breathable mesh.",
     "descriptionDe": "Leichtes Basketballtrikot mit atmungsaktivem Mesh.",
     "images": ["https://example.com/your-image.jpg"],
     "fabric": "100% polyester mesh, 140 gsm",
     "fabricDe": "100 % Polyester-Mesh, 140 g/m²",
     "printingMethods": ["Sublimation", "Screen Print"],
     "printingMethodsDe": ["Sublimation", "Siebdruck"],
     "features": ["Breathable mesh", "Reinforced stitching"],
     "featuresDe": ["Atmungsaktives Mesh", "Verstärkte Nähte"],
     "isActive": true
   }
   ```
   The `category` value must match a `value` from
   `product-categories.json` (e.g. `jerseys`, `shorts`, `shirts`).
3. Save the file. The products page and home featured-products section
   update automatically on next build.
4. If the image URL is wrong, broken products show a placeholder via
   `ProductCard.svelte`.
5. If you're adding a brand-new `category` value, also add it to
   `product-categories.json` (with `labelDe`) and to **both**
   `t.contact.productOptions` maps in `en.ts` / `de.ts` — the
   contact form's product dropdown reads from there.

To **hide** a product without deleting it, set `"isActive": false` —
it will be filtered out of the site.

### Add a new product category

Categories are driven by `src/lib/data/product-categories.json`. To add
one, add a row (with `labelDe` for the German build) and add the
matching entry to **both** `t.contact.productOptions` in
`src/lib/content/en.ts` and `de.ts`:

```jsonc
// product-categories.json
{ "id": "c-hoodies", "value": "hoodies", "label": "Hoodies", "labelDe": "Hoodies", "order": 7, "isActive": true }
```

```ts
// src/lib/content/en.ts (and de.ts, with the German label)
productOptions: {
  // ...existing
  hoodies: 'Hoodies',
},
```

### Change contact details (email, phone, address, socials)

Edit `src/lib/site.config.ts`. The `CONTACT` object is the single
source of truth — every page (header, footer, contact form info
panel, WhatsApp button) reads from it.

```ts
export const CONTACT = {
  email: 'info@oemwears.com',
  phone: '+1 (234) 567-890',
  address: 'Manufacturing District, CN',
  whatsappNumber: '1234567890',   // digits only, no spaces or +
  hours: 'Mo - Fr: 9:00 - 18:00\nSa: 9:00 - 13:00',
  facebookUrl: 'https://facebook.com',
  instagramUrl: 'https://instagram.com',
  linkedinUrl: 'https://linkedin.com'
} as const;
```

After saving, run `npm run build` to verify everything still works.

### Rotate the Discord webhook

The contact form POSTs submissions to a Discord channel via a webhook
URL stored in `site.config.ts`:

```ts
export const DISCORD_WEBHOOK_URL = 'https://discordapp.com/api/webhooks/...';
```

To rotate it (e.g. the old channel was spammed or the URL leaked):

1. In Discord, go to the channel's **Edit Channel → Integrations →
   Webhooks**, delete the old webhook, and create a new one. Copy its URL.
2. Paste the new URL into `src/lib/site.config.ts`.
3. Rebuild and redeploy.

> **⚠️ Security note:** The webhook URL is bundled into the static
> JavaScript that ships to the browser, so it is effectively public.
> Treat the destination Discord channel accordingly — assume anyone
> with the URL can post to it. If you see spam arriving from the form,
> rotate the webhook (steps above) and consider adding a hidden
> spam-check field or rate-limit gateway in front of the channel.

## Build & deploy

### Local production build

```bash
npm run build
```

The output goes to `build/`. Serve it with any static file host
(`npx serve build`, nginx, Cloudflare Pages, etc.).

### GitHub Pages

A workflow at `.github/workflows/deploy.yml` builds and publishes the
site to the `gh-pages` environment on every push to `main`. Configure
GitHub Pages in the repo settings to use the `gh-pages` environment
(under **Settings → Pages**).

You typically only need to commit your changes and push:

```bash
git add .
git commit -m "Your message"
git push origin main
```

…then watch the Actions tab. The first deployment may require enabling
GitHub Pages in the repo settings.

### Deploying a German build separately

Because the language is baked in at build time, the German and English
sites are two separate builds. The default workflow builds only the
current `LOCALE`. To publish both languages, the simplest path is to
host them on different subdomains or use a different host for each
build.

**Before deploying, verify the chosen locale's content is complete:**

1. `npm run check` — must be 0 errors / 0 warnings.
2. `npm run build` — must succeed.
3. `npm run preview` and walk through every page (`/`, `/products`,
   `/customization`, `/policies`, `/certifications`, `/about`,
   `/contact`) looking for any English leaks. The contact form's
   product dropdown, the policies table row labels, the certifications
   descriptions, and the about-page section bodies are the most likely
   places for missing translations.

## Troubleshooting

**`npm install` warns about deprecated packages.** That's `lucide-svelte`.
The replacement (`@lucide/svelte`) has a different import path. Not
critical — the current package still works.

**Type errors on the policies JSON.** The `data` field in policies
holds different keys depending on whether it's an MOQ or lead-time
row. The cast in `src/lib/data/index.ts` handles this. If you add a
new policy type, update the `Policy` interface in `src/lib/types.ts`
to match. The matching `*De` fields are localized by
`localizePolicies` in the same file.

**Missing translations in the German build.** The data loader in
`src/lib/data/index.ts` uses each `*De` field only if it is non-empty
— so a missing `descriptionDe` silently falls back to the English
`description`. To audit the German build, open the built bundle and
search for English strings (`Mindestbestellmengen`/`Minimum Order`,
`Unsere Fabrik`/`Our Factory`, etc.), or run the build with
`LOCALE = 'de'` and walk the site visually. The full convention is
documented in [`TRANSLATIONS.md`](./TRANSLATIONS.md).

**Contact form submits but nothing arrives in Discord.** Check that
`DISCORD_WEBHOOK_URL` in `site.config.ts` is correct and the webhook
hasn't been deleted in Discord. Open the browser's Network tab and
look for a `POST` to the webhook — a non-2xx response means the
webhook is bad.

## License

Internal — OEMWears.
