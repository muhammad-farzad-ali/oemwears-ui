<script lang="ts">
  import { Mail, Phone, MapPin, Clock } from 'lucide-svelte';
  import { CONTACT } from '$lib/site.config';
  import { t } from '$lib/content';
  import Card from '$lib/components/ui/Card.svelte';
  import CardContent from '$lib/components/ui/CardContent.svelte';
  import CardHeader from '$lib/components/ui/CardHeader.svelte';
  import CardTitle from '$lib/components/ui/CardTitle.svelte';

  const items = $derived([
    {
      icon: Mail,
      label: t.contact.emailLabel,
      value: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
      isText: false
    },
    {
      icon: Phone,
      label: t.contact.phoneLabel,
      value: CONTACT.phone,
      href: `tel:${CONTACT.phone.replace(/\s/g, '')}`,
      isText: false
    },
    {
      icon: MapPin,
      label: t.contact.addressLabel,
      value: CONTACT.address,
      href: undefined,
      isText: true
    },
    {
      icon: Clock,
      label: t.contact.hoursLabel,
      value: t.contact.hoursValue,
      href: undefined,
      isText: true
    }
  ]);
</script>

<div class="space-y-6">
  <Card class="border-0 shadow-xl shadow-slate-200/50">
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <span class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Mail class="h-4 w-4 text-primary" />
        </span>
        {t.contact.infoTitle}
      </CardTitle>
    </CardHeader>
    <CardContent class="space-y-6">
      {#each items as item (item.label)}
        <div class="flex items-start gap-4 group">
          <div
            class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors"
          >
            <item.icon class="h-5 w-5 text-primary" />
          </div>
          <div>
            <p class="font-semibold text-sm text-slate-900">{item.label}</p>
            {#if item.href}
              <a
                href={item.href}
                class="text-muted-foreground hover:text-primary transition-colors"
              >
                {item.value}
              </a>
            {:else}
              <p class="text-muted-foreground whitespace-pre-line">{item.value}</p>
            {/if}
          </div>
        </div>
      {/each}
    </CardContent>
  </Card>

  <Card class="border-0 shadow-xl shadow-slate-200/50 bg-gradient-to-br from-emerald-50 to-white">
    <CardHeader>
      <CardTitle class="flex items-center gap-2 text-emerald-700">
        <span class="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
          <Phone class="h-4 w-4 text-emerald-600" />
        </span>
        {t.contact.connectTitle}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <a
        href={`https://wa.me/${CONTACT.whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.contact.whatsappAria}
        class="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 transition-colors font-medium"
      >
        <Phone class="h-5 w-5" />
        {t.contact.whatsappButton}
      </a>
    </CardContent>
  </Card>
</div>
