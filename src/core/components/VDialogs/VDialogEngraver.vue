<script setup lang="ts">
import { storeToRefs } from 'pinia';
import {
  VDialogContent, VDialogHeader, VDialogTitle, VDialog,
} from 'UiKit/components/Base/VDialog';
import { watch } from 'vue';
import { useDialogs } from 'UiKit/store/useDialogs';
import VSocialLinks from 'UiKit/components/VSocialLinks/VSocialLinks.vue';
import { useData } from 'vitepress';
import VFormCopy from 'UiKit/components/VForms/VFormCopy.vue';

const { theme } = useData();
console.log('theme', theme);
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
      class="VDialogEngraver v-dialog-engraver"
    >
      <VDialogHeader>
        <VDialogTitle>
          Share
        </VDialogTitle>
      </VDialogHeader>

      <VSocialLinks
        share
        :social-list="SOCIAL_LIST"
        class="v-dialog-engraver__social-links"
      />

      <VFormCopy
        :text="theme.env.FRONTEND_URL"
        button-text="Copy Link"
      />
    </VDialogContent>
  </VDialog>
</template>

<style lang="scss">
.v-dialog-engraver {
  text-align: center;
  max-width: 692px;
  padding: 60px;

  &__social-links {
    margin: 40px auto;
    justify-content: center;
    gap: 28px;
  }
}
</style>
