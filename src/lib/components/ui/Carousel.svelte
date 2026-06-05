<script lang="ts">
  import { ChevronLeft, ChevronRight } from 'lucide-svelte';
  import { cn } from '$lib/utils/cn';
  import { onMount, type Snippet } from 'svelte';

  type Props = {
    class?: string;
    children?: Snippet;
  };

  let { class: className = '', children }: Props = $props();

  let track: HTMLDivElement | undefined = $state();
  let canPrev = $state(false);
  let canNext = $state(true);

  function update() {
    const el = track;
    if (!el) return;
    canPrev = el.scrollLeft > 1;
    canNext = el.scrollLeft + el.clientWidth < el.scrollWidth - 1;
  }

  function prev() {
    const el = track;
    if (!el) return;
    const slide = el.querySelector<HTMLElement>('[data-slide]');
    const w = slide ? slide.offsetWidth + 16 : el.clientWidth;
    el.scrollBy({ left: -w, behavior: 'smooth' });
  }
  function next() {
    const el = track;
    if (!el) return;
    const slide = el.querySelector<HTMLElement>('[data-slide]');
    const w = slide ? slide.offsetWidth + 16 : el.clientWidth;
    el.scrollBy({ left: w, behavior: 'smooth' });
  }

  onMount(() => {
    update();
    track?.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      track?.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  });
</script>

<div class={cn('relative', className)} role="region" aria-roledescription="carousel">
  <div
    bind:this={track}
    class="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
  >
    {#if children}{@render children()}{/if}
  </div>

  {#if canPrev}
    <button
      type="button"
      onclick={prev}
      class="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 flex items-center justify-center z-10"
      aria-label="Previous"
    >
      <ChevronLeft class="h-4 w-4 text-white" />
    </button>
  {/if}
  {#if canNext}
    <button
      type="button"
      onclick={next}
      class="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 flex items-center justify-center z-10"
      aria-label="Next"
    >
      <ChevronRight class="h-4 w-4 text-white" />
    </button>
  {/if}
</div>

<style>
  :global(.no-scrollbar::-webkit-scrollbar) {
    display: none;
  }
  :global(.no-scrollbar) {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
