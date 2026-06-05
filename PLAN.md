# Port Plan: OEMWears Next.js → SvelteKit (GitHub Pages)

## 1. Architecture Overview

| Concern | Decision |
|---|---|
| Framework | SvelteKit 2.x + Svelte 5 |
| Adapter | `@sveltejs/adapter-static` with `fallback: 'index.html'` (pure SPA / CSR) |
| SSR | **Off** for all routes (`ssr = false`, `csr = true`, `prerender = false`) |
| Styling | Tailwind CSS 4.x (kept identical), CSS variables for theming |
| Icons | `lucide-svelte` |
| Carousel | Hand-built lightweight Svelte carousel (no extra dep) |
| Forms | Native HTML5 + hand-rolled validation (Zod-style rules) |
| Data | Static JSON files in `src/lib/data/`, imported at build time |
| Content (i18n) | Two files (`en.ts`, `de.ts`) selected at build time |
| Locale selection | `src/lib/site.config.ts` exports `LOCALE` constant — visitors cannot switch |
| Contact form | POSTs to a **Discord webhook URL** read from `site.config.ts` (client-side fetch, CORS-allowed by Discord) |
| Base path | `/` (root, no sub-path) |
| Routing | `+page.svelte` only (no `+page.server.ts`, no `+page.ts` with `load`) |

### 1.1 Security note about the Discord webhook

The webhook URL will end up in the static JS bundle (visible to anyone who views-source). This is a known trade-off of pure-static Discord integrations. The plan uses a **build-time constant** (not a `.env` file), and assumes a fresh webhook will be rotated if abused. A short "if you see this URL exposed, treat the channel as public" note is included in the README.

---

## 2. Target Project Structure

```
oemwears-sveltekit/                 (repo root — code lives here)
├── package.json
├── svelte.config.js                # adapter-static, fallback: 'index.html', base '/'
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js              # or @config in app.css (Tailwind 4 style)
├── postcss.config.js
├── .gitignore
├── .npmrc
├── README.md                       # setup, build, deploy, how-to-edit-content
├── .github/
│   └── workflows/
│       └── deploy.yml              # builds and publishes to gh-pages
├── static/
│   └── favicon.svg
└── src/
    ├── app.html
    ├── app.css                     # Tailwind directives + theme variables
    ├── lib/
    │   ├── site.config.ts          # ⭐ LOCALE, BRAND, CONTACT, DISCORD_WEBHOOK
    │   ├── content/
    │   │   ├── en.ts               # English UI strings (re-exported as `t`)
    │   │   ├── de.ts               # German UI strings
    │   │   └── index.ts            # picks en or de based on LOCALE
    │   ├── data/
    │   │   ├── index.ts            # re-exports with isActive filtering
    │   │   ├── products.json
    │   │   ├── product-categories.json
    │   │   ├── customizations.json
    │   │   ├── certifications.json
    │   │   ├── policies.json
    │   │   ├── about-sections.json
    │   │   ├── testimonials.json
    │   │   └── home-hero.json
    │   ├── types.ts                # TypeScript interfaces for all data
    │   ├── utils/
    │   │   ├── cn.ts               # clsx + tailwind-merge wrapper
    │   │   ├── discord.ts          # buildContactEmbed(), sendToDiscord()
    │   │   └── format.ts           # date / locale formatters
    │   ├── components/
    │   │   ├── ui/                 # design-system primitives
    │   │   │   ├── Button.svelte
    │   │   │   ├── Card.svelte
    │   │   │   ├── Badge.svelte
    │   │   │   ├── Input.svelte
    │   │   │   ├── Textarea.svelte
    │   │   │   ├── Label.svelte
    │   │   │   ├── Checkbox.svelte
    │   │   │   ├── Tabs.svelte
    │   │   │   ├── Dialog.svelte
    │   │   │   ├── Table.svelte
    │   │   │   └── Carousel.svelte
    │   │   ├── layout/
    │   │   │   ├── Navigation.svelte
    │   │   │   ├── Footer.svelte
    │   │   │   └── WhatsAppButton.svelte
    │   │   ├── home/
    │   │   │   ├── HeroSection.svelte
    │   │   │   ├── UspsSection.svelte
    │   │   │   ├── FeaturedProductsSection.svelte
    │   │   │   ├── CertificationsSection.svelte
    │   │   │   ├── TestimonialsSection.svelte
    │   │   │   └── CtaSection.svelte
    │   │   ├── products/
    │   │   │   ├── ProductCard.svelte
    │   │   │   ├── CategoryTabs.svelte
    │   │   │   └── ProductGrid.svelte
    │   │   └── contact/
    │   │       ├── ContactInfoPanel.svelte
    │   │       └── ContactForm.svelte
    │   └── stores/
    │       └── toast.ts            # tiny toast store for form feedback
    └── routes/
        ├── +layout.svelte          # Navigation + Footer + WhatsApp
        ├── +layout.ts              # export const ssr = false, csr = true
        ├── +page.svelte            # Home
        ├── products/+page.svelte
        ├── customization/+page.svelte
        ├── about/+page.svelte
        ├── certifications/+page.svelte
        ├── policies/+page.svelte
        └── contact/+page.svelte
```

---

## 3. Build / Deploy Configuration

### 3.1 `svelte.config.js` (key points)
```js
import adapter from '@sveltejs/adapter-static';

export default {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html',     // SPA — all unknown routes serve index.html
      precompress: false,
      strict: false
    }),
    paths: { base: '' }            // root, no sub-path
  }
};
```

### 3.2 `+layout.ts` in root
```ts
export const ssr = false;
export const csr = true;
export const prerender = false;
```

### 3.3 `site.config.ts` (the single source of truth)
```ts
export const LOCALE = 'en' as 'en' | 'de';   // change + rebuild to switch

export const BRAND = {
  name: 'OEMWears',
  domain: 'https://example.com'
};

export const CONTACT = {
  email: 'info@oemwears.com',
  phone: '+1 (234) 567-890',
  address: 'Manufacturing District, CN',
  whatsappNumber: '1234567890',
  hours: 'Mo - Fr: 9:00 - 18:00\nSa: 9:00 - 13:00',
  facebookUrl: 'https://facebook.com',
  instagramUrl: 'https://instagram.com',
  linkedinUrl: 'https://linkedin.com'
};

export const DISCORD_WEBHOOK_URL =
  'https://discordapp.com/api/webhooks/...';
```

A single `t` helper picks the right content file:
```ts
// src/lib/content/index.ts
import { LOCALE } from '../site.config';
import en from './en';
import de from './de';
export const t = LOCALE === 'de' ? de : en;
```

---

## 4. i18n Strategy

- Two parallel content files: `en.ts` and `de.ts` (each is `export default { brand, nav, hero, … } as const`).
- The shape **exactly mirrors** the existing `content.json` so porting strings is mechanical.
- The `t` constant is **imported** into every component, not stored in a Svelte store. Because it resolves at build time, swapping the locale = changing one constant = rebuilding. No runtime language switcher is shipped, and visitors cannot change it.
- `<html lang={LOCALE}>` is set in `app.html`.

---

## 5. Data Strategy

- Each "table" in Prisma becomes one JSON file under `src/lib/data/`.
- Files use the camelCase field names from the Prisma schema (e.g. `printingMethods: string[]`, `isActive: boolean`) so a junior dev can grep and find the original.
- `isActive: false` rows are filtered out at import time in `src/lib/data/index.ts` (single helper per file).
- Types live in `src/lib/types.ts` and are imported where needed.
- Seed data: copy directly from `oemwears/prisma/seed_en.ts` (the English file) and from `oemwears/prisma/seed.ts` (the German version uses German labels/categories — these need to be applied to the German *content*, not the products themselves, so the seed is mostly the same plus German UI strings come from `de.ts`).

---

## 6. Component Parity Matrix

| Next.js source | Svelte target | Notes |
|---|---|---|
| `app/components/ui/button.tsx` | `lib/components/ui/Button.svelte` | `variant` + `size` props; uses `cn` util |
| `app/components/ui/card.tsx` | `lib/components/ui/Card.svelte` with `CardHeader/Title/Description/Content/Footer` | Svelte snippets |
| `app/components/ui/badge.tsx` | `lib/components/ui/Badge.svelte` | |
| `app/components/ui/input.tsx` | `lib/components/ui/Input.svelte` | |
| `app/components/ui/textarea.tsx` | `lib/components/ui/Textarea.svelte` | |
| `app/components/ui/label.tsx` | `lib/components/ui/Label.svelte` | |
| `app/components/ui/checkbox.tsx` | `lib/components/ui/Checkbox.svelte` | hand-rolled (no Radix dep) |
| `app/components/ui/tabs.tsx` | `lib/components/ui/Tabs.svelte` | hand-rolled w/ Svelte 5 `$state` |
| `app/components/ui/dialog.tsx` | `lib/components/ui/Dialog.svelte` | hand-rolled w/ `<dialog>` element |
| `app/components/ui/table.tsx` | `lib/components/ui/Table.svelte` (+ sub-components) | |
| `app/components/ui/carousel.tsx` (embla) | `lib/components/ui/Carousel.svelte` | custom 60-line Svelte carousel using CSS scroll-snap |
| `app/components/navigation.tsx` | `lib/components/layout/Navigation.svelte` | **remove "Admin" link**; keep "Get Quote" CTA |
| `app/components/footer.tsx` | `lib/components/layout/Footer.svelte` | reads `CONTACT` from `site.config` |
| `app/components/whatsapp-button.tsx` | `lib/components/layout/WhatsAppButton.svelte` | same floating button |
| `app/page.tsx` | `routes/+page.svelte` (uses `home/*` section components) | |
| `app/products/page.tsx` | `routes/products/+page.svelte` | category filter via hash anchors (matches original) |
| `app/about/page.tsx` | `routes/about/+page.svelte` | default fallback content if data empty (matches original) |
| `app/contact/page.tsx` | `routes/contact/+page.svelte` | uses Discord instead of `/api/contact` |
| `app/certifications/page.tsx` | `routes/certifications/+page.svelte` | |
| `app/policies/page.tsx` | `routes/policies/+page.svelte` | |
| `app/customization/page.tsx` | `routes/customization/+page.svelte` | |

---

## 7. Discord Webhook Integration (`src/lib/utils/discord.ts`)

```ts
import { DISCORD_WEBHOOK_URL } from '$lib/site.config';

export type ContactPayload = {
  name: string; email: string; company?: string; phone?: string;
  productInterest: string; quantity?: string; message: string;
};

export async function sendToDiscord(p: ContactPayload): Promise<void> {
  const embed = {
    title: `New inquiry from ${p.name}`,
    color: 0x2563eb,
    fields: [
      { name: 'Email', value: p.email, inline: true },
      { name: 'Phone', value: p.phone ?? '—', inline: true },
      { name: 'Company', value: p.company ?? '—', inline: true },
      { name: 'Product', value: p.productInterest, inline: true },
      { name: 'Quantity', value: p.quantity ?? '—', inline: true },
      { name: 'Message', value: p.message }
    ],
    timestamp: new Date().toISOString()
  };
  await fetch(DISCORD_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ embeds: [embed] })
  });
}
```

The form runs client-side validation with the **same rules** as the Zod schema in the original (name ≥ 2, valid email, productInterest required, message ≥ 10).

---

## 8. Navigation Cleanup (avoid visitor confusion)

The original had 7 nav items + "Admin" + a "Get Quote" button. For the public-only build:
- **Top nav (desktop & mobile)**: Home, Products, Customization, About, Certifications, MOQ, Contact
- **Right-side CTA**: "Get Quote" → `/contact`
- **Admin link removed entirely**
- **Floating**: WhatsApp button (unchanged)
- **Footer**: Brand + Quick links (Products, Customization, About, Contact) + Contact info + Socials

This means the visitor's path is always `Home → 6 sub-pages → Contact`, which is the same as the original public experience.

---

## 9. Deployment

`.github/workflows/deploy.yml`:
1. `actions/checkout`
2. `actions/setup-node` (node 20)
3. `npm ci`
4. `npm run build` → outputs to `build/`
5. `actions/upload-pages-artifact`
6. `actions/deploy-pages` with `enablement: true`

A second manual workflow (or local command) `npm run build:de` produces the German artifact for a *second* gh-pages branch / path if desired; the plan defaults to **one build, one locale**, and rebuilding the other is a one-line change in `site.config.ts`.

---

## 10. Content Extraction Cheat-Sheet for the Junior Dev

For T03 and T04, the easiest workflow is:

1. **Strings (i18n)** — open `oemwears/content.json` and `oemwears/content.d.ts` side-by-side; copy every string into `en.ts`, then translate (or copy from `oemwears/prisma/seed.ts` for the German equivalents that already exist).
2. **Products** — open `oemwears/prisma/seed_en.ts` lines 67–122 (the `products` array). Each object → one entry in `products.json`. Use `cuid` for `id` (or any stable string — `p-jersey-football`, etc.).
3. **Categories** — seed file lines 15–22.
4. **Customizations** — seed file lines 130–163.
5. **Certifications** — seed file lines 171–196.
6. **About sections** — seed file lines 204–226.
7. **Policies** — seed file lines 234–259.
8. **Testimonials** — seed file lines 267–292.

---

## 11. What is **NOT** ported (and why)

- **All admin pages** (`/admin/*`) — explicitly out of scope per requirements
- **NextAuth + middleware** — no auth needed
- **Prisma / Neon DB** — replaced by static JSON
- **Resend email** — replaced by Discord webhook
- **API routes under `app/api/*`** — no server, no APIs
- **NextAuth cookie detection** — N/A
- **Vercel Analytics** — replaced with nothing (or optional `<script defer src="…plausible…">` later)

---
