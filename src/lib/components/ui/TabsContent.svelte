<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { getTabs, type TabsContext } from './Tabs.svelte';
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  type Props = HTMLAttributes<HTMLDivElement> & {
    value: string;
    class?: string;
    children?: Snippet;
  };

  let { value, class: className = '', children, ...rest }: Props = $props();
  const tabs: TabsContext = getTabs();
  const isActive = $derived(tabs.value === value);
</script>

{#if isActive}
  <div
    role="tabpanel"
    data-state={isActive ? 'active' : 'inactive'}
    class={cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className
    )}
    {...rest}
  >
    {#if children}{@render children()}{/if}
  </div>
{/if}
