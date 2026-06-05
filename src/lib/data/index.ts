/**
 * Static data for the OEMWears site.
 *
 * Each row in the JSON files may carry a `*De` sibling (e.g. `name` + `nameDe`).
 * When `LOCALE === 'de'`, the loader merges those German overrides into the
 * base fields so component code keeps reading `product.name`, `cat.label`,
 * `cert.description`, etc. unchanged. No runtime locale switching: the
 * `LOCALE` constant in `src/lib/site.config.ts` is baked in at build time.
 *
 * Edit the JSON files in this folder to add/remove content. No server or
 * database is involved.
 */

import type {
  AboutSection,
  AboutStat,
  Certification,
  Customization,
  HomeHero,
  Policy,
  Product,
  ProductCategory,
  Testimonial
} from '../types';

import { LOCALE } from '../site.config';

import productsRaw from './products.json';
import categoriesRaw from './product-categories.json';
import customizationsRaw from './customizations.json';
import certificationsRaw from './certifications.json';
import aboutSectionsRaw from './about-sections.json';
import aboutStatsRaw from './about-stats.json';
import policiesRaw from './policies.json';
import testimonialsRaw from './testimonials.json';
import homeHeroRaw from './home-hero.json';

function active<T extends { isActive?: boolean }>(rows: readonly T[]): T[] {
  return rows.filter((r) => r.isActive !== false);
}

/**
 * Top-level field map: base field name -> its `*De` sibling (or `null` to skip).
 * Only string / string-array fields are translated; ids, dates, flags, urls
 * etc. pass through unchanged.
 */
type FieldMap = Record<string, string | null>;

const PRODUCT_MAP: FieldMap = {
  name: 'nameDe',
  description: 'descriptionDe',
  fabric: 'fabricDe',
  printingMethods: 'printingMethodsDe',
  features: 'featuresDe'
};

const CATEGORY_MAP: FieldMap = { label: 'labelDe' };
const CUSTOMIZATION_MAP: FieldMap = { title: 'titleDe', description: 'descriptionDe' };
const CERTIFICATION_MAP: FieldMap = {
  name: 'nameDe',
  issuer: 'issuerDe',
  description: 'descriptionDe'
};
const ABOUT_MAP: FieldMap = { title: 'titleDe', content: 'contentDe' };
const TESTIMONIAL_MAP: FieldMap = {
  author: 'authorDe',
  company: 'companyDe',
  content: 'contentDe'
};

const POLICY_VALUE_MAP: FieldMap = {
  quantity: 'quantityDe',
  time: 'timeDe',
  note: 'noteDe'
};

/**
 * For a single entity, swap base fields for their `*De` siblings when
 * LOCALE === 'de' and a non-empty translation exists.
 */
function localizeRow<T>(row: T, map: FieldMap): T {
  if (LOCALE !== 'de') return row;
  const out = { ...(row as Record<string, unknown>) };
  for (const [base, deKey] of Object.entries(map)) {
    if (!deKey) continue;
    const translated = out[deKey];
    if (translated == null || translated === '') continue;
    out[base] = translated;
  }
  return out as T;
}

/** Localize a list of rows. */
function localizeList<T>(rows: readonly T[], map: FieldMap): T[] {
  return rows.map((r) => localizeRow(r, map));
}

/** Special-case for policies: each row's `data` map also gets value-level localization. */
function localizePolicies(rows: readonly Policy[]): Policy[] {
  if (LOCALE !== 'de') return rows as Policy[];
  return rows.map((p) => {
    if (!p.dataDe) return p;
    const dataDe = p.dataDe as Record<string, { quantityDe?: string; timeDe?: string; noteDe: string }>;
    const data: Record<string, { quantity?: string; time?: string; note: string }> = {};
    for (const [k, enVal] of Object.entries(p.data)) {
      const deVal = dataDe[k];
      if (!deVal) {
        data[k] = enVal;
        continue;
      }
      data[k] = {
        quantity: deVal.quantityDe ?? enVal.quantity,
        time: deVal.timeDe ?? enVal.time,
        note: deVal.noteDe ?? enVal.note
      };
    }
    return {
      ...p,
      description: p.descriptionDe ?? p.description,
      data
    } as Policy;
  });
}

export const products: Product[] = active(
  localizeList(productsRaw as unknown as Product[], PRODUCT_MAP)
);
export const productCategories: ProductCategory[] = active(
  localizeList(categoriesRaw as unknown as ProductCategory[], CATEGORY_MAP)
).sort((a, b) => a.order - b.order);
export const customizations: Customization[] = active(
  localizeList(customizationsRaw as unknown as Customization[], CUSTOMIZATION_MAP)
).sort((a, b) => a.order - b.order);
export const certifications: Certification[] = active(
  localizeList(certificationsRaw as unknown as Certification[], CERTIFICATION_MAP)
);
export const aboutSections: AboutSection[] = active(
  localizeList(aboutSectionsRaw as unknown as AboutSection[], ABOUT_MAP)
).sort((a, b) => a.order - b.order);
export const aboutStats: AboutStat[] = active(
  aboutStatsRaw as AboutStat[]
).sort((a, b) => a.order - b.order);
export const policies: Policy[] = active(
  localizePolicies(policiesRaw as unknown as Policy[])
).sort((a, b) => a.order - b.order);
export const testimonials: Testimonial[] = active(
  localizeList(testimonialsRaw as unknown as Testimonial[], TESTIMONIAL_MAP)
);
export const homeHero: HomeHero = homeHeroRaw as HomeHero;
