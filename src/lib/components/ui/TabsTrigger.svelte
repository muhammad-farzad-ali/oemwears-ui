<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { getTabs, type TabsContext } from './Tabs.svelte';
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';

  type Props = HTMLButtonAttributes & {
    value: string;
    class?: string;
    children?: Snippet;
  };

  let { value, class: className = '', children, ...rest }: Props = $props();
  const tabs: TabsContext = getTabs();
  const isActive = $derived(tabs.value === value);
</script>

<button
  type="button"
  role="tab"
  aria-selected={isActive}
  data-state={isActive ? 'active' : 'inactive'}
  onclick={() => (tabs.value = value)}
  class={cn(
    'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    isActive
      ? 'bg-background text-foreground shadow-sm'
      : 'text-muted-foreground hover:text-foreground',
    className
  )}
  {...rest}
>
  {#if children}{@render children()}{/if}
</button>
