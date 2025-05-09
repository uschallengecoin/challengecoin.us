<script setup lang="ts">
import {
  VDialogContent, VDialogFooter, VDialog,
} from 'UiKit/components/Base/VDialog';
import { computed, ref, watch } from 'vue';
import { useData } from 'vitepress';

const props = defineProps({
  backgroundImageSrc: String,
  data: String,
});

const emit = defineEmits(['close']);
const { lang, site, theme } = useData();
const currentLocale = computed(() => (
  Object.values(site.value.locales).find((locale) => locale.lang === lang.value)));

const open = defineModel<boolean>();
const dialog = ref(null);

const backgroundImageLocal = computed(() => (
  `url(${props.backgroundImageSrc})`
));

watch(() => open.value, () => {
  if (!open.value) {
    emit('close');
  }
});

watch(() => props.data, () => {
  if (dialog.value) {
    dialog.value.scrollTop = 0;
  }
});
</script>

<template>
  <VDialog
    v-model:open="open"
    query-value="engraver"
  >
    <VDialogContent
      :aria-describedby="undefined"
      class="VDialog v-dialog-default with-default-distance"
    >
      <div
        ref="dialog"
        class="v-dialog-default__content"
        :style="{ '--bg-image': backgroundImageSrc ? backgroundImageLocal : undefined }"
        v-html="data"
      />
      <VDialogFooter>
        <div class="v-dialog-default__button-wrap">
          <slot name="buttons">
            <VButton
              v-if="theme.links.buyNow"
              as="a"
              :href="encodeURI(theme.links.buyNow)"
              size="large"
              class="is--margin-top-0"
            >
              {{ currentLocale.home.buyNow || 'Buy Now' }}
            </VButton>
            <VButton
              v-if="theme.links.howItWorks"
              as="a"
              :href="encodeURI(theme.links.howItWorks)"
              size="large"
              variant="link"
              class="is--margin-top-0"
              @click="open = false"
            >
              {{ currentLocale.home.howItWorks || 'How It Works' }}
            </VButton>
          </slot>
        </div>
      </VDialogFooter>
    </VDialogContent>
  </VDialog>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as *;
@use "UiKit/styles/_variables.scss" as *;

.v-dialog-default {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &__content {
    padding: 0 60px;
    // height: calc(100% - 130px);
    flex: 1;
    overflow-y: auto;
    scrollbar-color: $dark-gray transparent;
    scrollbar-width: thin;

    &::before {
      content: "";
      position: absolute;
      background-image: var(--bg-image);
      width: 100%;
      height: 100%;
      opacity: 0.08;
      background-repeat: no-repeat;
      background-size: 60%;
      background-position: 124% 0%;
      top: 0;
      left: 0;
      z-index: -1;

      @media screen and (width < $tablet){
        display: none;
      }
    }

    @media screen and (width < $tablet){
      padding: 0 23px 14px;
    }

    > *:last-child {
      margin-bottom: 40px;
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
