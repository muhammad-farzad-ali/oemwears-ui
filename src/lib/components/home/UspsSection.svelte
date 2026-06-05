<script lang="ts">
  import { Shield, Target, Workflow, PackageCheck, Globe2 } from 'lucide-svelte';
  import { t } from '$lib/content';
  import Card from '$lib/components/ui/Card.svelte';
  import CardContent from '$lib/components/ui/CardContent.svelte';

  const items = [
    { icon: Shield, ...t.usps.germanTrust, color: 'primary' },
    { icon: Target, ...t.usps.sportswearFocus, color: 'accent' },
    { icon: Workflow, ...t.usps.endToEnd, color: 'emerald' },
    { icon: PackageCheck, ...t.usps.lowMoq, color: 'violet' },
    { icon: Globe2, ...t.usps.reliableNetwork, color: 'amber' }
  ];

  const colorClasses: Record<string, { bg: string; text: string }> = {
    primary: { bg: 'from-primary/10 to-primary/5', text: 'text-primary' },
    accent: { bg: 'from-accent/10 to-accent/5', text: 'text-accent' },
    emerald: { bg: 'from-emerald-500/10 to-emerald-500/5', text: 'text-emerald-600' },
    violet: { bg: 'from-violet-500/10 to-violet-500/5', text: 'text-violet-600' },
    amber: { bg: 'from-amber-500/10 to-amber-500/5', text: 'text-amber-600' }
  };
</script>

<section class="py-24 bg-gradient-to-b from-slate-50 to-white">
  <div class="container mx-auto px-4">
    <div class="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
      {#each items as item (item.title)}
        <Card class="group border-0 shadow-xl shadow-slate-200/50 bg-white">
          <CardContent class="pt-8 text-center">
            <div
              class={`w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br ${colorClasses[item.color].bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
            >
              <item.icon class={`h-8 w-8 ${colorClasses[item.color].text}`} />
            </div>
            <h3 class="font-bold text-lg mb-2">{item.title}</h3>
            <p class="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
          </CardContent>
        </Card>
      {/each}
    </div>
  </div>
</section>
