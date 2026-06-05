<script lang="ts">
  import { t } from '$lib/content';
  import { homeHero } from '$lib/data';
  import Carousel from '$lib/components/ui/Carousel.svelte';
  import CarouselItem from '$lib/components/ui/CarouselItem.svelte';
  import Button from '$lib/components/ui/Button.svelte';
</script>

<section
  class="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white py-20 lg:py-32"
>
  <div class="absolute inset-0 overflow-hidden">
    <div
      class="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl"
    ></div>
    <div
      class="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-3xl"
    ></div>
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-primary/5 via-transparent to-accent/5 rounded-full blur-3xl"
    ></div>
  </div>

  <div class="container mx-auto px-4 relative z-10">
    <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <div class="space-y-8">
        <div
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10"
        >
          <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          <span class="text-sm font-medium text-slate-300">
            {t.hero.subtitle}
          </span>
        </div>

        <h1
          class="text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight bg-gradient-to-r from-white via-white to-slate-300 bg-clip-text text-transparent"
        >
          {t.hero.title}
        </h1>
        <p class="text-xl lg:text-2xl text-slate-300 font-light">
          {t.hero.subtitle}
        </p>
        <p class="text-slate-400 text-lg leading-relaxed">
          {t.hero.description}
        </p>
        <div class="flex flex-wrap gap-4 pt-4">
          <Button href="/contact" class="shadow-2xl shadow-primary/40 hover:shadow-primary/60">
            {t.hero.ctaPrimary}
          </Button>
        </div>
      </div>
      <div class="relative w-full">
        {#if homeHero.images && homeHero.images.length > 0}
          <Carousel class="w-full">
            {#each homeHero.images as image, index (index)}
              <CarouselItem>
                <div
                  class="relative w-full aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-2xl shadow-black/30 bg-gradient-to-br from-slate-800/50 to-slate-900/50"
                >
                  <img
                    src={image}
                    alt={`Hero image ${index + 1}`}
                    class="absolute inset-0 w-full h-full object-contain p-4"
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              </CarouselItem>
            {/each}
          </Carousel>
        {:else}
          <div
            class="relative w-full aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 ring-1 ring-white/10 shadow-2xl shadow-black/30"
          >
            <img
              src={homeHero.fallbackImage ?? ''}
              alt={t.hero.fallbackAlt}
              class="absolute inset-0 w-full h-full object-contain p-4"
            />
          </div>
        {/if}
      </div>
    </div>
  </div>
</section>
