<script setup lang="ts">
import { defineAsyncComponent, hydrateOnVisible, ref } from 'vue';
import { useHubspotForm } from 'UiKit/composables/useHubspotForm';
import { env } from '@/config/env';
import { useData } from 'vitepress';
import { useToast } from '../Base/VToast/use-toast';
import { useGlobalLoader } from 'UiKit/store/useGlobalLoader';
import VLogo from 'UiKit/components/VLogo.vue';

const VSocialLinks = defineAsyncComponent({
  loader: () => import('UiKit/components/VSocialLinks/VSocialLinks.vue'),

  hydrate: hydrateOnVisible(),
});

const VFormFooterSubscribe = defineAsyncComponent({
  loader: () => import('UiKit/components/VForms/VFormFooterSubscribe.vue'),

  hydrate: hydrateOnVisible(),
});

const VFooterBottom = defineAsyncComponent({
  loader: () => import('UiKit/components/VFooter/VFooterBottom.vue'),

  hydrate: hydrateOnVisible(),
});

const { theme } = useData();

const SOCIAL_LIST = [
  theme.value.socials.share,
  theme.value.socials?.twitter,
  theme.value.socials?.facebook,
  theme.value.socials?.tiktok,
  theme.value.socials?.instagram,
];

const { toast } = useToast();

const TOAST_OPTIONS = {
  title: 'You’re subscribed!',
  variant: 'success',
};

const loadingSubmitting = ref(false);
const clear = ref(false);
const onSubmit = async (emailLocal: string) => {
  loadingSubmitting.value = true;
  const { submitFormToHubspot, errorHubspotForm } = useHubspotForm(env.HUBSPOT_FORM_ID_RECEIVE_LATEST_NEWS);
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

const onClickMenu = () => {
  useGlobalLoader().show();
};
</script>

<template>
  <!-- eslint-disable vue/no-multiple-template-root -->
  <div class="VFooter v-footer">
    <div class="is--container">
      <div class="v-footer__wrap is--gap-80">
        <div class="v-footer__content">
          <VLogo
            white
            href="/"
            class="v-footer__logo"
          />
          <p class="is--margin-top-17">
            Introducing a modern symbol of American pride — crafted to honor heritage, support those who serve,
            and bring communities together with every purchase.
          </p>
          <div
            class="v-footer__contact"
          >
            <h5>
              {{ theme.contacts.email }}
            </h5>
            |
            <h5>
              {{ theme.contacts.phone }}
            </h5>
          </div>
        </div>
        <div class="v-footer__form-wrap">
          <VFormFooterSubscribe
            :clear="clear"
            :loading="loadingSubmitting"
            class="v-footer__form"
            @submit="onSubmit"
          />
          <VSocialLinks
            :social-list="SOCIAL_LIST"
            class="v-footer__socials is--margin-top-40"
          />
        </div>
      </div>
    </div>

    <VFooterBottom class="is--margin-top-40" />
  </div>
</template>

<style lang="scss">
.v-footer {
  $root: &;

  background-color: $primary-blue;
  padding: 80px 0;
  color: $white;

  @media screen and (width < $desktop-lg){
    padding: 60px 0;
  }

  &__wrap {
    display: grid;
    grid-template-columns: calc(60.5% - 40px) calc(39.5% - 40px);

    @media screen and (width < $desktop){
      display: flex;
      flex-direction: column;
    }
  }

  &__contact {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    margin-top: 20px;
  
    @media screen and (width < $tablet){
      flex-flow: row wrap;
    }
  }

  p {
    color: inherit;
  }

  &__logo {
    // color: inherit;
    max-height: 44px;

    @media screen and (width < $tablet){
      max-height: 30px;
      max-width: 100%;
      width: 100%;
    }
  }

  &__form {
    width: 100%;
  }

  &__socials {
    width: 100%;
    justify-content: space-between;
    gap: 4px !important;
  }

  &__form-wrap {
    width: 100%;
  }

  &__content {
    width: 100%;
  }
}
</style>
