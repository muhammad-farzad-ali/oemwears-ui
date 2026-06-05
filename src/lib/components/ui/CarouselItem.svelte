<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  type Props = HTMLAttributes<HTMLDivElement> & {
    class?: string;
    children?: Snippet;
  };

  let { class: className = '', children, ...rest }: Props = $props();
</script>

<div
  data-slide
  class={cn('min-w-0 shrink-0 grow-0 basis-full snap-start pl-4', className)}
  {...rest}
>
  {#if children}{@render children()}{/if}
</div>
