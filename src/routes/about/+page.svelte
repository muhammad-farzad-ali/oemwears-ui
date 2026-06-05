<script lang="ts">
  import { Factory, Users, Globe, Award } from 'lucide-svelte';
  import { t } from '$lib/content';
  import { pageTitle } from '$lib/utils/seo';
  import { aboutSections, aboutStats } from '$lib/data';
  import { PLACEHOLDER_IMAGES } from '$lib/site.config';
  import Card from '$lib/components/ui/Card.svelte';
  import CardContent from '$lib/components/ui/CardContent.svelte';
  import type { AboutStat } from '$lib/types';

  const statIcons: Record<AboutStat['color'], typeof Factory> = {
    primary: Factory,
    violet: Users,
    emerald: Globe,
    accent: Award
  };

  const colorClasses: Record<AboutStat['color'], { bg: string; text: string; gradient: string }> = {
    primary: {
      bg: 'from-primary/10 to-primary/5',
      text: 'text-primary',
      gradient: 'from-primary to-primary/70'
    },
    violet: {
      bg: 'from-violet-500/10 to-violet-500/5',
      text: 'text-violet-600',
      gradient: 'from-violet-600 to-violet-400'
    },
    emerald: {
      bg: 'from-emerald-500/10 to-emerald-500/5',
      text: 'text-emerald-600',
      gradient: 'from-emerald-600 to-emerald-400'
    },
    accent: {
      bg: 'from-accent/10 to-accent/5',
      text: 'text-accent',
      gradient: 'from-accent to-accent/70'
    }
  };
</script>

<svelte:head>
  <title>{pageTitle(t.about.title)}</title>
  <meta name="description" content={t.about.subtitle} />
</svelte:head>

<div class="container mx-auto px-4 py-16">
  <div class="text-center mb-20">
    <span
      class="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4"
    >
      {t.about.badge}
    </span>
    <h1 class="text-4xl lg:text-5xl font-bold mb-4">{t.about.title}</h1>
    <p class="text-muted-foreground max-w-2xl mx-auto text-lg">{t.about.subtitle}</p>
  </div>

  <div class="grid md:grid-cols-4 gap-6 mb-20">
    {#each aboutStats as stat (stat.id)}
      {@const Icon = statIcons[stat.color]}
      {@const colors = colorClasses[stat.color]}
      <Card class="group border-0 shadow-xl shadow-slate-200/50 bg-white">
        <CardContent class="pt-8 text-center">
          <div
            class={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${colors.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon class={`h-8 w-8 ${colors.text}`} />
          </div>
          <div
            class={`text-4xl font-bold bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}
          >
            {stat.value}
          </div>
          <div class="text-sm text-muted-foreground mt-1">
            {t.about.stats[stat.statKey]}
          </div>
        </CardContent>
      </Card>
    {/each}
  </div>

  {#if aboutSections.length > 0}
    <div class="space-y-24">
      {#each aboutSections as section (section.id)}
        <section class="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div class={section.order % 2 === 0 ? 'md:order-2' : ''}>
            <h2 class="text-3xl font-bold mb-6 flex items-center gap-3">
              <span class="w-10 h-1 rounded-full bg-gradient-to-r from-primary to-primary/50"
              ></span>
              {section.title}
            </h2>
            <div>
              {#each section.content.split('\n') as paragraph, idx (idx)}
                <p class="text-muted-foreground mb-4 text-lg leading-relaxed">{paragraph}</p>
              {/each}
            </div>
          </div>
          <div class={section.order % 2 === 0 ? 'md:order-1' : ''}>
            {#if section.images && section.images.length > 0}
              <div
                class="relative aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-slate-200/50 ring-1 ring-slate-200"
              >
                <img
                  src={section.images[0]}
                  alt={section.title}
                  class="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            {/if}
          </div>
        </section>
      {/each}
    </div>
  {:else}
    <div class="space-y-24">
      <section class="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <h2 class="text-3xl font-bold mb-6 flex items-center gap-3">
            <span class="w-10 h-1 rounded-full bg-gradient-to-r from-primary to-primary/50"
            ></span>
            {t.about.fallback.agencyTitle}
          </h2>
          {#each t.about.fallback.agencyContent.split('\n\n') as paragraph, idx (idx)}
            <p class="text-muted-foreground mb-4 text-lg leading-relaxed">{paragraph}</p>
          {/each}
        </div>
        <div
          class="relative aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-slate-200/50 ring-1 ring-slate-200"
        >
          <img
            src={PLACEHOLDER_IMAGES.factory}
            alt={t.about.fallback.agencyAlt}
            class="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </section>

      <section class="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div class="md:order-2">
          <h2 class="text-3xl font-bold mb-6 flex items-center gap-3">
            <span class="w-10 h-1 rounded-full bg-gradient-to-r from-primary to-primary/50"
            ></span>
            {t.about.fallback.teamTitle}
          </h2>
          {#each t.about.fallback.teamContent.split('\n\n') as paragraph, idx (idx)}
            <p class="text-muted-foreground mb-4 text-lg leading-relaxed">{paragraph}</p>
          {/each}
        </div>
        <div class="md:order-1">
          <div
            class="relative aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-slate-200/50 ring-1 ring-slate-200"
          >
            <img
              src={PLACEHOLDER_IMAGES.team}
              alt={t.about.fallback.teamAlt}
              class="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  {/if}
</div>
