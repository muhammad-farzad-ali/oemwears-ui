<script lang="ts">
  import { Award } from 'lucide-svelte';
  import { t } from '$lib/content';
  import { certifications } from '$lib/data';
  import Card from '$lib/components/ui/Card.svelte';
  import CardContent from '$lib/components/ui/CardContent.svelte';

  const shown = certifications.slice(0, 4);
</script>

<section class="py-24 bg-gradient-to-b from-slate-50 to-slate-100/50">
  <div class="container mx-auto px-4">
    <div class="text-center mb-16">
      <span
        class="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 text-sm font-semibold mb-4"
      >
        Quality Assured
      </span>
      <h2 class="text-3xl lg:text-4xl font-bold mb-4">{t.certifications.title}</h2>
      <p class="text-muted-foreground max-w-2xl mx-auto text-lg">
        {t.certifications.subtitle}
      </p>
    </div>
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each shown as cert (cert.id)}
        <Card class="group border-0 shadow-xl shadow-slate-200/50 bg-white">
          <CardContent class="pt-8 text-center">
            <div
              class="w-20 h-20 mx-auto mb-5 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
            >
              <Award class="h-10 w-10 text-emerald-600" />
            </div>
            <h3 class="font-bold text-lg mb-2">{cert.name}</h3>
            <p class="text-sm text-muted-foreground">{cert.issuer}</p>
          </CardContent>
        </Card>
      {/each}
    </div>
  </div>
</section>
