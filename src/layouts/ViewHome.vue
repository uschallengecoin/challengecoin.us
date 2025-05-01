<script lang="ts">
import { useGlobalLoader } from 'UiKit/store/useGlobalLoader';
import { links } from '@/config/links';
</script>

<script setup lang="ts">
useGlobalLoader().hide();
</script>

<template>
  <div class="ViewHome view-home">
    <Content />
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
    bottom: 0;
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
