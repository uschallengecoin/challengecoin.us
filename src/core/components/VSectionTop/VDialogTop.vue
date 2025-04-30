<script setup lang="ts">
import {
  VDialogContent, VDialogFooter, VDialogTitle, VDialog, VDialogScrollContent,
} from 'UiKit/components/Base/VDialog';
import { computed } from 'vue';

const props = defineProps({
  queryValue: String,
  buyNowHref: String,
  howItWorksHref: String,
  backgroundImageSrc: String,
});

const emit = defineEmits(['close']);

const backgroundImageLocal = computed(() => (
  `url(${props.backgroundImageSrc})`
));
</script>

<template>
  <VDialogContent
    :aria-describedby="undefined"
    class="VDialogTop v-dialog-top with-default-distance"
  >
    <!-- <div
      :style="{ 'background-image': backgroundImageSrc ? backgroundImageLocal : undefined }"
      class="v-dialog-top__content"
    > -->
    <div
      class="v-dialog-top__content"
      :style="{ '--bg-image': backgroundImageSrc ? backgroundImageLocal : undefined }"
    >
      <slot />
    </div>
    <VDialogFooter>
      <div class="v-dialog-top__button-wrap">
        <slot name="buttons">
          <VButton
            v-if="buyNowHref"
            as="a"
            :href="encodeURI(buyNowHref)"
            size="large"
            class="is--margin-top-0"
          >
            Buy Now
          </VButton>
          <VButton
            v-if="howItWorksHref"
            as="a"
            :href="encodeURI(howItWorksHref)"
            size="large"
            variant="link"
            class="is--margin-top-0"
            @click="emit('close')"
          >
            How It Works
          </VButton>
        </slot>
      </div>
    </VDialogFooter>
  </VDialogContent>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as *;
@use "UiKit/styles/_variables.scss" as *;

.v-dialog-top {
  background: $biege;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &__content {
    padding: 0 60px 40px;
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
  }

  &__button-wrap {
    gap: 20px;
    display: flex;
    align-items: flex-start;
    flex-flow: row wrap;
  }

  p {
    font-family: $familyValue;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px;
  }
}
</style>
