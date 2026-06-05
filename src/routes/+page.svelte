<script lang="ts">
  import { t } from '$lib/content';
  import { pageTitle } from '$lib/utils/seo';
  import HeroSection from '$lib/components/home/HeroSection.svelte';
  import PartnerCountriesSection from '$lib/components/home/PartnerCountriesSection.svelte';
  import UspsSection from '$lib/components/home/UspsSection.svelte';
  import FeaturedApparelSection from '$lib/components/home/FeaturedApparelSection.svelte';
  import TestimonialsSection from '$lib/components/home/TestimonialsSection.svelte';
  import CtaSection from '$lib/components/home/CtaSection.svelte';
</script>

<svelte:head>
  <title>{pageTitle(t.hero.title)}</title>
  <meta name="description" content={t.brand.description} />
</svelte:head>

<div class="flex flex-col">
  <HeroSection />
  <PartnerCountriesSection />
  <UspsSection />
  <FeaturedApparelSection />
  <TestimonialsSection />
  <CtaSection />
</div>
