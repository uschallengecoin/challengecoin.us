<script setup lang="ts">
import {
  VDialogContent, VDialogFooter, VDialog,
} from 'UiKit/components/Base/VDialog';
import { computed, watch } from 'vue';
import { links } from '@/config/links';

const props = defineProps({
  backgroundImageSrc: String,
  data: String,
});

const emit = defineEmits(['close']);

const open = defineModel<boolean>();

const backgroundImageLocal = computed(() => (
  `url(${props.backgroundImageSrc})`
));

watch(() => open.value, () => {
  if (!open.value) {
    emit('close');
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
      class="VDialogHero v-dialog-hero with-default-distance"
    >
      <div
        class="v-dialog-hero__content"
        :style="{ '--bg-image': backgroundImageSrc ? backgroundImageLocal : undefined }"
        v-html="data"
      />
      <VDialogFooter>
        <div class="v-dialog-hero__button-wrap">
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
@use 'UiKit/styles/_colors.scss' as *;
@use "UiKit/styles/_variables.scss" as *;

.v-dialog-hero {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &__content {
    padding: 0 60px;
    height: calc(100% - 130px);
    overflow-y: auto;
    scrollbar-color: $gray transparent;
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
