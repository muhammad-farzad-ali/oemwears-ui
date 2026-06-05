<script lang="ts">
  import { X } from 'lucide-svelte';
  import { cn } from '$lib/utils/cn';
  import type { Snippet } from 'svelte';

  type Props = {
    open: boolean;
    onClose?: () => void;
    class?: string;
    children?: Snippet;
    title?: string;
  };

  let { open = $bindable(false), onClose, class: className = '', children, title }: Props = $props();

  let dialogEl: HTMLDialogElement | undefined = $state();

  $effect(() => {
    const el = dialogEl;
    if (!el) return;
    if (open && !el.open) {
      el.showModal();
    } else if (!open && el.open) {
      el.close();
    }
  });

  function handleClose() {
    open = false;
    onClose?.();
  }
</script>

<dialog
  bind:this={dialogEl}
  onclose={handleClose}
  class={cn(
    'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg rounded-lg backdrop:bg-black/80',
    className
  )}
>
  {#if title}
    <h2 class="text-lg font-semibold leading-none tracking-tight">{title}</h2>
  {/if}
  <button
    type="button"
    onclick={handleClose}
    aria-label="Close"
    class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
  >
    <X class="h-4 w-4" />
  </button>
  {#if children}{@render children()}{/if}
</dialog>
