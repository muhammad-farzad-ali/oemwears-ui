<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import type { HTMLInputAttributes } from 'svelte/elements';

  type Props = Omit<HTMLInputAttributes, 'value'> & {
    class?: string;
    value?: string | number | null;
  };

  let {
    class: className = '',
    value = $bindable(''),
    ...rest
  }: Props = $props();

  function onInput(event: Event) {
    const target = event.currentTarget as HTMLInputElement;
    value = target.value;
  }
</script>

<input
  class={cn(
    'flex h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 hover:border-slate-300',
    className
  )}
  value={value ?? ''}
  oninput={onInput}
  {...rest}
/>
