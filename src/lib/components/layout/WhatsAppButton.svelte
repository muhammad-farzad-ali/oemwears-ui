<script lang="ts">
  import { MessageCircle } from 'lucide-svelte';
  import { t } from '$lib/content';
  import { CONTACT } from '$lib/site.config';

  const url = `https://api.whatsapp.com/send?phone=${CONTACT.whatsappNumber}&text=%22Guten%20Tag%22`;
</script>

<a
  href={url}
  target="_blank"
  rel="noopener noreferrer"
  aria-label={t.contact.whatsappAria}
  class="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
>
  <MessageCircle class="h-7 w-7" />
</a>
