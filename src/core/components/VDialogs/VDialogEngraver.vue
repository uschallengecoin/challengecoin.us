<script setup lang="ts">
import { storeToRefs } from 'pinia';
import {
  VDialogContent, VDialogHeader, VDialogTitle, VDialog, VDialogFooter,
} from 'UiKit/components/Base/VDialog';
import { computed, watch } from 'vue';
import { useDialogs } from 'UiKit/store/useDialogs';
import { useData } from 'vitepress';
import { links } from '@/config/links';

const { theme } = useData();
console.log('theme', theme);
const useDialogsStore = useDialogs();
const { isDialogEngraverOpen } = storeToRefs(useDialogsStore);

const data = computed(() => {
  return theme.navigation.dialogs.children.engraver.data.html;
});

const open = defineModel<boolean>();

watch(() => open.value, () => {
  if (!open.value) {
    isDialogEngraverOpen.value = false;
  }
});
</script>

<template>
  <VDialog
    v-model:open="open"
    query-value="engraver"
  >
    <VDialogContent
      scrollable-body
      :aria-describedby="undefined"
      class="VDialogEngraver v-dialog-engraver with-default-distance"
    >
      <div
        class="v-dialog-engraver__content"
        v-html="data"
      />
      <VDialogFooter>
        <div class="v-dialog-engraver__button-wrap">
          <slot name="buttons">
            <VButton
              v-if="links.buyNow"
              as="a"
              :href="encodeURI(links.buyNow)"
              size="large"
              class="is--margin-top-0"
            >
              Buy Now
            </VButton>
            <VButton
              v-if="links.howItWorks"
              as="a"
              :href="encodeURI(links.howItWorks)"
              size="large"
              variant="link"
              class="is--margin-top-0"
              @click="open = false"
            >
              How It Works
            </VButton>
          </slot>
        </div>
      </VDialogFooter>
    </VDialogContent>
  </VDialog>
</template>

<style lang="scss">
@use "UiKit/styles/_variables.scss" as *;

.v-dialog-engraver {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &__content {
    padding: 0 60px;
    height: calc(100% - 130px);
    overflow-y: auto;
    scrollbar-color: $gray transparent;
    scrollbar-width: thin;

    @media screen and (width < $tablet){
      padding: 0 23px 14px;
    }

    h3 + h5 {
      margin-top: 24px !important;
    }

    h5 + p {
      margin-top: 30px !important;
    }
  }

  &__button-wrap {
    gap: 20px;
    display: flex;
    align-items: flex-start;
    flex-flow: row wrap;
  }
}
</style>
