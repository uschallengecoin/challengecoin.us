<script setup lang="ts">
import { defineAsyncComponent, hydrateOnVisible, onMounted, ref } from 'vue';
import { useToast } from '../Base/VToast/use-toast';
import { useHubspotForm } from 'UiKit/composables/useHubspotForm';
import { removeAnchorFromElements } from '@/core/helpers/formatters/removeAnchor';
import { useData } from 'vitepress';

const VFormJoinWaitlist = defineAsyncComponent({
  loader: () => import('UiKit/components/VForms/VFormJoinWaitlist.vue'),
  hydrate: hydrateOnVisible(),
});

const { toast } = useToast();
const { theme } = useData();

const TOAST_OPTIONS = {
  title: 'You’re subscribed!',
  variant: 'success',
};

const loadingSubmitting = ref(false);
const clear = ref(false);
const onSubmit = async (emailLocal: string) => {
  loadingSubmitting.value = true;
  const { submitFormToHubspot, errorHubspotForm } = useHubspotForm(theme.value.env.HUBSPOT_FORM_ID_WAITING_LIST);
  await submitFormToHubspot({
    email: emailLocal,
  });
  loadingSubmitting.value = false;
  if (!errorHubspotForm.value) {
    toast(TOAST_OPTIONS);
    clear.value = true;
    setTimeout(() => {
      clear.value = false;
    }, 2000);
  } else toast({
    title: 'Something went wrong!',
    variant: 'error',
  });
};


onMounted(() => {
  removeAnchorFromElements('.v-section-top-coming-soon');
});
</script>

<template>
  <div class="VSectionTopComingSoon v-section-top-coming-soon">
    <slot />
    <VFormJoinWaitlist
      :clear="clear"
      :loading="loadingSubmitting"
      button-text="Join The Waitlist"
      class="is--margin-top-48"
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
