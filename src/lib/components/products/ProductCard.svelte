<script lang="ts">
  import { t } from '$lib/content';
  import { PLACEHOLDER_IMAGES } from '$lib/site.config';
  import type { Product } from '$lib/types';
  import Card from '$lib/components/ui/Card.svelte';
  import CardContent from '$lib/components/ui/CardContent.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';

  type Props = { product: Product };
  let { product }: Props = $props();
</script>

<Card class="overflow-hidden group border-0 shadow-xl shadow-slate-200/50">
  <div class="relative aspect-square overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
    <img
      src={product.images[0] || PLACEHOLDER_IMAGES.product}
      alt={product.name}
      class="absolute inset-0 w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
      loading="lazy"
    />
    <div
      class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    ></div>
  </div>
  <CardContent class="pt-6">
    <h3 class="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
      {product.name}
    </h3>
    <p class="text-sm text-muted-foreground mb-5 line-clamp-2">{product.description}</p>

    {#if product.fabric}
      <div class="mb-4">
        <span class="text-sm font-semibold text-slate-700">{t.products.fabric}: </span>
        <span class="text-sm text-muted-foreground">{product.fabric}</span>
      </div>
    {/if}

    {#if product.printingMethods && product.printingMethods.length > 0}
      <div class="mb-4">
        <span class="text-sm font-semibold text-slate-700 block mb-2"
          >{t.products.printingMethods}:</span
        >
        <div class="flex flex-wrap gap-1.5">
          {#each product.printingMethods as method (method)}
            <Badge
              variant="secondary"
              class="text-xs rounded-lg px-2.5 py-1 bg-primary/10 text-primary border-0 font-medium"
            >
              {method}
            </Badge>
          {/each}
        </div>
      </div>
    {/if}

    {#if product.features && product.features.length > 0}
      <div class="mb-4">
        <span class="text-sm font-semibold text-slate-700 block mb-2">{t.products.features}:</span>
        <ul class="text-sm text-muted-foreground space-y-1">
          {#each product.features.slice(0, 3) as feature (feature)}
            <li class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
              {feature}
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </CardContent>
</Card>
