<script lang="ts">
  import { page } from '$app/state';
  import { Home, AlertTriangle } from 'lucide-svelte';
  import { t } from '$lib/content';
  import { pageTitle } from '$lib/utils/seo';
  import Button from '$lib/components/ui/Button.svelte';

  const isNotFound = $derived(page.status === 404);
  const errorTitleKey = $derived(isNotFound ? 'notFound' : 'generic');
</script>

<svelte:head>
  <title
    >{pageTitle(isNotFound ? t.error.notFoundTitle : t.error.genericTitle)}</title
  >
</svelte:head>

<div class="container mx-auto px-4 py-24">
  <div class="max-w-xl mx-auto text-center">
    <div
      class="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center"
    >
      <AlertTriangle class="h-12 w-12 text-primary" />
    </div>
    <p class="text-sm font-semibold text-primary mb-2">Error {page.status}</p>
    <h1 class="text-4xl font-bold mb-4">
      {isNotFound ? t.error.notFoundTitle : t.error.genericTitle}
    </h1>
    <p class="text-muted-foreground mb-8 text-lg">
      {isNotFound
        ? t.error.notFoundMessage
        : (page.error?.message ?? t.error.genericMessage)}
    </p>
    <Button href="/" size="lg" class="shadow-lg shadow-primary/25">
      <Home class="h-4 w-4 mr-2" />
      {t.common.backToHome}
    </Button>
  </div>
</div>
