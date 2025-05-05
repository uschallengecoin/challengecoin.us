<script lang="ts">
import { useGlobalLoader } from 'UiKit/store/useGlobalLoader';
import { links } from '@/config/links';
import VSectionTopVideo from 'UiKit/components/VSectionTop/VSectionTopVideo.vue';
</script>

<script setup lang="ts">
useGlobalLoader().hide();
</script>

<template>
  <div class="ViewComingSoon view-coming-soon">
    <Content />
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
