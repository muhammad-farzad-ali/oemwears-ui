<script lang="ts">
  import '../app.css';
  import { LOCALE, BRAND } from '$lib/site.config';
  import { t } from '$lib/content';
  import Navigation from '$lib/components/layout/Navigation.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import WhatsAppButton from '$lib/components/layout/WhatsAppButton.svelte';

  let { children } = $props();

  $effect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = LOCALE;
    }
  });
</script>

<svelte:head>
  <title>{BRAND.name} - {t.brand.tagline}</title>
  <meta name="description" content={t.brand.description} />
</svelte:head>

<Navigation />
<main class="flex-1">
  {@render children()}
</main>
<Footer />
<WhatsAppButton />
