<script lang="ts">
  import { t } from '$lib/content';
  import { pageTitle } from '$lib/utils/seo';
  import HeroSection from '$lib/components/home/HeroSection.svelte';
  import UspsSection from '$lib/components/home/UspsSection.svelte';
  import FeaturedProductsSection from '$lib/components/home/FeaturedProductsSection.svelte';
  import CertificationsSection from '$lib/components/home/CertificationsSection.svelte';
  import TestimonialsSection from '$lib/components/home/TestimonialsSection.svelte';
  import CtaSection from '$lib/components/home/CtaSection.svelte';
</script>

<svelte:head>
  <title>{pageTitle(t.hero.title)}</title>
  <meta name="description" content={t.brand.description} />
</svelte:head>

<div class="flex flex-col">
  <HeroSection />
  <UspsSection />
  <FeaturedProductsSection />
  <CertificationsSection />
  <TestimonialsSection />
  <CtaSection />
</div>
