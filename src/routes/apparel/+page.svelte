<script lang="ts">
  import { t } from '$lib/content';
  import { pageTitle } from '$lib/utils/seo';
  import { apparelTypes } from '$lib/data';
  import Card from '$lib/components/ui/Card.svelte';
  import CardContent from '$lib/components/ui/CardContent.svelte';
  import Button from '$lib/components/ui/Button.svelte';
</script>

<svelte:head>
  <title>{pageTitle(t.apparelTypes.title)}</title>
  <meta name="description" content={t.apparelTypes.subtitle} />
</svelte:head>

<div class="container mx-auto px-4 py-16">
  <div class="text-center mb-16">
    <span
      class="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4"
    >
      {t.apparelTypes.badge}
    </span>
    <h1 class="text-4xl lg:text-5xl font-bold mb-4">{t.apparelTypes.title}</h1>
    <p class="text-muted-foreground max-w-2xl mx-auto text-lg">{t.apparelTypes.subtitle}</p>
  </div>

  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    {#each apparelTypes as apparel (apparel.id)}
      <Card class="overflow-hidden group border-0 shadow-xl shadow-slate-200/50 h-full">
        <div class="relative aspect-video overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
          <img
            src={apparel.image}
            alt={apparel.name}
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>
        </div>
        <CardContent class="pt-6 flex flex-col flex-1">
          <h2 class="font-bold text-xl mb-2 group-hover:text-primary transition-colors">
            {apparel.name}
          </h2>
          <p class="text-sm text-muted-foreground mb-5">{apparel.description}</p>

          <div class="mb-4">
            <p class="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
              {t.apparelTypes.examplesLabel}
            </p>
            <ul class="space-y-1 text-sm text-slate-700">
              {#each apparel.examples as example (example)}
                <li class="flex items-start gap-2">
                  <span class="text-primary mt-1">•</span>
                  <span>{example}</span>
                </li>
              {/each}
            </ul>
          </div>

          <div class="mb-2">
            <p class="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
              {t.apparelTypes.featuresLabel}
            </p>
            <div class="flex flex-wrap gap-2">
              {#each apparel.features as feature (feature)}
                <span
                  class="inline-flex items-center rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-xs font-semibold"
                >
                  {feature}
                </span>
              {/each}
            </div>
          </div>
        </CardContent>
      </Card>
    {/each}
  </div>

  {#if apparelTypes.length === 0}
    <div class="text-center py-16">
      <p class="text-muted-foreground">{t.apparelTypes.emptyState}</p>
    </div>
  {/if}

  <section class="mt-20 text-center">
    <div
      class="max-w-2xl mx-auto p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden"
    >
      <div
        class="absolute -top-1/2 -right-1/4 w-[400px] h-[400px] bg-primary/20 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute -bottom-1/4 -left-1/4 w-[300px] h-[300px] bg-accent/10 rounded-full blur-3xl"
      ></div>
      <div class="relative z-10">
        <h2 class="text-2xl lg:text-3xl font-bold mb-4 text-white">{t.apparelTypes.ctaTitle}</h2>
        <p class="text-slate-300 mb-8 max-w-xl mx-auto">{t.apparelTypes.ctaSubtitle}</p>
        <Button href="/contact" class="shadow-xl shadow-primary/30">
          {t.apparelTypes.ctaButton}
        </Button>
      </div>
    </div>
  </section>
</div>
