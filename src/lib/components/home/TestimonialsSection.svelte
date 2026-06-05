<script lang="ts">
  import { Star } from 'lucide-svelte';
  import { t } from '$lib/content';
  import { testimonials } from '$lib/data';
  import Carousel from '$lib/components/ui/Carousel.svelte';
  import CarouselItem from '$lib/components/ui/CarouselItem.svelte';
  import Card from '$lib/components/ui/Card.svelte';
  import CardContent from '$lib/components/ui/CardContent.svelte';
</script>

{#if testimonials.length > 0}
  <section class="py-24">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <span
          class="inline-block px-4 py-1.5 rounded-full bg-yellow-500/10 text-yellow-600 text-sm font-semibold mb-4"
        >
          {t.testimonials.badge}
        </span>
        <h2 class="text-3xl lg:text-4xl font-bold mb-4">{t.testimonials.title}</h2>
        <p class="text-muted-foreground max-w-2xl mx-auto text-lg">
          {t.testimonials.subtitle}
        </p>
      </div>
      <Carousel class="max-w-4xl mx-auto">
        {#each testimonials as t (t.id)}
          <CarouselItem>
            <Card class="border-0 shadow-none bg-transparent">
              <CardContent class="pt-6">
                <div class="flex justify-center gap-1 mb-6">
                  {#each Array(5) as _, i (i)}
                    <Star
                      class={`h-6 w-6 ${
                        i < t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'
                      }`}
                    />
                  {/each}
                </div>
                <blockquote
                  class="text-center text-xl lg:text-2xl font-medium text-slate-700 mb-8 leading-relaxed"
                >
                  &ldquo;{t.content}&rdquo;
                </blockquote>
                <div class="text-center">
                  <div
                    class="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center"
                  >
                    <span class="text-xl font-bold text-primary">
                      {t.blurAuthor ? '?' : t.author.charAt(0)}
                    </span>
                  </div>
                  <p class="font-bold text-lg">
                    {#if t.blurAuthor}
                      <span class="blur-sm select-none">{t.author}</span>
                    {:else}
                      {t.author}
                    {/if}
                  </p>
                  <p class="text-sm text-muted-foreground">
                    {#if t.blurCompany}
                      <span class="blur-sm select-none">{t.company}</span>
                    {:else}
                      {t.company}
                    {/if}
                  </p>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        {/each}
      </Carousel>
    </div>
  </section>
{/if}
