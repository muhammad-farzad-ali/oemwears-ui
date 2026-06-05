<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes, HTMLAnchorAttributes } from 'svelte/elements';

  type Variant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  type Size = 'default' | 'sm' | 'lg' | 'icon';

  type Props = {
    variant?: Variant;
    size?: Size;
    class?: string;
    href?: string;
    children?: Snippet;
  } & Omit<HTMLButtonAttributes & HTMLAnchorAttributes, 'class' | 'children'>;

  let {
    variant = 'default',
    size = 'default',
    class: className = '',
    href,
    children,
    ...rest
  }: Props = $props();

  const base =
    'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95';

  const variantClasses: Record<Variant, string> = {
    default:
      'bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:from-primary/90 hover:to-primary hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5',
    destructive:
      'bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-lg hover:shadow-destructive/25 hover:-translate-y-0.5',
    outline:
      'border-2 border-primary/20 bg-background hover:bg-primary/5 hover:border-primary/40 hover:-translate-y-0.5',
    secondary:
      'bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:-translate-y-0.5',
    ghost:
      'hover:bg-primary/5 hover:text-primary hover:-translate-y-0.5',
    link: 'text-primary underline-offset-4 hover:underline'
  };

  const sizeClasses: Record<Size, string> = {
    default: 'h-10 px-5 py-2',
    sm: 'h-9 rounded-lg px-4',
    lg: 'h-12 rounded-xl px-8 text-base',
    icon: 'h-10 w-10 rounded-xl'
  };
</script>

{#if href}
  <a {href} class={cn(base, variantClasses[variant], sizeClasses[size], className)} {...rest as HTMLAnchorAttributes}>
    {#if children}{@render children()}{/if}
  </a>
{:else}
  <button class={cn(base, variantClasses[variant], sizeClasses[size], className)} {...rest as HTMLButtonAttributes}>
    {#if children}{@render children()}{/if}
  </button>
{/if}
