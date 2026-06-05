/**
 * Build-time configuration for the Sportbekleidungsagentur site.
 *
 * Edit this file and rebuild (`npm run build`) to change site-wide values.
 * Visitors cannot change the language at runtime — it is locked in at build
 * time via the `LOCALE` constant.
 */

export type Locale = "en" | "de";

/** Active locale for the entire build. Change + rebuild to swap. */
export const LOCALE: Locale = "de";

export const BRAND = {
  name: "Sportbekleidungsagentur",
  domain: "https://sportbekleidungsagentur.de",
} as const;

export const CONTACT = {
  email: "info@sportbekleidungsagentur.de",
  phone: "+49 000000000",
  address: "Weimar, Thüringen, Deutschland",
  whatsappNumber: "4917616628396",
  hours: "Mo - Fr: 9:00 - 18:00\nSa: 9:00 - 13:00",
  facebookUrl: "https://facebook.com",
  instagramUrl: "https://instagram.com",
  linkedinUrl: "https://linkedin.com",
} as const;

/**
 * Generic placeholder images used when content is missing (e.g. an apparel
 * type with no `image`, or the about-page hard-coded fallbacks). Edit the
 * URLs here instead of touching component code.
 */
export const PLACEHOLDER_IMAGES = {
  /** Used by `FeaturedApparelSection` / `apparel/+page.svelte` when an apparel type has no image. */
  product: "https://images.unsplash.com/photo-1515523110800-9415d13b84a8?w=800",
  /** Used by the about page's hard-coded fallback section. */
  factory: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
  /** Used by the about page's "Our Team" hard-coded fallback section. */
  team: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
} as const;

/**
 * Discord webhook URL used by the contact form to deliver submissions.
 *
 * NOTE: this URL is bundled into the static JS that ships to the browser, so
 * it is effectively public. Treat the destination channel accordingly and
 * rotate the webhook if abuse is detected.
 */
export const DISCORD_WEBHOOK_URL =
  "https://discordapp.com/api/webhooks/1512407367042597026/Kgif4W6K1a0jgKmuWSQ_-RyGcJaKtmDIvGVhwYM5yMGzsXd9ENadfeGzAUJK3wsRMAxK";
