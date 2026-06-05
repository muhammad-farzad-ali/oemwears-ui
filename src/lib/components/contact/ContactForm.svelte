<script lang="ts">
  import { CheckCircle } from 'lucide-svelte';
  import { t } from '$lib/content';
  import { productCategories } from '$lib/data';
  import { sendToDiscord } from '$lib/utils/discord';
  import type { ContactPayload } from '$lib/types';
  import Button from '$lib/components/ui/Button.svelte';
  import Card from '$lib/components/ui/Card.svelte';
  import CardContent from '$lib/components/ui/CardContent.svelte';
  import CardHeader from '$lib/components/ui/CardHeader.svelte';
  import CardTitle from '$lib/components/ui/CardTitle.svelte';
  import Input from '$lib/components/ui/Input.svelte';
  import Label from '$lib/components/ui/Label.svelte';
  import Textarea from '$lib/components/ui/Textarea.svelte';

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let name = $state('');
  let email = $state('');
  let company = $state('');
  let phone = $state('');
  let productInterest = $state('');
  let quantity = $state('');
  let message = $state('');

  let isSubmitting = $state(false);
  let isSuccess = $state(false);
  let errorMsg = $state<string | null>(null);
  let fieldErrors = $state<Partial<Record<keyof ContactPayload, string>>>({});

  function validate(): boolean {
    const errs: Partial<Record<keyof ContactPayload, string>> = {};
    if (name.trim().length < 2) errs.name = t.contact.validation.nameRequired;
    if (!EMAIL_RE.test(email.trim())) errs.email = t.contact.validation.emailInvalid;
    if (productInterest.trim().length < 1) errs.productInterest = t.contact.validation.productRequired;
    if (message.trim().length < 10) errs.message = t.contact.validation.messageRequired;
    fieldErrors = errs;
    return Object.keys(errs).length === 0;
  }

  function resetForm() {
    name = '';
    email = '';
    company = '';
    phone = '';
    productInterest = '';
    quantity = '';
    message = '';
    fieldErrors = {};
    errorMsg = null;
  }

  function getProductLabel(value: string): string {
    const cat = productCategories.find((c) => c.value === value);
    if (!cat) return value;
    const key = value as keyof typeof t.contact.productOptions;
    return t.contact.productOptions[key] ?? cat.label;
  }

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    errorMsg = null;
    if (!validate()) return;

    isSubmitting = true;
    try {
      const payload: ContactPayload = {
        name: name.trim(),
        email: email.trim(),
        company: company.trim() || undefined,
        phone: phone.trim() || undefined,
        productInterest: getProductLabel(productInterest),
        quantity: quantity.trim() || undefined,
        message: message.trim()
      };
      await sendToDiscord(payload);
      isSuccess = true;
      resetForm();
    } catch (err) {
      console.error('Contact submit failed', err);
      errorMsg = t.contact.errors.genericError;
    } finally {
      isSubmitting = false;
    }
  }

  function sendAnother() {
    isSuccess = false;
  }
</script>

{#if isSuccess}
  <Card class="border-0 shadow-2xl shadow-slate-200/50">
    <CardContent class="pt-12 pb-12 text-center">
      <div
        class="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center"
      >
        <CheckCircle class="h-12 w-12 text-emerald-600" />
      </div>
      <h2 class="text-3xl font-bold mb-4">{t.contact.successTitle}</h2>
      <p class="text-muted-foreground mb-8 text-lg">{t.contact.successMessage}</p>
      <Button size="lg" onclick={sendAnother} class="shadow-lg shadow-primary/25">
        {t.contact.successButton}
      </Button>
    </CardContent>
  </Card>
{:else}
  <Card class="border-0 shadow-xl shadow-slate-200/50">
    <CardHeader>
      <CardTitle class="text-2xl">{t.contact.formTitle}</CardTitle>
    </CardHeader>
    <CardContent>
      <form onsubmit={handleSubmit} novalidate class="space-y-6">
        <div class="grid md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <Label for="name" class="font-medium text-slate-700"
              >{t.contact.nameLabel} <span class="text-red-500">*</span></Label
            >
            <Input id="name" placeholder={t.contact.namePlaceholder} bind:value={name} />
            {#if fieldErrors.name}
              <p class="text-sm text-red-500 flex items-center gap-1">
                <span class="w-1 h-1 rounded-full bg-red-500"></span>
                {fieldErrors.name}
              </p>
            {/if}
          </div>

          <div class="space-y-2">
            <Label for="email" class="font-medium text-slate-700"
              >{t.contact.emailLabel} <span class="text-red-500">*</span></Label
            >
            <Input
              id="email"
              type="email"
              placeholder={t.contact.emailPlaceholder}
              bind:value={email}
            />
            {#if fieldErrors.email}
              <p class="text-sm text-red-500 flex items-center gap-1">
                <span class="w-1 h-1 rounded-full bg-red-500"></span>
                {fieldErrors.email}
              </p>
            {/if}
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <Label for="company" class="font-medium text-slate-700">{t.contact.companyLabel}</Label>
            <Input id="company" placeholder={t.contact.companyPlaceholder} bind:value={company} />
          </div>
          <div class="space-y-2">
            <Label for="phone" class="font-medium text-slate-700">{t.contact.phoneLabel}</Label>
            <Input id="phone" placeholder={t.contact.phonePlaceholder} bind:value={phone} />
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <Label for="productInterest" class="font-medium text-slate-700"
              >{t.contact.productInterestLabel} {t.common.required}</Label
            >
            <select
              id="productInterest"
              bind:value={productInterest}
              class="flex h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 hover:border-slate-300 appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[right_0.75rem_center] bg-[length:1.25rem] bg-no-repeat pr-10"
            >
              <option value="">{t.contact.productPlaceholder}</option>
              {#each productCategories as cat (cat.id)}
                <option value={cat.value}
                  >{t.contact.productOptions[cat.value as keyof typeof t.contact.productOptions] ??
                    cat.label}</option
                >
              {/each}
            </select>
            {#if fieldErrors.productInterest}
              <p class="text-sm text-red-500 flex items-center gap-1">
                <span class="w-1 h-1 rounded-full bg-red-500"></span>
                {fieldErrors.productInterest}
              </p>
            {/if}
          </div>
          <div class="space-y-2">
            <Label for="quantity" class="font-medium text-slate-700">{t.contact.quantityLabel}</Label>
            <Input id="quantity" placeholder={t.contact.quantityPlaceholder} bind:value={quantity} />
          </div>
        </div>

        <div class="space-y-2">
          <Label for="message" class="font-medium text-slate-700"
            >{t.contact.messageLabel} <span class="text-red-500">*</span></Label
          >
          <Textarea
            id="message"
            placeholder={t.contact.messagePlaceholder}
            rows={5}
            bind:value={message}
          />
          {#if fieldErrors.message}
            <p class="text-sm text-red-500 flex items-center gap-1">
              <span class="w-1 h-1 rounded-full bg-red-500"></span>
              {fieldErrors.message}
            </p>
          {/if}
        </div>

        {#if errorMsg}
          <div class="p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-3">
            <span
              class="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0"
            >
              <span class="text-red-600 text-xs font-bold">!</span>
            </span>
            {errorMsg}
          </div>
        {/if}

        <Button
          type="submit"
          class="w-full h-12 text-base shadow-lg shadow-primary/25"
          disabled={isSubmitting}
        >
          {isSubmitting ? t.contact.sendingButton : t.contact.submitButton}
        </Button>

        <p class="text-sm text-muted-foreground text-center flex items-center justify-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          {t.contact.privacyText}
        </p>
      </form>
    </CardContent>
  </Card>
{/if}
