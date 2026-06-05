<script lang="ts">
  import { t } from '$lib/content';
  import { pageTitle } from '$lib/utils/seo';
  import ContactInfoPanel from '$lib/components/contact/ContactInfoPanel.svelte';
  import ContactForm from '$lib/components/contact/ContactForm.svelte';
</script>

<svelte:head>
  <title>{pageTitle(t.contact.title)}</title>
  <meta name="description" content={t.contact.subtitle} />
</svelte:head>

<div class="container mx-auto px-4 py-16">
  <div class="text-center mb-16">
    <span class="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
      {t.contact.badge}
    </span>
    <h1 class="text-4xl lg:text-5xl font-bold mb-4">{t.contact.title}</h1>
    <p class="text-muted-foreground max-w-2xl mx-auto text-lg">{t.contact.subtitle}</p>
  </div>

  <div class="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
    <div class="lg:col-span-1">
      <ContactInfoPanel />
    </div>
    <div class="lg:col-span-2">
      <ContactForm />
    </div>
  </div>
</div>
