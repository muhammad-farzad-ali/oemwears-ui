<script lang="ts">
  import { t } from '$lib/content';
  import Button from '$lib/components/ui/Button.svelte';
</script>

<section class="py-24 relative overflow-hidden">
  <div class="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80"></div>
  <div
    class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"
  ></div>
  <div
    class="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl"
  ></div>
  <div
    class="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl"
  ></div>

  <div class="container mx-auto px-4 text-center relative z-10">
    <h2 class="text-3xl lg:text-5xl font-bold mb-6 text-white">{t.cta.title}</h2>
    <p class="text-lg lg:text-xl mb-10 max-w-2xl mx-auto text-white/80">{t.cta.subtitle}</p>
    <Button
      href="/contact"
      variant="secondary"
      class="bg-white text-primary hover:bg-white/90 shadow-2xl shadow-black/20 hover:shadow-black/30 hover:-translate-y-0.5 transition-all"
    >
      {t.cta.button}
    </Button>
  </div>
</section>
