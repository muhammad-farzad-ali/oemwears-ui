# Sportbekleidungsagentur — SvelteKit site

The public website for **Sportbekleidungsagentur** — a Germany-based
sportswear production agency that coordinates custom sportswear
manufacturing through a vetted network of overseas production partners
in **Pakistan, Turkey, Portugal, and China**.

Built as a single-page application with **SvelteKit + Svelte 5 + Tailwind 4**,
fully client-side rendered, hosted on **GitHub Pages**. All content
(apparel categories, services, partner countries, contact info, page
copy) lives in plain JSON / TS files in this repo — no database, no
server. The default build is **German** (`LOCALE = 'de'`).

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
│   ├── data/                   # static JSON "database" (apparel types, services, partner countries, …)
│   ├── types.ts                # TypeScript shapes for data + i18n
│   ├── utils/                  # cn(), discord webhook, SEO helper
│   └── components/
│       ├── home/               # home page sections (Hero, USPs, PartnerCountries, FeaturedApparel, …)
│       ├── layout/             # Navigation, Footer
│       ├── contact/            # ContactForm, ContactInfoPanel
│       └── ui/                 # shared UI primitives (Card, Button, …)
└── routes/
    ├── +error.svelte           # 404 + runtime error page
    ├── +layout.svelte          # navigation + footer + WhatsApp button
    ├── +page.svelte            # home
    ├── about/                  # agency story, German core team, partner network
    ├── apparel/                # 9 apparel categories (jerseys, hoodies, tracksuits, …)
    ├── contact/                # contact form + info panel
    ├── partners/               # 4 partner countries + 4 quality certifications
    ├── policies/               # MOQ table + lead-time table + shipping options
    └── services/               # 6 agency services + 4-step process
```

**Documentation**

- `README.md` (this file) — onboarding, common tasks, build & deploy.
- `TRANSLATIONS.md` — full reference for the bilingual content system:
  the `*De` convention, the `localizeRow` / `localizeList` /
  `localizePolicies` helpers, policy-table row labels, the dead-code
  trade-off, and how to add a new bilingual entity.

## Common tasks

### Switch the site's language

The active language is locked in at build time. To switch from German
(the default) to English (or vice versa):

1. Open `src/lib/site.config.ts`.
2. Change the `LOCALE` constant:
   ```ts
   export const LOCALE: Locale = 'en'; // was 'de'
   ```
3. The static HTML shell in `src/app.html` carries a `<html lang="…">`
   attribute as the initial value — the root layout's `$effect` updates
   it at runtime from `LOCALE`, so the visible value is always correct
   in JS-enabled browsers. Keep them in sync for the no-JS fallback.
4. Rebuild: `npm run build`.

> If the other locale's page copy in `src/lib/content/{en,de}.ts` is
> out of date, edit that file directly. Both files must satisfy the
> `SiteContent` type in `src/lib/types.ts`.

#### Where the two locales live

There are **two content layers**, and both must be kept in sync:

| Layer | Files | Holds |
|---|---|---|
| UI strings | `src/lib/content/{en,de}.ts` | Navigation, hero copy, footer, form labels, validation messages, page subtitles, the 5 USPs… |
| CMS-style data | `src/lib/data/*.json` | Apparel types, services, partner countries, certifications, about sections, policies, testimonials |

For the **data layer**, every user-facing field can carry an optional
`*De` sibling (`name` + `nameDe`, `description` + `descriptionDe`, …).
When `LOCALE === 'de'`, the data loader in `src/lib/data/index.ts` swaps
the base field for its `*De` sibling. Component code keeps reading
`apparel.name`, `country.description`, `service.title` — the swap is
invisible.

For the full reference (the `*De` field map per file, the
`localizeRow` / `localizeList` / `localizePolicies` helpers, the
policy-table row-label lookup, and how to add a new bilingual entity),
see **[`TRANSLATIONS.md`](./TRANSLATIONS.md)**.

### Add a new apparel category

1. Open `src/lib/data/apparel-types.json`.
2. Add a new object to the array, using the existing entries as a
   template. Include `*De` fields for the German build (or leave them
   out — the loader falls back to the English base value):
   ```json
   {
     "id": "at-padel",
     "value": "padel",
     "name": "Padel Apparel",
     "nameDe": "Padel-Bekleidung",
     "description": "Performance padel wear for the fast-growing racket sport.",
     "descriptionDe": "Performance-Bekleidung für den wachsenden Racketsport Padel.",
     "image": "https://images.unsplash.com/photo-1599582909646-2e8dd4a9c0d6?w=800",
     "examples": ["Padel tees", "Skorts", "Polos"],
     "examplesDe": ["Padel-Shirts", "Skorts", "Polos"],
     "features": ["Quick-dry", "4-way stretch"],
     "featuresDe": ["Schnelltrocknend", "4-Wege-Stretch"],
     "order": 10,
     "isActive": true
   }
   ```
3. Save the file. The apparel page and home featured-apparel section
   update automatically on next build.
4. If you want this category to appear in the **policies MOQ table**,
   also add a matching entry under `data` (and `dataDe`) in
   `src/lib/data/policies.json` — the `value` field from your new
   apparel row must match the MOQ row key.

To **hide** an apparel category without deleting it, set
`"isActive": false` — it will be filtered out of the site.

### Add a new service

1. Open `src/lib/data/services.json`.
2. Add a new object with a `value`, `title`, `titleDe`, `description`,
   `descriptionDe`, a lucide icon name in the `icon` field (e.g.
   `Scissors`, `Tag`, `Truck`), and a `highlights` / `highlightsDe`
   array.
3. The services page and home services-overview section pick it up on
   the next build.

### Add a new partner country

1. Open `src/lib/data/partner-countries.json`.
2. Add a new object with `name` / `nameDe`, an emoji flag in the
   `flag` field, `description` / `descriptionDe`, and a `strengths` /
   `strengthsDe` array.
3. The home partner-countries section and `/partners` page pick it up
   on the next build.

### Change contact details (email, phone, address, socials)

Edit `src/lib/site.config.ts`. The `CONTACT` object is the single
source of truth — every page (header, footer, contact form info
panel, WhatsApp button) reads from it.

```ts
export const CONTACT = {
  email: 'info@sportbekleidungsagentur.de',
  phone: '+49 30 12345678',
  address: 'Germany',
  whatsappNumber: '493012345678',   // digits only, no spaces or +
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
3. `npm run preview` and walk through every page (`/`, `/apparel`,
   `/services`, `/about`, `/partners`, `/policies`, `/contact`) looking
   for any English leaks. The contact form's service dropdown, the
   policies table row labels, the partner country descriptions, and the
   about-page section bodies are the most likely places for missing
   translations.

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
`Unsere Agentur`/`Our Agency`, etc.), or run the build with
`LOCALE = 'de'` and walk the site visually. The full convention is
documented in [`TRANSLATIONS.md`](./TRANSLATIONS.md).

**Contact form submits but nothing arrives in Discord.** Check that
`DISCORD_WEBHOOK_URL` in `site.config.ts` is correct and the webhook
hasn't been deleted in Discord. Open the browser's Network tab and
look for a `POST` to the webhook — a non-2xx response means the
webhook is bad.

**Lucide icon in a service row doesn't render.** The `icon` field in
`services.json` is a string name of a lucide-svelte export. Make sure
the corresponding icon is also imported in the `iconMap` object in
`src/routes/services/+page.svelte` — the page maps the string to the
component at runtime.

## License

Internal — Sportbekleidungsagentur.
