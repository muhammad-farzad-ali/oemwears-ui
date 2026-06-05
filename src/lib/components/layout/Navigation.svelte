<script lang="ts">
  import { Menu, X } from 'lucide-svelte';
  import { t } from '$lib/content';
  import { BRAND } from '$lib/site.config';
  import Button from '$lib/components/ui/Button.svelte';

  const navItems = [
    { href: '/', label: t.nav.home },
    { href: '/products', label: t.nav.products },
    { href: '/customization', label: t.nav.customization },
    { href: '/about', label: t.nav.about },
    { href: '/certifications', label: t.nav.certifications },
    { href: '/policies', label: t.nav.policies },
    { href: '/contact', label: t.nav.contact }
  ];

  let isOpen = $state(false);

  function close() {
    isOpen = false;
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      close();
    }
  }
</script>

<svelte:window onkeydown={onKeydown} />

<header
  class="sticky top-0 z-50 w-full border-b border-white/10 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60"
>
  <div class="container flex h-16 items-center justify-between mx-auto px-4">
    <a href="/" class="flex items-center gap-2 font-bold text-xl transition-transform hover:scale-105">
      <span class="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
        {BRAND.name.substring(0, 3)}
      </span>
      <span class="text-slate-700">{BRAND.name.substring(3)}</span>
    </a>

    <nav class="hidden lg:flex items-center gap-1">
      {#each navItems as item (item.href)}
        <a
          href={item.href}
          class="relative px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:text-primary rounded-lg hover:bg-primary/5 group"
        >
          {item.label}
          <span
            class="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/60 transition-all duration-300 group-hover:w-1/2 rounded-full"
          ></span>
        </a>
      {/each}
    </nav>

    <div class="hidden lg:flex items-center gap-3">
      <Button href="/contact" class="shadow-lg shadow-primary/25">{t.nav.getQuote}</Button>
    </div>

    <button
      class="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors"
      onclick={() => (isOpen = !isOpen)}
      aria-label={t.common.toggleMenu}
      aria-expanded={isOpen}
      aria-controls="mobile-drawer"
    >
      {#if isOpen}
        <X class="h-6 w-6 text-slate-600" />
      {:else}
        <Menu class="h-6 w-6 text-slate-600" />
      {/if}
    </button>
  </div>

  {#if isOpen}
    <div
      id="mobile-drawer"
      class="lg:hidden border-t border-slate-100 bg-white/95 backdrop-blur-xl"
    >
      <nav class="container flex flex-col gap-2 py-4 mx-auto px-4">
        {#each navItems as item (item.href)}
          <a
            href={item.href}
            onclick={close}
            class="text-sm font-medium transition-colors hover:text-primary px-4 py-3 rounded-xl hover:bg-slate-50"
          >
            {item.label}
          </a>
        {/each}
        <Button href="/contact" class="w-full mt-2 shadow-lg shadow-primary/25" onclick={close}>
          {t.nav.getQuote}
        </Button>
      </nav>
    </div>
  {/if}
</header>
