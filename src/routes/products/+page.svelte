<script lang="ts">
  import { t } from '$lib/content';
  import { pageTitle } from '$lib/utils/seo';
  import { productCategories, products } from '$lib/data';
  import ProductCard from '$lib/components/products/ProductCard.svelte';
  import Button from '$lib/components/ui/Button.svelte';

  const productsByCategory = productCategories
    .map((cat) => ({
      ...cat,
      items: products.filter((p) => p.category === cat.value)
    }))
    .filter((c) => c.items.length > 0);
</script>

<svelte:head>
  <title>{pageTitle(t.products.title)}</title>
  <meta name="description" content={t.products.subtitle} />
</svelte:head>

<div class="container mx-auto px-4 py-16">
  <div class="text-center mb-16">
    <span
      class="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4"
    >
      {t.products.badge}
    </span>
    <h1 class="text-4xl lg:text-5xl font-bold mb-4">{t.products.title}</h1>
    <p class="text-muted-foreground max-w-2xl mx-auto text-lg">{t.products.subtitle}</p>
  </div>

  <div class="mb-12">
    <div class="flex flex-wrap justify-center gap-3">
      {#each productCategories as cat (cat.value)}
        <a
          href={`#${cat.value}`}
          class="px-6 py-2.5 rounded-full bg-slate-100 text-slate-700 hover:bg-primary hover:text-white transition-all duration-300 font-medium shadow-sm hover:shadow-md hover:-translate-y-0.5"
        >
          {cat.label}
        </a>
      {/each}
    </div>
  </div>

  <div class="space-y-16">
    {#each productsByCategory as cat (cat.value)}
      <section id={cat.value}>
        <h2 class="text-2xl font-bold mb-8 flex items-center gap-3">
          <span class="w-8 h-1 rounded-full bg-gradient-to-r from-primary to-primary/50"></span>
          {cat.label}
        </h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {#each cat.items as product (product.id)}
            <ProductCard {product} />
          {/each}
        </div>
      </section>
    {/each}
  </div>

  {#if products.length === 0}
    <div class="text-center py-16">
      <p class="text-muted-foreground">{t.products.emptyState}</p>
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
        <h2 class="text-2xl lg:text-3xl font-bold mb-4 text-white">{t.products.ctaTitle}</h2>
        <p class="text-slate-300 mb-8 max-w-xl mx-auto">{t.products.ctaSubtitle}</p>
        <Button href="/contact" class="shadow-xl shadow-primary/30">
          {t.products.ctaButton}
        </Button>
      </div>
    </div>
  </section>
</div>
