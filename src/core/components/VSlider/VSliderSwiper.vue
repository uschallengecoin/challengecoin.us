<script setup lang="ts">
import { removeAnchorFromElements } from '@/core/helpers/formatters/removeAnchor';
import { Navigation, EffectFade, Autoplay } from 'swiper/modules';
import { Swiper } from 'swiper/vue';
import { onMounted } from 'vue';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/effect-fade';
// import 'swiper/css/autoplay';

const modules = [Navigation, EffectFade, Autoplay];

onMounted(() => {
  removeAnchorFromElements('.slider-swiper');
  // api.value?.reInit();
});
</script>

<template>
  <Swiper
    :modules="modules"
    v-bind="$attrs"
    class="swiper-container VSliderSwiper slider-swiper"
  >
    <slot />
  </Swiper>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;

.slider-swiper {
  margin-left: auto;
  margin-right: auto;
  position: relative;
  // overflow: hidden;
  list-style: none;
  padding: 0;
  z-index: 1;
  display: block;
  user-select: none;

  .swiper-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    transition-property: transform;
    box-sizing: content-box;
  }

  .swiper-slide {
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    position: relative;
    transition-property: transform;
    display: block;
  }

  .swiper-slide-invisible-blank {
    visibility: hidden;
  }

  .swiper-button-prev,
  .swiper-button-next {
    position: absolute;
    bottom: -40px;
    display: flex;
    width: 48px;
    height: 48px;
    justify-content: center;
    align-items: center;
    z-index: 2;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 4px;

    &.swiper-button-disabled {
      opacity: 0.3;
      pointer-events: none;
    }

    &:hover {
      transition: all 0.3s ease;
      background-color: rgb(66 84 102 / 0.5);
    }
  }

  .swiper-button-prev {
    left: 50%;
    transform: translateX(-66px);
    background-image: url("UiKit/assets/images/arrow-left-primary.svg?url");
    background-repeat: no-repeat;
    background-size: 24px;
    background-position: center;
  }

  .swiper-button-next {
    right: 50%;
    transform: translateX(66px);
    background-image: url("UiKit/assets/images/arrow-right-primary.svg?url");
    background-repeat: no-repeat;
    background-size: 24px;
    background-position: center;
  }
}

.swiper-slide {
  opacity: 0 !important;
}

.swiper-slide-active {
  opacity: 1 !important;
}

// effect fade
.swiper-fade {
  &.swiper-free-mode {
    .swiper-slide {
      transition-timing-function: ease-out;
    }
  }

  .swiper-slide {
    pointer-events: none;
    transition-property: opacity;

    .swiper-slide {
      pointer-events: none;
    }
  }

  .swiper-slide-active {
    &,
    & .swiper-slide-active {
      pointer-events: auto;
    }
  }
}
</style>
