<script lang="ts">
  import { Award, CheckCircle } from 'lucide-svelte';
  import { t } from '$lib/content';
  import { pageTitle } from '$lib/utils/seo';
  import { certifications } from '$lib/data';
  import Card from '$lib/components/ui/Card.svelte';
  import CardContent from '$lib/components/ui/CardContent.svelte';
  import CardHeader from '$lib/components/ui/CardHeader.svelte';
  import CardTitle from '$lib/components/ui/CardTitle.svelte';
</script>

<svelte:head>
  <title>{pageTitle(t.certifications.title)}</title>
  <meta name="description" content={t.certifications.subtitle} />
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <div class="text-center mb-12">
    <h1 class="text-4xl font-bold mb-4">{t.certifications.title}</h1>
    <p class="text-muted-foreground max-w-2xl mx-auto">{t.certifications.subtitle}</p>
  </div>

  <div class="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
    {#each certifications as cert (cert.id)}
      <Card>
        <CardHeader>
          <div class="flex items-start gap-4">
            <div
              class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"
            >
              <Award class="h-8 w-8 text-primary" />
            </div>
            <div>
              <CardTitle class="text-xl">{cert.name}</CardTitle>
              <p class="text-sm text-muted-foreground mt-1">
                {t.certifications.issuedBy}: {cert.issuer}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p class="text-muted-foreground">{cert.description}</p>
          {#if cert.validUntil}
            <p class="text-sm text-muted-foreground mt-4">
              {t.certifications.validUntil}: {new Date(cert.validUntil).toLocaleDateString()}
            </p>
          {/if}
        </CardContent>
      </Card>
    {/each}
  </div>

  {#if certifications.length === 0}
    <div class="text-center py-16">
      <p class="text-muted-foreground">{t.certifications.emptyState}</p>
    </div>
  {/if}

  <section class="mt-16 max-w-4xl mx-auto">
    <h2 class="text-2xl font-bold text-center mb-8">{t.about.qualityCommitment.title}</h2>
    <div class="grid md:grid-cols-3 gap-6">
      <div class="text-center">
        <CheckCircle class="h-12 w-12 mx-auto mb-4 text-green-500" />
        <h3 class="font-semibold mb-2">{t.about.qualityCommitment.qualityMaterials.title}</h3>
        <p class="text-sm text-muted-foreground">
          {t.about.qualityCommitment.qualityMaterials.description}
        </p>
      </div>
      <div class="text-center">
        <CheckCircle class="h-12 w-12 mx-auto mb-4 text-green-500" />
        <h3 class="font-semibold mb-2">{t.about.qualityCommitment.rigorousTesting.title}</h3>
        <p class="text-sm text-muted-foreground">
          {t.about.qualityCommitment.rigorousTesting.description}
        </p>
      </div>
      <div class="text-center">
        <CheckCircle class="h-12 w-12 mx-auto mb-4 text-green-500" />
        <h3 class="font-semibold mb-2">{t.about.qualityCommitment.ethicalProduction.title}</h3>
        <p class="text-sm text-muted-foreground">
          {t.about.qualityCommitment.ethicalProduction.description}
        </p>
      </div>
    </div>
  </section>
</div>
