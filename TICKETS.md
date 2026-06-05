# TICKETS

This is the ordered list of small tickets used to port OEMWears from Next.js to a static SvelteKit SPA. Each ticket is self-contained, builds on the previous, and is small enough for a junior dev to finish in 1–3 hours. The full architectural plan lives in `PLAN.md`.

## Status legend
- `[ ]` pending
- `[~]` in progress
- `[x]` done

---

## T01 — Scaffold the SvelteKit project  [x]

**Goal**: Stand up an empty SvelteKit 2 + Svelte 5 project in the repo root, wire Tailwind 4, configure `adapter-static` for pure CSR, and verify `npm run dev` shows a blank page.

**Key files to create**:
- `package.json`
- `svelte.config.js` (adapter-static, `fallback: 'index.html'`, `paths.base = ''`)
- `vite.config.ts`
- `tsconfig.json`
- `tailwind.config.js` (or `@config` block in `app.css`)
- `postcss.config.js`
- `.gitignore`
- `src/app.html`
- `src/app.css` (Tailwind directives + theme variables matching the original)
- `src/routes/+layout.svelte` (empty shell)
- `src/routes/+layout.ts` (`export const ssr = false; csr = true; prerender = false;`)
- `src/routes/+page.svelte` (placeholder "OEMWears" text)

**Acceptance**:
- `npm install` succeeds
- `npm run dev` starts on `http://localhost:5173` and shows placeholder
- `npm run build` produces a `build/` directory with `index.html`

---

## T02 — Add `site.config.ts` and `types.ts`  [x]

**Goal**: Create the single source of truth for build-time config (locale, brand, contact, Discord webhook) and TypeScript types for every data entity.

**Key files**:
- `src/lib/site.config.ts` — exports `LOCALE`, `BRAND`, `CONTACT`, `DISCORD_WEBHOOK_URL`
- `src/lib/types.ts` — interfaces for `Product`, `ProductCategory`, `Customization`, `Certification`, `AboutSection`, `Policy`, `Testimonial`, `HomeHero`, `ContactPayload`, `SiteContent`

**Acceptance**:
- `import { LOCALE } from '$lib/site.config'` resolves in any `.svelte`/`.ts` file
- `tsc --noEmit` passes

---

## T03 — Create the data JSON files  [x]

**Goal**: Copy seed data from `oemwears/prisma/seed_en.ts` into per-entity JSON files. Add an `index.ts` re-export that filters out `isActive: false` rows.

**Key files**:
- `src/lib/data/products.json`
- `src/lib/data/product-categories.json`
- `src/lib/data/customizations.json`
- `src/lib/data/certifications.json`
- `src/lib/data/policies.json`
- `src/lib/data/about-sections.json`
- `src/lib/data/testimonials.json`
- `src/lib/data/home-hero.json`
- `src/lib/data/index.ts` (named exports, with `isActive` filtering)

**Source mapping** (from `oemwears/prisma/seed_en.ts`):
- Products → lines 67–122
- Categories → lines 15–22
- Customizations → lines 130–163
- Certifications → lines 171–196
- About sections → lines 204–226
- Policies → lines 234–259
- Testimonials → lines 267–292
- Home hero → lines 48–62

**Acceptance**:
- Each JSON file is valid (no trailing commas)
- `import { products } from '$lib/data'` returns an array filtered to `isActive !== false`

---

## T04 — Create the i18n content files  [x]

**Goal**: Mirror the structure of `oemwears/content.json` into `en.ts` and `de.ts`. Add a `t` re-export that picks one based on `LOCALE`.

**Key files**:
- `src/lib/content/en.ts` — direct copy of all English strings (mostly from `oemwears/content.json` — see table below)
- `src/lib/content/de.ts` — German strings (mostly from `oemwears/content.json` — see table below)
- `src/lib/content/index.ts` — `import { LOCALE } from '../site.config'; export const t = LOCALE === 'de' ? de : en;`

**String sourcing**:
- English UI strings: take from `oemwears/app/page.tsx` literal English text, `oemwears/app/components/*.tsx`, and English section labels.
- German UI strings: take from `oemwears/content.json` (which is already German for most nav/UI), and supplement with German translations for any strings that were hard-coded English in the TSX.

**Acceptance**:
- `t.nav.home` returns `"Home"` in EN and `"Startseite"` in DE (after rebuilding with `LOCALE='de'`)
- All sections of `SiteContent` (see `types.ts`) are populated in both files

---

## T05 — Design-system primitives  [x]

**Goal**: Port every component in `oemwears/app/components/ui/*` to Svelte 5. Same class strings, same `variant` + `size` props.

**Key files** (under `src/lib/components/ui/`):
- `Button.svelte` — `variant: 'default'|'destructive'|'outline'|'secondary'|'ghost'|'link'`, `size: 'default'|'sm'|'lg'|'icon'`
- `Card.svelte` with `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` (Svelte snippets)
- `Badge.svelte` — `variant: 'default'|'secondary'|'destructive'|'outline'`
- `Input.svelte`
- `Textarea.svelte`
- `Label.svelte`
- `Checkbox.svelte` (hand-rolled, no Radix)
- `Tabs.svelte` with `TabsList`, `TabsTrigger`, `TabsContent` (Svelte 5 `$state`)
- `Dialog.svelte` (uses native `<dialog>` element, no Radix)
- `Table.svelte` with `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`
- `Carousel.svelte` (custom CSS scroll-snap, ~60 lines)

Plus:
- `src/lib/utils/cn.ts` — `clsx + tailwind-merge` wrapper

**Acceptance**:
- Each component renders with the same visual output as its React counterpart (use a temporary page to spot-check Button variants)

---

## T06 — Layout chrome  [x]

**Goal**: Port `Navigation`, `Footer`, and `WhatsAppButton`. Drop the "Admin" link. Read `CONTACT` from `site.config`.

**Key files**:
- `src/lib/components/layout/Navigation.svelte` — sticky header, desktop nav, mobile drawer, no "Admin" link, "Get Quote" CTA
- `src/lib/components/layout/Footer.svelte` — 4 columns (brand, quick links, contact, socials), reads from `site.config.CONTACT` and `t`
- `src/lib/components/layout/WhatsAppButton.svelte` — floating button, URL built from `CONTACT.whatsappNumber`

**Acceptance**:
- Navigation shows 7 items + "Get Quote" on desktop
- Mobile menu opens/closes
- Footer shows contact details from `site.config.ts`
- WhatsApp button is fixed bottom-right and links to a `wa.me/` URL

---

## T07 — Root layout  [x]

**Goal**: Wire up the root `+layout.svelte` to render `<Navigation>`, `<slot/>`, `<Footer>`, `<WhatsAppButton>`. Set `<html lang={LOCALE}>` and basic `<svelte:head>` metadata.

**Key files**:
- `src/routes/+layout.svelte` — shell with `Navigation`, `{@render children()}`, `Footer`, `WhatsAppButton`
- `src/app.html` — set `<html lang="en">` (will be overridden by Svelte's runtime, or directly use a template placeholder)

**Acceptance**:
- Every page in `routes/` renders the navigation, footer, and WhatsApp button
- View-source shows `<html lang="en">` (or `"de"` after rebuilding with `LOCALE='de'`)

---

## T08 — Home page sections  [x]

**Goal**: Port the home page by splitting it into 6 section components and assembling them in `routes/+page.svelte`.

**Key files** (under `src/lib/components/home/`):
- `HeroSection.svelte` — hero with carousel of hero images + CTAs
- `UspsSection.svelte` — 4 USP cards (Low MOQ, Fast Turnaround, Quality Assured, Full Customization)
- `FeaturedProductsSection.svelte` — top 6 products, "View All" CTA
- `CertificationsSection.svelte` — up to 4 certifications
- `TestimonialsSection.svelte` — carousel of testimonials (only if data exists)
- `CtaSection.svelte` — bottom gradient CTA

**Plus**:
- `src/routes/+page.svelte` — composes all six sections

**Acceptance**:
- Visiting `/` in the browser matches the look of the original `app/page.tsx`
- Carousel arrows work on hero and testimonials
- Testimonials section is hidden when there are no testimonials

---

## T09 — Products page  [x]

**Goal**: Port `app/products/page.tsx` — category tabs (hash anchors) and product grid grouped by category.

**Key files**:
- `src/lib/components/products/CategoryTabs.svelte` — pill buttons with `#cat-value` href
- `src/lib/components/products/ProductCard.svelte` — image, name, description, fabric, printing-methods badges, features
- `src/lib/components/products/ProductGrid.svelte` — renders one section per category
- `src/routes/products/+page.svelte` — composes the above + a CTA block

**Acceptance**:
- All 6 categories show as tabs
- Clicking a tab scrolls to that section (hash anchor)
- Product cards render with the same class strings as the original
- Empty-state message appears if no products

---

## T10 — About, Certifications, Policies pages  [x]

**Goal**: Port the three content pages.

**Key files**:
- `src/routes/about/+page.svelte` — header, 4 stats cards, then either dynamic `AboutSection`s from JSON or the original 2-section hard-coded fallback when empty
- `src/routes/certifications/+page.svelte` — list of certifications + "Quality Commitment" block
- `src/routes/policies/+page.svelte` — two `Table`s (MOQ + lead time) and shipping block

**Acceptance**:
- `/about` shows the 4 stats cards and at least the 2 hard-coded fallback sections
- `/certifications` shows the 4 seeded certs + 3 quality-commitment cards
- `/policies` shows two tables rendered from the policies JSON + the shipping block

---

## T11 — Customization page  [x]

**Goal**: Port `app/customization/page.tsx`.

**Key files**:
- `src/routes/customization/+page.svelte` — 4 type cards (Design, Names, Printing, Sizing) + tabs section (if any data) + 4-step process + CTA

**Acceptance**:
- 4 type cards show
- Tabs section shows 4 tabs, switching shows the right title/description/images
- 4 numbered process steps render

---

## T12 — Discord utility + Contact form  [x]

**Goal**: Build `sendToDiscord()`, build `ContactForm.svelte` with the same validation as the original Zod schema, wire into `/contact`.

**Key files**:
- `src/lib/utils/discord.ts` — `ContactPayload` type + `sendToDiscord(payload)` (see PLAN §7)
- `src/lib/components/contact/ContactInfoPanel.svelte` — left column with email, phone, address, hours, WhatsApp link
- `src/lib/components/contact/ContactForm.svelte` — name, email, company, phone, product (select from `product-categories`), quantity, message, submit → `sendToDiscord`. Validation: name ≥ 2, valid email, productInterest required, message ≥ 10. Success screen on 2xx.
- `src/routes/contact/+page.svelte` — composes the two panels

**Acceptance**:
- Form rejects invalid input with inline errors
- Valid submission posts a Discord embed (verify in the configured channel)
- Success screen appears, "Send another" button resets the form

---

## T13 — README content-editing guide  [x]

**Goal**: Document the project for future maintainers (junior dev audience).

**Key file**: `README.md` covering:
- What the project is, in 3 lines
- Prerequisites (Node 20+)
- `npm install`, `npm run dev`
- How to switch language (edit `src/lib/site.config.ts`, change `LOCALE`, rebuild)
- How to add a product (edit `src/lib/data/products.json`)
- How to change contact details (edit `site.config.ts`)
- How to rotate the Discord webhook
- How to build (`npm run build`)
- How to deploy (push to `main` triggers `.github/workflows/deploy.yml`)
- Security note about the webhook URL being public in the bundle

**Acceptance**: a new dev with no prior context can follow the README and complete each of the above without asking questions

---

## T14 — GitHub Pages workflow  [x]

**Goal**: Auto-deploy to GitHub Pages on push to `main`.

**Key file**: `.github/workflows/deploy.yml` using `actions/checkout`, `actions/setup-node@v4` (node 20), `npm ci`, `npm run build`, `actions/upload-pages-artifact`, `actions/deploy-pages`.

**Acceptance**:
- Pushing to `main` triggers a build
- The build artifact is published to the `gh-pages` environment
- The site is reachable at the configured Pages URL

---

## T15 — Smoke test + final polish  [x]

**Goal**: Verify the build is end-to-end functional.

**Steps**:
1. `npm run build`
2. `npx serve build` (or `npx serve build -l 4173`)
3. Click through all 7 pages — confirm no console errors
4. Submit the contact form once — confirm a Discord embed arrives
5. Rebuild with `LOCALE='de'`, repeat spot-check on each page
6. Resize to mobile width — confirm the navigation drawer works
7. Run `npx svelte-check` (if added) and `npm run build` — confirm both pass cleanly

**Acceptance**:
- All 7 pages render
- Discord submission works
- Both locales work
- No build warnings other than known/expected ones

---

## Dependency summary (for `package.json`)

Runtime:
- `svelte` ^5
- `@sveltejs/kit` ^2
- `@sveltejs/adapter-static` ^3
- `lucide-svelte`
- `clsx`
- `tailwind-merge`
- `tailwindcss` ^4
- `@tailwindcss/vite` (or PostCSS plugin)

Dev:
- `vite` ^5
- `typescript` ^5
- `svelte-check`
- `@types/node`
- `@sveltejs/vite-plugin-svelte`
- `autoprefixer` (only if not on Tailwind 4 native)
- `postcss`
