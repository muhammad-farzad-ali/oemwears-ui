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
| **UI strings** (layout, copy, button labels, form messages) | `src/lib/content/{en,de}.ts` | All chrome — navigation, hero, footer, form labels, validation messages, page subtitles, the 5 USPs, etc. |
| **CMS-style data** (per-entity records: apparel types, services, partner countries, certifications, about sections, policies, testimonials, home hero) | `src/lib/data/*.json` | User-editable content that is loaded as static JSON. |

The **`t` export** (`import { t } from '$lib/content'`) picks the right UI
strings file based on `LOCALE`. Component code reads
`t.about.title`, `t.contact.submitButton`, etc.

The **data loader** (`src/lib/data/index.ts`) reads the JSON files and,
when `LOCALE === 'de'`, merges the `*De` sibling fields into the base
fields. Components keep reading `apparel.name`, `country.description`,
`service.title` — the swap is invisible to them.

---

## The `*De` convention

Every field in a JSON data file may carry an optional German override
with the same name plus a `De` suffix. When the German build runs, the
loader replaces the base field with its `*De` sibling **only if the
sibling is non-empty** — so adding a `*De` is opt-in per field.

### Examples

```jsonc
// apparel-types.json — single apparel category
{
  "id": "at-hoodies",
  "value": "hoodies",
  "name": "Hoodies",
  "nameDe": "Hoodies",
  "description": "Heavyweight and midweight hoodies for training, leisure, and travel.",
  "descriptionDe": "Schwere und mittelschwere Hoodies für Training, Freizeit und Reisen.",
  "image": "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800",
  "examples": ["Pullover hoodies", "Zip hoodies"],
  "examplesDe": ["Pullover-Hoodies", "Zip-Hoodies"],
  "features": ["Brushed inside", "YKK zippers"],
  "featuresDe": ["Innen angeraut", "YKK-Reißverschlüsse"]
}
```

```jsonc
// services.json — single service
{
  "id": "s-custom-production",
  "value": "custom-production",
  "title": "Custom Sportswear Production",
  "titleDe": "Individuelle Sportbekleidungsproduktion",
  "description": "Full custom manufacturing of sportswear, from the first sketch to the delivered goods.",
  "descriptionDe": "Maßgeschneiderte Fertigung von Sportbekleidung — vom ersten Entwurf bis zur gelieferten Ware.",
  "icon": "Scissors",
  "highlights": ["Tech-pack support", "Sublimation, cut & sew, and knit"],
  "highlightsDe": ["Tech-Pack-Unterstützung", "Sublimation, Cut & Sew und Maschenware"]
}
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
    "gym-wear": { "quantity": "50 pcs", "note": "Per design/colorway" }
  },
  "dataDe": {
    "gym-wear": { "quantityDe": "50 Stk.", "noteDe": "Pro Design / Farbvariante" }
  }
}
```

### What's covered

| File | Bilingual fields | Pass-through (no `*De`) |
|---|---|---|
| `apparel-types.json` | `name`, `description`, `examples[]`, `features[]` | `id`, `value`, `image`, `order`, `isActive` |
| `services.json` | `title`, `description`, `highlights[]` | `id`, `value`, `icon`, `order`, `isActive` |
| `partner-countries.json` | `name`, `description`, `strengths[]` | `id`, `value`, `flag`, `order`, `isActive` |
| `certifications.json` | `name`, `issuer`, `description` | `id`, `validUntil`, `isActive` |
| `about-sections.json` | `title`, `content` | `id`, `section`, `images[]`, `videos[]`, `order`, `isActive` |
| `about-stats.json` | n/a — `value` is a number/short string and renders identically | `id`, `value`, `color`, `statKey`, `order`, `isActive` |
| `policies.json` | `description`, `data[*].quantity|time|note` | `id`, `type`, `title`, `order`, `isActive` |
| `testimonials.json` | `author`, `company`, `content` | `id`, `rating`, `image`, `blurAuthor`, `blurCompany`, `isActive` |
| `home-hero.json` | n/a — only carries images & link | `section`, `images[]`, `fallbackImage`, `ctaLink` |

> We translate every user-facing field, including certification names
> (`SEDEX (SMETA)`, `GOTS-zertifiziert`) and testimonial authors.
> The originals are kept as the base value so the English build is
> unchanged.

---

## The data loader's field maps

The loader's localization is driven by a small per-entity field map
in `src/lib/data/index.ts`. Each map lists the base field → its `*De`
sibling, with `null` to mark a field as "do not translate" (none
currently use this — it's there for opt-out). Adding a new bilingual
field is a one-line change to the appropriate map.

```ts
// src/lib/data/index.ts
const APPAREL_MAP: FieldMap = {
  name: 'nameDe',
  description: 'descriptionDe',
  features: 'featuresDe',
  examples: 'examplesDe'
};

const SERVICE_MAP: FieldMap = {
  title: 'titleDe',
  description: 'descriptionDe',
  highlights: 'highlightsDe'
};

const COUNTRY_MAP: FieldMap = {
  name: 'nameDe',
  description: 'descriptionDe',
  strengths: 'strengthsDe'
};
// …and one for certifications, about sections, testimonials, policies.
```

---

## Policy table row labels

The MOQ and lead-time tables on `/policies` are driven by the data
files' `data` map. The map's keys (`gym-wear`, `sampling`, `production`,
…) are not translated directly — they are mapped to display labels
in the i18n content file or the apparel-types data file:

- `gym-wear / teamwear / football-kits / compression-wear / hoodies /
  tracksuits / running-apparel / cycling-wear / yoga-fitness` →
  `apparelTypes.find(a => a.value === key).name` (resolved
  dynamically at render time from `apparel-types.json`)
- `sampling / production / shipping` →
  `t.policies.leadTime.stageLabels.{sampling,production,shipping}`

Both en and de have the stage labels defined. To add a new apparel
type or lead-time stage, add the key to `policies.json`'s `data` and
`dataDe` maps, and — for apparel types — also add the matching row to
`apparel-types.json` (the MOQ table will pick the label up
automatically from the data file).

---

## Adding a new bilingual entity

1. **Add the row** to the relevant JSON file with all `*De` fields.
   Leave a `*De` field out if the German text is the same as the English
   one — the loader will keep the base value.
2. **Add the matching field to the loader's field map** if the new
   field doesn't already have a `*De` sibling. See "The data loader's
   field maps" above.
3. **Add matching i18n keys** (if the row is referenced by a key, e.g.
   a new apparel category needs a corresponding `policies.json` MOQ
   row key) to the relevant files.
4. **Run `npm run check`** — type errors flag mismatched keys.
5. **Run `npm run build`** with each locale and visually confirm.

---

## Verifying the German build

```bash
# In one shell:
npm run build && npm run preview -- --port 4173

# In another:
curl -s http://localhost:4173/ | grep -oE 'lang="[a-z]+"'   # lang="de"
```

Then open every page in a browser and check for any English leaks:
- `/` — hero in German, partner country descriptions in German, USPs in German, featured apparel in German, testimonials in German
- `/apparel` — page header in German; category card names, descriptions, examples, and capabilities in German
- `/services` — 6 service cards in German; 4-step process in German; CTA in German
- `/policies` — table headers in German; row labels in German (from `apparel-types.json`); "50 Stk." units
- `/partners` — country cards + certification descriptions in German
- `/about` — section titles ("Unsere Agentur" etc.) and bodies in German
- `/contact` — labels in German, service dropdown in German

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
