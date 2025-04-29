<script setup lang="ts">
import VInfoTop from 'UiKit/components/VInfo/VInfoTop.vue';
import VImage from 'UiKit/components/Base/VImage/VImage.vue';
import { useBreakpoints } from 'UiKit/composables/useBreakpoints';
import { storeToRefs } from 'pinia';

const { isTablet } = storeToRefs(useBreakpoints());

defineProps({
  imageSrc: String,
  imageMobileSrc: String,
  buyNowHref: String,
});
</script>

<template>
  <div class="VInfoHero v-info-hero">
    <VInfoTop
      :buy-now-href="buyNowHref"
      class="v-info-hero__top"
    >
      <slot />
    </VInfoTop>
    <div class="v-info-hero__image-wrap">
      <VImage
        :src="isTablet ? imageMobileSrc : imageSrc"
        alt="hero image"
        class="v-info-hero__image"
      />
    </div>
  </div>
</template>

<style lang="scss">
.v-info-hero {
  display: flex;
  align-items: center;
  gap: 40px;
  // padding: 40px 0;
    @media (width < 768px) {
      flex-direction: column;
      gap: 0;
    }

  &__top {
    flex: 1;
  }

  &__image-wrap {
    width: 48%;
    aspect-ratio: 602/582;
    position: relative;
    margin-right: -80px;

    @media screen and (width < $tablet){
      width: 100%;
      aspect-ratio: 348/250;
      margin: 15px 0 20px;
    }
  }
}
</style>
