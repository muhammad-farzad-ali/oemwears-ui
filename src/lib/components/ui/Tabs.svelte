<script lang="ts" module>
  import { getContext, setContext } from 'svelte';

  export type TabsContext = {
    get value(): string;
    set value(v: string);
  };

  const TABS_KEY = Symbol('tabs');

  export function createTabs(initial: string): TabsContext {
    let value = $state(initial);
    const ctx: TabsContext = {
      get value() {
        return value;
      },
      set value(v: string) {
        value = v;
      }
    };
    setContext(TABS_KEY, ctx);
    return ctx;
  }

  export function getTabs(): TabsContext {
    return getContext<TabsContext>(TABS_KEY);
  }
</script>

<script lang="ts">
  import { untrack } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  type Props = HTMLAttributes<HTMLDivElement> & {
    value: string;
    class?: string;
    children?: Snippet;
  };

  let { value, class: className = '', children, ...rest }: Props = $props();
  // The `value` prop is the initial active tab; we intentionally capture it
  // once on mount rather than tracking it as a reactive dependency.
  untrack(() => createTabs(value));
</script>

<div class={cn('w-full', className)} {...rest}>
  {#if children}{@render children()}{/if}
</div>
