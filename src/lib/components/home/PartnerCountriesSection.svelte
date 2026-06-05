<script lang="ts">
  import { MapPin } from 'lucide-svelte';
  import { t } from '$lib/content';
  import { partnerCountries } from '$lib/data';
  import Card from '$lib/components/ui/Card.svelte';
  import CardContent from '$lib/components/ui/CardContent.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';
</script>

{#if partnerCountries.length > 0}
  <section class="py-24 bg-gradient-to-b from-slate-50 to-white">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <span
          class="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4"
        >
          {t.partnerCountries.badge}
        </span>
        <h2 class="text-3xl lg:text-4xl font-bold mb-4">{t.partnerCountries.title}</h2>
        <p class="text-muted-foreground max-w-2xl mx-auto text-lg">
          {t.partnerCountries.subtitle}
        </p>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {#each partnerCountries as country (country.id)}
          <Card class="group border-0 shadow-xl shadow-slate-200/50 bg-white h-full">
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
              <h3 class="font-bold text-xl mb-2 flex items-center justify-center gap-1.5">
                <MapPin class="h-4 w-4 text-primary" />
                {country.name}
              </h3>
              <p class="text-muted-foreground text-sm leading-relaxed mb-4">
                {country.description}
              </p>
              <div class="mt-auto flex flex-wrap justify-center gap-2">
                {#each country.strengths as strength (strength)}
                  <Badge variant="secondary" class="text-xs">{strength}</Badge>
                {/each}
              </div>
            </CardContent>
          </Card>
        {/each}
      </div>
    </div>
  </section>
{/if}
