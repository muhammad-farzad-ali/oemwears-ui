# Translations & Locale System

This site is bilingual (English + German). The active language is **locked
at build time** by the `LOCALE` constant in `src/lib/site.config.ts` — there
is no runtime language switcher. To deploy a different language, edit
`LOCALE` and run `npm run build`.

```ts
// src/lib/site.config.ts
export const LOCALE: Locale = "de";   // ← change to "en" to ship English
```

The rest of this document explains where the German content lives, the
`*De` naming convention, and how to add new bilingual content.

---

## Two content layers

| Layer | File pattern | Holds |
|---|---|---|
| **UI strings** (layout, copy, button labels, form messages) | `src/lib/content/{en,de}.ts` | All chrome — navigation, hero, footer, form labels, validation messages, page subtitles, the "USPs", etc. |
| **CMS-style data** (per-entity records: products, customizations, certifications, about sections, policies, testimonials, home hero) | `src/lib/data/*.json` | User-editable content that maps 1-to-1 to a Prisma model. |

The **`t` export** (`import { t } from '$lib/content'`) picks the right UI
strings file based on `LOCALE`. Component code reads
`t.about.title`, `t.contact.submitButton`, etc.

The **data loader** (`src/lib/data/index.ts`) reads the JSON files and,
when `LOCALE === 'de'`, merges the `*De` sibling fields into the base
fields. Components keep reading `product.name`, `cat.label`,
`cert.description` — the swap is invisible to them.

---

## The `*De` convention

Every field in a JSON data file may carry an optional German override
with the same name plus a `De` suffix. When the German build runs, the
loader replaces the base field with its `*De` sibling **only if the
sibling is non-empty** — so adding a `*De` is opt-in per field.

### Examples

```jsonc
// products.json — single product
{
  "id": "p-football-jersey",
  "name": "Professional Football Jersey",
  "nameDe": "Professionelles Fußballtrikot",
  "description": "High-performance football jersey with moisture-wicking fabric.",
  "descriptionDe": "Hochleistungs-Fußballtrikot mit feuchtigkeitsableitendem Gewebe.",
  "fabric": "100% Polyester",
  "fabricDe": "100 % Polyester",
  "printingMethods": ["Sublimation", "Screen Printing", "Embroidery"],
  "printingMethodsDe": ["Sublimation", "Siebdruck", "Stickerei"],
  "features": ["Breathable", "Quick Dry", "UV Protection"],
  "featuresDe": ["Atmungsaktiv", "Schnelltrocknend", "UV-Schutz"]
}
```

```jsonc
// product-categories.json
{ "id": "c-jerseys", "value": "jerseys", "label": "Jerseys", "labelDe": "Trikots" }
```

```jsonc
// policies.json — data map rows also have *De siblings
{
  "id": "po-moq",
  "type": "moq",
  "title": "Minimum Order Quantities",
  "description": "...",
  "descriptionDe": "...",
  "data": {
    "jerseys": { "quantity": "50 pcs", "note": "Per design/colorway" }
  },
  "dataDe": {
    "jerseys": { "quantityDe": "50 Stk.", "noteDe": "Pro Design / Farbvariante" }
  }
}
```

### What's covered

| File | Bilingual fields | Pass-through (no `*De`) |
|---|---|---|
| `products.json` | `name`, `description`, `fabric`, `printingMethods[]`, `features[]` | `id`, `category`, `images[]`, `isActive` |
| `product-categories.json` | `label` | `id`, `value`, `order`, `isActive` |
| `customizations.json` | `title`, `description` | `id`, `type`, `options`, `images[]`, `order`, `isActive` |
| `about-sections.json` | `title`, `content` | `id`, `section`, `images[]`, `videos[]`, `order`, `isActive` |
| `policies.json` | `description`, `data[*].quantity|time|note` | `id`, `type`, `title`, `order`, `isActive` |
| `testimonials.json` | `author`, `company`, `content` | `id`, `rating`, `image`, `blurAuthor`, `blurCompany`, `isActive` |
| `certifications.json` | `name`, `issuer`, `description` | `id`, `badge`, `validUntil`, `isActive` |
| `home-hero.json` | n/a — only carries images & link | `section`, `images[]`, `fallbackImage`, `ctaLink` |

> We translate every user-facing field, including certification names
> (`SEDEX (SMETA)`, `GOTS-zertifiziert`) and testimonial authors
> (`John Smith` → `John Smith`). The originals are kept as the base
> value so the English build is unchanged.

---

## Policy table row labels

The MOQ and lead-time tables on `/policies` are driven by the data
files' `data` map. The map's keys (`jerseys`, `sample`, `production`,
…) are not translated directly — they are mapped to display labels
in the i18n content file:

- `jerseys / shorts / shirts / socks / sets` →
  `t.contact.productOptions.{jerseys,shorts,shirts,socks,sets}`
- `sample / production / shipping` →
  `t.policies.leadTime.stageLabels.{sample,production,shipping}`

Both en and de have these labels defined. To add a new product type
or lead-time stage, add the key to `policies.json`'s `data` and `dataDe`
maps, then add the matching label to **both** `en.ts` and `de.ts`.

---

## Adding a new bilingual entity

1. **Add the row** to the relevant JSON file with all `*De` fields.
   Leave a `*De` field out if the German text is the same as the English
   one — the loader will keep the base value.
2. **Add matching i18n keys** (if the row is referenced by a key, e.g.
   a new product category needs a `t.contact.productOptions.<value>`
   entry) to **both** `src/lib/content/en.ts` and `src/lib/content/de.ts`.
3. **Run `npm run check`** — type errors flag mismatched keys.
4. **Run `npm run build`** with each locale and visually confirm.

---

## Verifying the German build

```bash
# In one shell:
npm run build && npm run preview -- --port 4173

# In another:
curl -s http://localhost:4173/ | grep -oE 'lang="[a-z]+"'   # lang="de"
```

Then open every page in a browser and check for any English leaks:
- `/` — hero (no English), featured products (German names), testimonials (German quotes)
- `/products` — category chips + section headings in German; product cards in German
- `/customization` — process steps + per-type tabs in German
- `/policies` — table headers in German; row labels in German; "50 Stk." units
- `/certifications` — descriptions in German
- `/about` — section titles ("Unsere Fabrik" etc.) and bodies in German
- `/contact` — labels in German, product dropdown in German

Switch `LOCALE` to `"en"`, rebuild, and confirm the symmetric case.

---

## Known trade-off: dead code in the bundle

The build emits both the English and German content chunks (and both
copies of every data JSON field with a `*De` sibling). At runtime the
loader picks the right one; the other is dead code that is never
executed and never reaches the DOM. The size cost is roughly 15 KB
gzip — acceptable for a small static site. Eliminating it would
require either a custom Vite plugin or a Rollup upgrade; the simpler
ternary in `content/index.ts` was kept for clarity.
