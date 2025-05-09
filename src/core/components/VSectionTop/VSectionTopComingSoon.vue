<script setup lang="ts">
import { computed, defineAsyncComponent, hydrateOnVisible, onMounted, ref } from 'vue';
import { useToast } from '../Base/VToast/use-toast';
import { useHubspotForm } from 'UiKit/composables/useHubspotForm';
import { removeAnchorFromElements } from '@/core/helpers/formatters/removeAnchor';
import { useData } from 'vitepress';
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import { useDialogs } from 'UiKit/store/useDialogs';
import shareIcon from '@/assets/images/social/share.svg';

const VFormJoinWaitlist = defineAsyncComponent({
  loader: () => import('UiKit/components/VForms/VFormJoinWaitlist.vue'),
  hydrate: hydrateOnVisible(),
});

const { toast } = useToast();
const { lang, site, theme } = useData();
const currentLocale = computed(() => (
  Object.values(site.value.locales).find((locale) => locale.lang === lang.value)));

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


const onShareClick = () => {
  useDialogs().showDialogShare(window?.location?.origin || theme.env.FRONTEND_URL);
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
      :button-text="currentLocale.waitList.button"
      :placeholder="currentLocale.waitList.placeholder"
      class="is--margin-top-48"
      @submit="onSubmit"
    />
    <VButton
      :key="currentLocale.share.button"
      variant="link"
      block
      
      class="is--lt-tablet-show is--margin-top-20"
      @click="onShareClick"
    >
      <shareIcon />
      {{ currentLocale.share.button }}
    </VButton>
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
