<script setup lang="ts">
import { storeToRefs } from 'pinia';
import {
  VDialogContent, VDialogHeader, VDialogTitle, VDialog,
} from 'UiKit/components/Base/VDialog';
import { computed, watch } from 'vue';
import { useDialogs } from 'UiKit/store/useDialogs';
import VSocialLinks from 'UiKit/components/VSocialLinks/VSocialLinks.vue';
import { useData } from 'vitepress';
import VFormCopy from 'UiKit/components/VForms/VFormCopy.vue';

const { lang, site, theme } = useData();
const currentLocale = computed(() => (
  Object.values(site.value.locales).find((locale) => locale.lang === lang.value)));

const useDialogsStore = useDialogs();
const { isDialogShareOpen } = storeToRefs(useDialogsStore);

const open = defineModel<boolean>();

const SOCIAL_LIST = [
  theme.value.socials.twitter,
  theme.value.socials.facebook,
  theme.value.socials.linkedin,
  theme.value.socials.reddit,
];

watch(() => open.value, () => {
  if (!open.value) {
    isDialogShareOpen.value = false;
  }
});
</script>

<template>
  <VDialog
    v-model:open="open"
    query-key="popup"
    query-value="log-out"
  >
    <VDialogContent
      :aria-describedby="undefined"
      class="VDialogShare v-dialog-share"
    >
      <VDialogHeader>
        <VDialogTitle>
          {{ currentLocale.share.title }}
        </VDialogTitle>
      </VDialogHeader>

      <VSocialLinks
        share
        :social-list="SOCIAL_LIST"
        class="v-dialog-share__social-links"
      />

      <VFormCopy
        :text="theme.env.FRONTEND_URL"
        :button-text="currentLocale.copy.copy"
        :button-text-copied="currentLocale.copy.copied"
      />
    </VDialogContent>
  </VDialog>
</template>

<style lang="scss">
@use "UiKit/styles/_variables.scss" as *;

.v-dialog-share {
  text-align: center;
  max-width: 692px;
  padding: 60px;

  @media screen and (width < $tablet){
    padding: 60px 23px;
    height: auto;
  }

  &__social-links {
    margin: 40px auto;
    justify-content: center;
    gap: 28px;

    @media screen and (width < $tablet-xs){
      justify-content: space-between;
      gap: 8px;
    }
  }


}
</style>
