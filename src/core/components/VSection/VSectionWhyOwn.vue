<script setup lang="ts">
import VImage from 'UiKit/components/Base/VImage/VImage.vue';
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import { links } from '@/config/links';
import { useBreakpoints } from 'UiKit/composables/useBreakpoints';
import { storeToRefs } from 'pinia';

const props = defineProps({
  image: String,
  imageMobile: String,
});
const { isTablet } = storeToRefs(useBreakpoints());
</script>

<template>
  <VSectionTwoColImageFullBackground
    reverse
    class="VSectionWhyOwn v-section-why-own"
  >
    <div style="position: relative">
      <slot />

      <VButton
        as="a"
        :href="encodeURI(links.buyNow)"
        size="large"
      >
        Buy Now
      </VButton>
    </div>
    <div class="v-section-why-own__image">
      <VImage
        :src="isTablet ? imageMobile || image : image"
        alt="why own image"
        class=" is--margin-top-0"
        loading="lazy"
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
    width: calc(48vw - 40px);
    position: relative;

    @media screen and (width < $desktop){
      width: calc(100vw);
      left: -15px;
    }
  }

  &__coin {
    position: absolute;
    bottom: -25%;
    left: 102px;
    z-index: 1;
    width: 471px;
    height: 346px;
    aspect-ratio: 471/346;

    @media screen and (width < $desktop){
      width: 200px;
      height: 150px;
      bottom: -85px;
      left: auto;
      right: -43px;
    }
  }
}
</style>
