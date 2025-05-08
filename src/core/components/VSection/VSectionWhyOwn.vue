<script setup lang="ts">
import VImage from 'UiKit/components/Base/VImage/VImage.vue';
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import { useBreakpoints } from 'UiKit/composables/useBreakpoints';
import { storeToRefs } from 'pinia';
import VSectionTwoColImageFullBackground from 'UiKit/components/VSection/VSectionTwoColImageFullBackground.vue';
import { useData } from 'vitepress';

const props = defineProps({
  image: String,
  imageMobile: String,
  buttonText: String,
});
const { isTablet } = storeToRefs(useBreakpoints());
const { theme } = useData();
</script>

<template>
  <VSectionTwoColImageFullBackground
    reverse
    class="VSectionWhyOwn v-section-why-own"
  >
    <div
      style="position: relative"
      class="v-section-why-own__top"
    >
      <slot />

      <VButton
        as="a"
        :href="encodeURI(theme.links.buyNow)"
        size="large"
      >
        {{ buttonText }}
      </VButton>
    </div>
    <div class="v-section-why-own__image">
      <VImage
        :src="isTablet ? imageMobile || image : image"
        alt="why own image"
        class="v-section-why-own__image-main is--margin-top-0"
        loading="lazy"
        fit="cover"
      />

      <div class="v-section-why-own__coin">
        <VImage
          src="/images/home/coin4.webp"
          alt="coin image"
          class=" is--margin-top-0"
          loading="lazy"
        />
      </div>
    </div>
  </VSectionTwoColImageFullBackground>
</template>

<style lang="scss">
.v-section-why-own {
  @media screen and (width < $desktop){
    margin-bottom: -100px;
  }

  &__image {
    width: calc(50vw - 40px);
    position: relative;

    @media screen and (width < $desktop){
      width: calc(100vw);
      left: -15px;
    }
  }

  &__coin {
    position: absolute;
    bottom: -25px;
    left: 126px;
    z-index: 1;
    width: 390px;
    height: 390px;
    aspect-ratio: 339/339;

    @media screen and (width < $desktop){
      width: 140px;
      height: 140px;
      bottom: -75px;
      left: auto;
      right: 50%;
      transform: translateX(50%);
    }
  }

  &__image-main {
    height: 100%;
    padding-bottom: 64px;

    @media screen and (width < $desktop){
      height: auto;
      padding-bottom: 0;
    }
  }

  &__top > div > p:first-of-type:not([class]) {
    font-family: $familyValue;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 32px;
    margin-bottom: 40px;
    color: $black;
  }
}
</style>
