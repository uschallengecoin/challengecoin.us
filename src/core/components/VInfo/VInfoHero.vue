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
    @media (max-width: 768px) {
      flex-direction: column;
    }

  &__top {
    flex: 1;
  }

  &__image-wrap {
    width: 41%;

    @media screen and (max-width: $tablet){
      width: 65%;
    }
  }
}
</style>
