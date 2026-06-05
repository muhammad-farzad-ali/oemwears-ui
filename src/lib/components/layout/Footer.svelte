<script lang="ts">
  import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-svelte';
  import { t } from '$lib/content';
  import { BRAND, CONTACT } from '$lib/site.config';

  const { footer, nav } = t;

  const quickLinks = [
    { href: '/apparel', label: nav.apparel },
    { href: '/services', label: nav.services },
    { href: '/partners', label: nav.partners },
    { href: '/about', label: nav.about },
    { href: '/contact', label: nav.contact }
  ];
</script>

<footer class="border-t border-slate-200 bg-gradient-to-b from-slate-50 to-white">
  <div class="container mx-auto px-4 py-16">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-10">
      <div>
        <h3 class="font-bold text-xl mb-4">
          <span class="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {BRAND.name.substring(0, 3)}
          </span>
          <span class="text-slate-700">{BRAND.name.substring(3)}</span>
        </h3>
        <p class="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t.footer.tagline}
        </p>
      </div>

      <div>
        <h4 class="font-semibold mb-5 text-slate-900">{footer.quickLinks}</h4>
        <ul class="space-y-3 text-sm">
          {#each quickLinks as link (link.href)}
            <li>
              <a
                href={link.href}
                class="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group"
              >
                <span
                  class="w-0 h-0.5 bg-primary transition-all group-hover:w-2 rounded-full"
                ></span>
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <div>
        <h4 class="font-semibold mb-5 text-slate-900">{footer.contact}</h4>
        <ul class="space-y-4 text-sm">
          <li class="flex items-start gap-3 text-muted-foreground group">
            <div
              class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors"
            >
              <Mail class="h-4 w-4 text-primary" />
            </div>
            <a
              href={`mailto:${CONTACT.email}`}
              class="hover:text-primary transition-colors pt-1.5 break-all"
            >
              {CONTACT.email}
            </a>
          </li>
          <li class="flex items-start gap-3 text-muted-foreground group">
            <div
              class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors"
            >
              <Phone class="h-4 w-4 text-primary" />
            </div>
            <a
              href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
              class="hover:text-primary transition-colors pt-1.5"
            >
              {CONTACT.phone}
            </a>
          </li>
          <li class="flex items-start gap-3 text-muted-foreground group">
            <div
              class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors"
            >
              <MapPin class="h-4 w-4 text-primary" />
            </div>
            <span class="pt-1.5">{CONTACT.address}</span>
          </li>
        </ul>
      </div>

      <div>
        <h4 class="font-semibold mb-5 text-slate-900">{footer.followUs}</h4>
        <div class="flex gap-3">
          <a
            href={CONTACT.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.common.socialFacebook}
            class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all hover:-translate-y-0.5"
          >
            <Facebook class="h-5 w-5" />
          </a>
          <a
            href={CONTACT.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.common.socialInstagram}
            class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all hover:-translate-y-0.5"
          >
            <Instagram class="h-5 w-5" />
          </a>
          <a
            href={CONTACT.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.common.socialLinkedIn}
            class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all hover:-translate-y-0.5"
          >
            <Linkedin class="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>

    <div class="border-t border-slate-200 mt-12 pt-8 text-center text-sm text-muted-foreground">
      <p>&copy; {new Date().getFullYear()} {BRAND.name}. {footer.copyright}</p>
    </div>
  </div>
</footer>
