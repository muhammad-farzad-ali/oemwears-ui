<script lang="ts">
  import { Palette, Shirt, Printer, Scissors } from 'lucide-svelte';
  import { t } from '$lib/content';
  import { pageTitle } from '$lib/utils/seo';
  import { customizations } from '$lib/data';
  import Card from '$lib/components/ui/Card.svelte';
  import CardContent from '$lib/components/ui/CardContent.svelte';
  import CardHeader from '$lib/components/ui/CardHeader.svelte';
  import CardTitle from '$lib/components/ui/CardTitle.svelte';
  import Tabs from '$lib/components/ui/Tabs.svelte';
  import TabsList from '$lib/components/ui/TabsList.svelte';
  import TabsTrigger from '$lib/components/ui/TabsTrigger.svelte';
  import TabsContent from '$lib/components/ui/TabsContent.svelte';

  const types = [
    { id: 'design', icon: Palette, ...t.customization.types.design },
    { id: 'names', icon: Shirt, ...t.customization.types.names },
    { id: 'printing', icon: Printer, ...t.customization.types.printing },
    { id: 'sizing', icon: Scissors, ...t.customization.types.sizing }
  ];

  const steps = [
    t.customization.process.step1,
    t.customization.process.step2,
    t.customization.process.step3,
    t.customization.process.step4
  ];
</script>

<svelte:head>
  <title>{pageTitle(t.customization.title)}</title>
  <meta name="description" content={t.customization.subtitle} />
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <div class="text-center mb-12">
    <h1 class="text-4xl font-bold mb-4">{t.customization.title}</h1>
    <p class="text-muted-foreground max-w-2xl mx-auto">{t.customization.subtitle}</p>
  </div>

  <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
    {#each types as type (type.id)}
      <Card>
        <CardContent class="pt-6 text-center">
          <type.icon class="h-12 w-12 mx-auto mb-4 text-primary" />
          <h3 class="font-semibold text-lg mb-2">{type.title}</h3>
          <p class="text-sm text-muted-foreground">{type.description}</p>
        </CardContent>
      </Card>
    {/each}
  </div>

  {#if customizations.length > 0}
    <section class="mb-16">
      <h2 class="text-2xl font-bold text-center mb-8">{t.customization.detailedGuide}</h2>
      <Tabs value={customizations[0]?.type ?? 'design'} class="max-w-4xl mx-auto">
        <TabsList class="grid w-full grid-cols-2 lg:grid-cols-4">
          {#each customizations as option (option.id)}
            <TabsTrigger value={option.type}>{option.title}</TabsTrigger>
          {/each}
        </TabsList>
        {#each customizations as option (option.id)}
          <TabsContent value={option.type}>
            <Card>
              <CardHeader>
                <CardTitle>{option.title}</CardTitle>
              </CardHeader>
              <CardContent class="space-y-4">
                <p class="text-muted-foreground">{option.description}</p>
                {#if option.images && option.images.length > 0}
                  <div class="grid grid-cols-2 gap-4">
                    {#each option.images as image, idx (idx)}
                      <div
                        class="relative aspect-square rounded-lg overflow-hidden bg-slate-100"
                      >
                        <img
                          src={image}
                          alt={`${option.title} example ${idx + 1}`}
                          class="absolute inset-0 w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>
                    {/each}
                  </div>
                {/if}
              </CardContent>
            </Card>
          </TabsContent>
        {/each}
      </Tabs>
    </section>
  {/if}

  <section class="max-w-4xl mx-auto">
    <h2 class="text-2xl font-bold text-center mb-8">{t.customization.process.title}</h2>
    <div class="space-y-8">
      {#each steps as step, i (i)}
        <div class="flex gap-4">
          <div
            class="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold"
          >
            {i + 1}
          </div>
          <div>
            <h3 class="font-semibold text-lg">{step.title}</h3>
            <p class="text-muted-foreground">{step.description}</p>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <section class="mt-16 text-center">
    <h2 class="text-2xl font-bold mb-4">{t.customization.cta.title}</h2>
    <p class="text-muted-foreground mb-6 max-w-xl mx-auto">{t.customization.cta.subtitle}</p>
    <a
      href="/contact"
      class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
    >
      {t.customization.cta.button}
    </a>
  </section>
</div>
