<script lang="ts">
  import { Globe2, Award, CheckCircle } from 'lucide-svelte';
  import { t } from '$lib/content';
  import { pageTitle } from '$lib/utils/seo';
  import { certifications, partnerCountries } from '$lib/data';
  import Card from '$lib/components/ui/Card.svelte';
  import CardContent from '$lib/components/ui/CardContent.svelte';
  import CardHeader from '$lib/components/ui/CardHeader.svelte';
  import CardTitle from '$lib/components/ui/CardTitle.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';
</script>

<svelte:head>
  <title>{pageTitle(t.partners.title)}</title>
  <meta name="description" content={t.partners.subtitle} />
</svelte:head>

<div class="container mx-auto px-4 py-16">
  <div class="text-center mb-16">
    <span
      class="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4"
    >
      {t.partners.badge}
    </span>
    <h1 class="text-4xl lg:text-5xl font-bold mb-4">{t.partners.title}</h1>
    <p class="text-muted-foreground max-w-2xl mx-auto text-lg">{t.partners.subtitle}</p>
  </div>

  <section class="mb-20">
    <div class="text-center mb-10">
      <div
        class="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 items-center justify-center mb-4"
      >
        <Globe2 class="h-7 w-7 text-primary" />
      </div>
      <h2 class="text-2xl lg:text-3xl font-bold mb-3">{t.partners.countriesTitle}</h2>
      <p class="text-muted-foreground max-w-2xl mx-auto">{t.partners.countriesSubtitle}</p>
    </div>
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each partnerCountries as country (country.id)}
        <Card class="group border-0 shadow-xl shadow-slate-200/50 h-full">
          <CardContent class="pt-8 text-center flex flex-col h-full">
            <div
              class="w-16 h-12 mb-4 mx-auto rounded-lg overflow-hidden shadow-md ring-1 ring-slate-200 group-hover:scale-110 transition-transform duration-300 bg-white"
            >
              <img
                src={country.flag}
                alt={`${country.name} flag`}
                class="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <h3 class="font-bold text-xl mb-2">{country.name}</h3>
            <p class="text-muted-foreground text-sm leading-relaxed mb-4">{country.description}</p>
            <div class="mt-auto flex flex-wrap justify-center gap-2">
              {#each country.strengths as strength (strength)}
                <Badge variant="secondary" class="text-xs">{strength}</Badge>
              {/each}
            </div>
          </CardContent>
        </Card>
      {/each}
    </div>
  </section>

  <section class="mb-20">
    <div class="text-center mb-10">
      <div
        class="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 items-center justify-center mb-4"
      >
        <Award class="h-7 w-7 text-emerald-600" />
      </div>
      <h2 class="text-2xl lg:text-3xl font-bold mb-3">{t.partners.certificationsTitle}</h2>
      <p class="text-muted-foreground max-w-2xl mx-auto">{t.partners.certificationsSubtitle}</p>
    </div>
    <div class="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {#each certifications as cert (cert.id)}
        <Card class="border-0 shadow-xl shadow-slate-200/50 h-full">
          <CardHeader>
            <div class="flex items-start gap-4">
              <div
                class="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0"
              >
                <Award class="h-7 w-7 text-emerald-600" />
              </div>
              <div>
                <CardTitle class="text-lg">{cert.name}</CardTitle>
                <p class="text-sm text-muted-foreground mt-1">
                  {t.partners.issuedBy}: {cert.issuer}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p class="text-muted-foreground text-sm leading-relaxed">{cert.description}</p>
            {#if cert.validUntil}
              <p class="text-xs text-muted-foreground mt-3">
                {t.partners.validUntil}: {new Date(cert.validUntil).toLocaleDateString()}
              </p>
            {/if}
          </CardContent>
        </Card>
      {/each}
    </div>
    {#if certifications.length === 0}
      <div class="text-center py-16">
        <p class="text-muted-foreground">{t.partners.emptyState}</p>
      </div>
    {/if}
  </section>

  <section class="max-w-4xl mx-auto">
    <h2 class="text-2xl font-bold text-center mb-8">{t.about.qualityCommitment.title}</h2>
    <div class="grid md:grid-cols-3 gap-6">
      <div class="text-center">
        <CheckCircle class="h-12 w-12 mx-auto mb-4 text-emerald-500" />
        <h3 class="font-semibold mb-2">{t.about.qualityCommitment.vettedNetwork.title}</h3>
        <p class="text-sm text-muted-foreground">
          {t.about.qualityCommitment.vettedNetwork.description}
        </p>
      </div>
      <div class="text-center">
        <CheckCircle class="h-12 w-12 mx-auto mb-4 text-emerald-500" />
        <h3 class="font-semibold mb-2">{t.about.qualityCommitment.onSiteInspections.title}</h3>
        <p class="text-sm text-muted-foreground">
          {t.about.qualityCommitment.onSiteInspections.description}
        </p>
      </div>
      <div class="text-center">
        <CheckCircle class="h-12 w-12 mx-auto mb-4 text-emerald-500" />
        <h3 class="font-semibold mb-2">{t.about.qualityCommitment.ethicalStandards.title}</h3>
        <p class="text-sm text-muted-foreground">
          {t.about.qualityCommitment.ethicalStandards.description}
        </p>
      </div>
    </div>
  </section>
</div>
