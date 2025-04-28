<script setup lang="ts">
import VInfoTop from 'UiKit/components/VInfo/VInfoTop.vue';
import VImage from 'UiKit/components/Base/VImage/VImage.vue';

defineProps({
  imageSrc: String,
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
        :src="imageSrc"
        alt="hero image"
        class="v-info-hero__image"
        loading="lazy"
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
    width: 41%;
    aspect-ratio: 225/195;

    @media screen and (width < $tablet){
      width: 65%;
    }
  }
}
</style>
