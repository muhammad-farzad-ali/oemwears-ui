<script lang="ts">
  import { Package, Clock, Truck } from 'lucide-svelte';
  import { t } from '$lib/content';
  import { pageTitle } from '$lib/utils/seo';
  import { policies } from '$lib/data';
  import Card from '$lib/components/ui/Card.svelte';
  import CardContent from '$lib/components/ui/CardContent.svelte';
  import CardHeader from '$lib/components/ui/CardHeader.svelte';
  import CardTitle from '$lib/components/ui/CardTitle.svelte';
  import Table from '$lib/components/ui/Table.svelte';
  import TableHeader from '$lib/components/ui/TableHeader.svelte';
  import TableBody from '$lib/components/ui/TableBody.svelte';
  import TableRow from '$lib/components/ui/TableRow.svelte';
  import TableHead from '$lib/components/ui/TableHead.svelte';
  import TableCell from '$lib/components/ui/TableCell.svelte';

  const moqPolicy = policies.find((p) => p.type === 'moq');
  const leadTimePolicy = policies.find((p) => p.type === 'lead-time');

  const moqRowLabels: Record<string, string> = {
    jerseys: t.contact.productOptions.jerseys,
    shorts: t.contact.productOptions.shorts,
    shirts: t.contact.productOptions.shirts,
    socks: t.contact.productOptions.socks,
    sets: t.contact.productOptions.sets
  };

  const leadTimeRowLabels: Record<string, string> = {
    sample: t.policies.leadTime.stageLabels.sample,
    production: t.policies.leadTime.stageLabels.production,
    shipping: t.policies.leadTime.stageLabels.shipping
  };
</script>

<svelte:head>
  <title>{pageTitle(t.policies.title)}</title>
  <meta name="description" content={t.policies.subtitle} />
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <div class="text-center mb-12">
    <h1 class="text-4xl font-bold mb-4">{t.policies.title}</h1>
    <p class="text-muted-foreground max-w-2xl mx-auto">{t.policies.subtitle}</p>
  </div>

  <div class="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
    <Card>
      <CardHeader>
        <div class="flex items-center gap-3">
          <Package class="h-6 w-6 text-primary" />
          <CardTitle>{t.policies.moq.title}</CardTitle>
        </div>
        {#if moqPolicy?.description}
          <p class="text-muted-foreground text-sm mt-2">{moqPolicy.description}</p>
        {/if}
      </CardHeader>
      <CardContent>
        {#if moqPolicy}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.policies.moq.productType}</TableHead>
                <TableHead>{t.policies.moq.moq}</TableHead>
                <TableHead>{t.policies.moq.notes}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {#each Object.entries(moqPolicy.data) as [key, value] (key)}
                <TableRow>
                  <TableCell class="font-medium">{moqRowLabels[key] ?? key}</TableCell>
                  <TableCell>{value.quantity}</TableCell>
                  <TableCell class="text-muted-foreground">{value.note}</TableCell>
                </TableRow>
              {/each}
            </TableBody>
          </Table>
        {:else}
          <div class="text-center py-8 text-muted-foreground">{t.policies.moq.emptyState}</div>
        {/if}
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <div class="flex items-center gap-3">
          <Clock class="h-6 w-6 text-primary" />
          <CardTitle>{t.policies.leadTime.title}</CardTitle>
        </div>
        {#if leadTimePolicy?.description}
          <p class="text-muted-foreground text-sm mt-2">{leadTimePolicy.description}</p>
        {/if}
      </CardHeader>
      <CardContent>
        {#if leadTimePolicy}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.policies.leadTime.stage}</TableHead>
                <TableHead>{t.policies.leadTime.timeline}</TableHead>
                <TableHead>{t.policies.moq.notes}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {#each Object.entries(leadTimePolicy.data) as [key, value] (key)}
                <TableRow>
                  <TableCell class="font-medium">{leadTimeRowLabels[key] ?? key}</TableCell>
                  <TableCell>{value.time}</TableCell>
                  <TableCell class="text-muted-foreground">{value.note}</TableCell>
                </TableRow>
              {/each}
            </TableBody>
          </Table>
        {:else}
          <div class="text-center py-8 text-muted-foreground">{t.policies.leadTime.emptyState}</div>
        {/if}
      </CardContent>
    </Card>
  </div>

  <Card class="mt-8 max-w-6xl mx-auto">
    <CardHeader>
      <div class="flex items-center gap-3">
        <Truck class="h-6 w-6 text-primary" />
        <CardTitle>{t.policies.shipping.title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent>
      <div class="grid md:grid-cols-3 gap-6">
        <div>
          <h3 class="font-semibold mb-2">{t.policies.shipping.express.title}</h3>
          <p class="text-sm text-muted-foreground">{t.policies.shipping.express.description}</p>
        </div>
        <div>
          <h3 class="font-semibold mb-2">{t.policies.shipping.sea.title}</h3>
          <p class="text-sm text-muted-foreground">{t.policies.shipping.sea.description}</p>
        </div>
        <div>
          <h3 class="font-semibold mb-2">{t.policies.shipping.air.title}</h3>
          <p class="text-sm text-muted-foreground">{t.policies.shipping.air.description}</p>
        </div>
      </div>
    </CardContent>
  </Card>

  <div class="mt-8 max-w-6xl mx-auto text-center">
    <p class="text-sm text-muted-foreground">{t.policies.note}</p>
  </div>
</div>
