<script lang="ts">
  import { Scissors, Tag, Lightbulb, Workflow, BadgeCheck, Truck, Check } from 'lucide-svelte';
  import { t } from '$lib/content';
  import { pageTitle } from '$lib/utils/seo';
  import { services } from '$lib/data';
  import Card from '$lib/components/ui/Card.svelte';
  import CardContent from '$lib/components/ui/CardContent.svelte';
  import Button from '$lib/components/ui/Button.svelte';

  const iconMap: Record<string, typeof Scissors> = {
    Scissors,
    Tag,
    Lightbulb,
    Workflow,
    BadgeCheck,
    Truck
  };

  const steps = [
    t.services.process.step1,
    t.services.process.step2,
    t.services.process.step3,
    t.services.process.step4
  ];
</script>

<svelte:head>
  <title>{pageTitle(t.services.title)}</title>
  <meta name="description" content={t.services.subtitle} />
</svelte:head>

<div class="container mx-auto px-4 py-16">
  <div class="text-center mb-16">
    <span
      class="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4"
    >
      {t.services.badge}
    </span>
    <h1 class="text-4xl lg:text-5xl font-bold mb-4">{t.services.title}</h1>
    <p class="text-muted-foreground max-w-2xl mx-auto text-lg">{t.services.subtitle}</p>
  </div>

  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
    {#each services as service (service.id)}
      {@const Icon = iconMap[service.icon] ?? Scissors}
      <Card class="group border-0 shadow-xl shadow-slate-200/50 h-full">
        <CardContent class="pt-8 flex flex-col h-full">
          <div
            class="w-14 h-14 mb-5 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
          >
            <Icon class="h-7 w-7 text-primary" />
          </div>
          <h2 class="font-bold text-xl mb-2 group-hover:text-primary transition-colors">
            {service.title}
          </h2>
          <p class="text-sm text-muted-foreground mb-5 leading-relaxed">{service.description}</p>
          <ul class="space-y-2 mt-auto">
            {#each service.highlights as highlight (highlight)}
              <li class="flex items-start gap-2 text-sm text-slate-700">
                <Check class="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>{highlight}</span>
              </li>
            {/each}
          </ul>
        </CardContent>
      </Card>
    {/each}
  </div>

  <section class="max-w-4xl mx-auto mb-16">
    <h2 class="text-2xl lg:text-3xl font-bold text-center mb-12">{t.services.process.title}</h2>
    <div class="space-y-6">
      {#each steps as step, i (i)}
        <div class="flex gap-4 items-start">
          <div
            class="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg"
          >
            {i + 1}
          </div>
          <div class="pt-1.5">
            <h3 class="font-semibold text-lg mb-1">{step.title}</h3>
            <p class="text-muted-foreground leading-relaxed">{step.description}</p>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <section class="text-center">
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
        <h2 class="text-2xl lg:text-3xl font-bold mb-4 text-white">{t.services.cta.title}</h2>
        <p class="text-slate-300 mb-8 max-w-xl mx-auto">{t.services.cta.subtitle}</p>
        <Button href="/contact" class="shadow-xl shadow-primary/30">
          {t.services.cta.button}
        </Button>
      </div>
    </div>
  </section>
</div>
