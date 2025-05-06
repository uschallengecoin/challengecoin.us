<script lang="ts">
import { useGlobalLoader } from 'UiKit/store/useGlobalLoader';
import { links } from '@/config/links';
import VSectionTopVideo from 'UiKit/components/VSectionTop/VSectionTopVideo.vue';
import VSlider from 'UiKit/components/VSlider/VSlider.vue';
import { data } from '@/store/home.data';
import { convertPages } from 'UiKit/types/pages';
import VInfoHero from /*VInfoHero*/'UiKit/components/VInfo/VInfoHero.vue';
import VCarouselItem from /*VCarouselItem*/'UiKit/components/Base/VCarousel/VCarouselItem.vue';

console.log('home data', data);

const heroSlides = data?.filter((item) => item.slug === 'heroSlide');
</script>

<script setup lang="ts">
useGlobalLoader().hide();
</script>

<template>
  <div class="ViewHome view-home">
    <VSectionTopVideo
      id="hero"
      full-height
      video-src="/video/video-bg.mp4"
    >
      <VSlider
        autoplay
        fade
        :options="{ containScroll: 'trimSnaps', loop: true }"
      >
        <VCarouselItem
          v-for="(item, index) in heroSlides"
          :key="index"
        >
          <VInfoHero
            :image-src="item.image"
            :image-mobile-src="item.imageMobile"
            :buy-now-href="links.buyNow"
          >
            <div v-html="item.html" />
          </VInfoHero>
        </VCarouselItem>
      </VSlider>
    </VSectionTopVideo>
    <!-- <Content /> -->
    <div class="is--paddings view-home__button">
      <VButton
        as="a"
        :href="encodeURI(links.buyNow)"
        size="large"
      >
        Buy U.S. Challenge Coin
      </VButton>
    </div>
  </div>
</template>

<style lang="scss">
@use "UiKit/styles/_variables.scss" as *;

.view-home {
  overflow: hidden;

  .v-slider {
    width: 100%;
    margin: 0;
    display: flex;
    flex-direction: column-reverse;
  }

  .v-slider__prev,
  .v-slider__next {
    bottom: -48px;
    top: auto;
    right: 50%;
    z-index: 1;
  }

  .v-slider__prev {
    transform: translateX(-18px);
  }

  .v-slider__next {
    transform: translateX(68px);
  }

  .v-info-hero {
    height: 100%;
  }

  .v-carousel-item {
    // height: 100%;
    flex: 0 0 100%;
  }

  &__button {
    text-align: center;
  }
}
</style>
