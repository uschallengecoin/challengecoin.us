<script setup lang="ts">
import VSection from 'UiKit/components/VSection/VSection.vue';
import { socials } from '@/config/socials';
import { defineAsyncComponent, hydrateOnVisible, ref } from 'vue';
import { useToast } from '../Base/VToast/use-toast';
import { useHubspotForm } from 'UiKit/composables/useHubspotForm';
import { env } from '@/config/env';
import { useBreakpoints } from 'UiKit/composables/useBreakpoints';
import { storeToRefs } from 'pinia';

const VSocialLinks = defineAsyncComponent({
  loader: () => import('UiKit/components/VSocialLinks/VSocialLinks.vue'),
  hydrate: hydrateOnVisible(),
});

const VFormFooterSubscribe = defineAsyncComponent({
  loader: () => import('UiKit/components/VForms/VFormFooterSubscribe.vue'),
  hydrate: hydrateOnVisible(),
});

defineProps({
  title: String,
});

const SOCIAL_LIST = [
  socials?.twitter,
  socials?.facebook,
  socials?.tiktok,
  socials?.telegram,
  socials?.instagram,
];
const { toast } = useToast();

const TOAST_OPTIONS = {
  title: 'Submitted!',
  variant: 'success',
};

const loadingSubmitting = ref(false);
const onSubmit = async (emailLocal: string) => {
  loadingSubmitting.value = true;
  const { submitFormToHubspot } = useHubspotForm(env.HUBSPOT_FORM_ID_RECEIVE_LATEST_NEWS);
  await submitFormToHubspot({
    email: emailLocal,
  });
  loadingSubmitting.value = false;
  toast(TOAST_OPTIONS);
};

const { isTablet } = storeToRefs(useBreakpoints());
</script>

<template>
  <VSection class="VSubscribe v-subscribe with-default-distance is--background-primary-blue">
    <slot />
    <VFormFooterSubscribe
      :loading="loadingSubmitting"
      :button-text="isTablet ? 'Subscribe' : 'Subscribe to our Newsletter'"
      class="is--margin-top-48 v-subscribe__form"
      @submit="onSubmit"
    />

    <VSocialLinks
      :social-list="SOCIAL_LIST"
      class="v-subscribe__socials"
    />
  </VSection>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as *;
@use 'UiKit/styles/_mixins.scss' as *;
@use 'UiKit/styles/_variables.scss' as *;

.v-subscribe {
  text-align: center;
  color: $white;
  background: url('./subscribe.webp') lightgray 50% / cover no-repeat;
  padding: 150px;

  @media screen and (width < $desktop){
    padding: 100px 0;
  }

  p {
    font-family: $familyValue;
    font-size: 28px;
    font-style: normal;
    font-weight: 400;
    line-height: 36px;
    color: $white;

    @media screen and (width < $desktop){
      font-size: 24px;
      line-height: 32px;
    }
  }

  &__form {
    max-width: 805px;
    margin: 0 auto;
  }

  &__socials {
    margin-top: 60px;
    justify-content: center;

    @media screen and (width < $tablet){
      gap: 2px;
      justify-content: space-between;
    }
  }
}
</style>
