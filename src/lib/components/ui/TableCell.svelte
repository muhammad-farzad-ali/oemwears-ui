<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import type { Snippet } from 'svelte';
  import type { HTMLTdAttributes } from 'svelte/elements';

  type Props = HTMLTdAttributes & {
    class?: string;
    children?: Snippet;
  };

  let { class: className = '', children, ...rest }: Props = $props();
</script>

<td
  class={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)}
  {...rest}
>
  {#if children}{@render children()}{/if}
</td>
