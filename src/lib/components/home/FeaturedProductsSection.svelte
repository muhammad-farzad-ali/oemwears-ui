<script lang="ts">
  import { t } from '$lib/content';
  import { products } from '$lib/data';
  import { PLACEHOLDER_IMAGES } from '$lib/site.config';
  import Card from '$lib/components/ui/Card.svelte';
  import CardContent from '$lib/components/ui/CardContent.svelte';
  import Button from '$lib/components/ui/Button.svelte';

  const featured = products.slice(0, 6);
</script>

<section class="py-24">
  <div class="container mx-auto px-4">
    <div class="text-center mb-16">
      <span
        class="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4"
      >
        {t.featuredProducts.badge}
      </span>
      <h2 class="text-3xl lg:text-4xl font-bold mb-4">{t.featuredProducts.title}</h2>
      <p class="text-muted-foreground max-w-2xl mx-auto text-lg">
        {t.featuredProducts.subtitle}
      </p>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each featured as product (product.id)}
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
            <p class="text-sm text-muted-foreground mb-5 line-clamp-2">
              {product.description}
            </p>
            <Button href="/products" variant="outline" class="w-full rounded-xl">
              {t.featuredProducts.viewDetails}
            </Button>
          </CardContent>
        </Card>
      {/each}
    </div>

    <div class="text-center mt-12">
      <Button href="/products" class="shadow-xl shadow-primary/25">
        {t.featuredProducts.viewAll}
      </Button>
    </div>
  </div>
</section>
