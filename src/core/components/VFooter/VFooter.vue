<script setup lang="ts">
import { defineAsyncComponent, hydrateOnVisible, ref } from 'vue';
import { useHubspotForm } from 'UiKit/composables/useHubspotForm';
import { env } from '@/config/env';
import { useData } from 'vitepress';
import { useToast } from '../Base/VToast/use-toast';
import { useGlobalLoader } from 'UiKit/store/useGlobalLoader';
import VLogo from 'UiKit/components/VLogo.vue';
import { links } from '@/config/links';
import VDropdownLanguages from 'UiKit/components/VDropdownLanguages.vue';

const VSocialLinks = defineAsyncComponent({
  loader: () => import('UiKit/components/VSocialLinks/VSocialLinks.vue'),
  hydrate: hydrateOnVisible(),
});
const VFormFooterSubscribe = defineAsyncComponent({
  loader: () => import('UiKit/components/VForms/VFormFooterSubscribe.vue'),
  hydrate: hydrateOnVisible(),
});

const { theme } = useData();

const SOCIAL_LIST = [
  theme.value.socials.share,
  theme.value.socials?.twitter,
  theme.value.socials?.facebook,
  theme.value.socials?.tiktok,
  theme.value.socials?.github,
  theme.value.socials?.matrix,
  theme.value.socials?.instagram,
];

const { toast } = useToast();

const TOAST_OPTIONS = {
  title: 'You’re subscribed!',
  variant: 'success',
};

const currentYear = new Date().getFullYear();

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
            Join the growing community of Americans spreading pride, honor and gratitude across the country and supporting our past, present and future heroes.
          </p>
          <div
            class="v-footer__contact"
          >
            <h5>
              {{ theme.contacts.email }}
            </h5>
            <span v-if="theme.contacts.phone">|</span>
            <h5>
              {{ theme.contacts.phone }}
            </h5>
          </div>
          <div class="is--margin-top-50 is--small is--gt-tablet-show">
            © {{ currentYear }} U.S. Challenge Coin LLC. All rights reserved.
          </div>
        </div>
        <div class="v-footer__form-wrap">
          <VFormFooterSubscribe
            :clear="clear"
            :loading="loadingSubmitting"
            label="Join Our Newsletter"
            class="v-footer__form"
            @submit="onSubmit"
          />
          <VSocialLinks
            :social-list="SOCIAL_LIST"
            class="v-footer__socials is--margin-top-40"
          />

          <p class="v-footer__terms-wrap is--margin-top-45">
            <VDropdownLanguages
              class="v-footer__lang"
              :content-props="{ side: 'top' }"
            />
            <span class="v-footer__terms">
              <a
                :href="links.terms"
                class="is--small"
              >Terms of Use</a>
              <a
                :href="links.privacy"
                class="is--small"
              >Privacy Policy</a>
            </span>
          </p>
          <div class="is--margin-top-40 is--small is--lt-tablet-show v-footer__copyright">
            © {{ currentYear }} U.S. Challenge Coin LLC. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.v-footer {
  $root: &;

  background-color: $primary-blue;
  padding: 80px 0;
  color: $grayscale-white;

  @media screen and (width < $desktop-lg){
    padding: 60px 0;
  }

  &__wrap {
    display: grid;
    grid-template-columns: calc(55% - 40px) calc(43% - 40px);

    @media screen and (width < $desktop){
      // display: flex;
      // flex-direction: column;
      grid-template-columns: 100%;
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
    max-width: 284px;
    width: 100%;
    height: 100%;
    object-fit: contain;

    @media screen and (width < $tablet){
      max-height: 53px;
      max-width: 284px;
    }
  }

  &__form {
    width: 100%;
  }

  &__socials {
    width: 100%;

    @media screen and (width > $tablet){
      justify-content: space-between;
      gap: 4px !important;
    }
  }

  &__form-wrap {
    width: 100%;
  }

  &__content {
    width: 100%;
  }


  a {
      color: inherit;
    }

  &__terms {
    display: flex;
    flex-direction: row;
    gap: 48px;
    align-items: center;

    @media screen and (width < $tablet){
      justify-content: center;
    }
  }

  &__lang {
    color: $grayscale-white;
  }

  &__terms-wrap {
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    justify-content: space-between;

    @media screen and (width < $tablet){
      justify-content: center;
      flex-direction: column;
      gap: 40px;
    }
  }

  &__copyright {
    @media screen and (width < $tablet){
      text-align: center;
    }
  }
}
</style>
