<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import type { HTMLTextareaAttributes } from 'svelte/elements';

  type Props = Omit<HTMLTextareaAttributes, 'value'> & {
    class?: string;
    value?: string | null;
  };

  let {
    class: className = '',
    value = $bindable(''),
    ...rest
  }: Props = $props();

  function onInput(event: Event) {
    const target = event.currentTarget as HTMLTextAreaElement;
    value = target.value;
  }
</script>

<textarea
  class={cn(
    'flex min-h-[120px] w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm ring-offset-background placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 hover:border-slate-300 resize-y',
    className
  )}
  value={value ?? ''}
  oninput={onInput}
  {...rest}
></textarea>
