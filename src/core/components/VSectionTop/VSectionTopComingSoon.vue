<script setup lang="ts">
import { defineAsyncComponent, hydrateOnVisible, ref } from 'vue';
import { env } from '@/config/env';
import { useToast } from '../Base/VToast/use-toast';
import { useHubspotForm } from 'UiKit/composables/useHubspotForm';

const VFormJoinWaitlist = defineAsyncComponent({
  loader: () => import('UiKit/components/VForms/VFormJoinWaitlist.vue'),
  hydrate: hydrateOnVisible(),
});

const { toast } = useToast();

const TOAST_OPTIONS = {
  title: 'Submitted!',
  variant: 'success',
};

const loadingSubmitting = ref(false);
const onSubmit = async (emailLocal: string) => {
  loadingSubmitting.value = true;
  const { submitFormToHubspot, errorHubspotForm } = useHubspotForm(env.HUBSPOT_FORM_ID_WAITING_LIST);
  await submitFormToHubspot({
    email: emailLocal,
  });
  loadingSubmitting.value = false;
  if (!errorHubspotForm.value) toast(TOAST_OPTIONS);
  else toast({
    title: 'Something went wrong!',
    variant: 'error',
  });
};
</script>

<template>
  <div class="VSectionTopComingSoon v-section-top-coming-soon">
    <slot />
    <VFormJoinWaitlist
      :loading="loadingSubmitting"
      button-text="Join The Waitlist"
      class="is--margin-top-48 v-subscribe__form"
      @submit="onSubmit"
    />
  </div>
</template>

<style lang="scss">
@use "UiKit/styles/_variables.scss" as *;

.v-section-top-coming-soon {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;

  p {
    margin-top: 24px;
    font-size: 28px;
    line-height: 36px;
  }
}
</style>
