/**
 * Discord webhook integration for the contact form.
 *
 * Submissions are POSTed directly from the browser to a Discord webhook
 * URL configured in `src/lib/site.config.ts`. The URL is bundled into the
 * static JS and is therefore public — treat the destination channel as
 * such and rotate the webhook if it is abused.
 */

import { DISCORD_WEBHOOK_URL } from '$lib/site.config';
import type { ContactPayload } from '$lib/types';

const DISCORD_BLURPLE = 0x2563eb;

function truncate(value: string, max: number): string {
  if (value.length <= max) return value;
  return value.slice(0, max - 1) + '…';
}

function asField(value: string | undefined): { name: string; value: string; inline: boolean } {
  return {
    name: '\u200b',
    value: value && value.trim().length > 0 ? truncate(value, 1024) : '—',
    inline: true
  };
}

/** Build the Discord embed payload (exposed for testing / inspection). */
export function buildContactEmbed(payload: ContactPayload) {
  return {
    title: `New inquiry from ${truncate(payload.name, 200)}`,
    color: DISCORD_BLURPLE,
    fields: [
      { name: 'Email', value: payload.email, inline: true },
      asField(payload.phone),
      asField(payload.company),
      { name: 'Product', value: payload.productInterest, inline: true },
      asField(payload.quantity),
      {
        name: 'Message',
        value: truncate(payload.message, 2000)
      }
    ],
    timestamp: new Date().toISOString(),
    footer: { text: 'OEMWears Contact Form' }
  };
}

/** POST a contact-form submission to the configured Discord webhook. */
export async function sendToDiscord(payload: ContactPayload): Promise<void> {
  const body = {
    username: 'OEMWears Contact',
    embeds: [buildContactEmbed(payload)]
  };

  const response = await fetch(DISCORD_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error(`Discord webhook returned ${response.status}`);
  }
}
