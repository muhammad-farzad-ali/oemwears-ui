<script lang="ts">
  import { Check } from 'lucide-svelte';
  import { cn } from '$lib/utils/cn';
  import type { HTMLInputAttributes } from 'svelte/elements';

  type Props = HTMLInputAttributes & { class?: string; checked?: boolean };

  let { class: className = '', checked = $bindable(false), ...rest }: Props = $props();
</script>

<input
  type="checkbox"
  bind:checked
  class={cn(
    'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground appearance-none checked:bg-primary checked:border-primary',
    className
  )}
  {...rest}
/>
{#if checked}
  <Check class="pointer-events-none -mt-[18px] ml-[2px] h-3 w-3 text-white" />
{/if}
