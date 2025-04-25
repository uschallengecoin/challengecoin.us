<script setup lang="ts">
import VSection from 'UiKit/components/VSection/VSection.vue';
import { computed } from 'vue';
import { links } from '@/config/links';

defineProps({
  title: String,
  pieces: String,
});
</script>

<template>
  <VSection class="VPreOrder v-pre-order with-default-distance">
    <h2 v-if="title" id="pre-order">
      {{ title }}
    </h2>
    <div class="v-pre-order__card is--margin-top-40">
      <div class="is--subheading-2">
        <slot />
        <div class="is--margin-top-8">
          <span class="is--display v-pre-order__display">
            {{ pieces }}
          </span>
          Pieces
        </div>
      </div>
      <VButton
        v-if="links.buyNow"
        as="a"
        :href="links.buyNow"
        size="large"
        class="is--margin-top-0"
      >
        Reserve Yours Now
      </VButton>
    </div>
  </VSection>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as *;
@use 'UiKit/styles/_mixins.scss' as *;
@use 'UiKit/styles/_variables.scss' as *;

.v-pre-order {
  text-align: center;

  &__card {
    position: relative;
    text-align: left;
    width: 100%;
    display: flex;
    padding: 80px;
    align-items: center;
    gap: 28px;
    justify-content: space-between;
    border-radius: 10px;
    background-color: $biege;
    background-size: contain;
    background-position: 100% 0;
    background-repeat: no-repeat;
    background-image: var(--bg-image);
    background-image: url('/images/home/coin6.webp');

    @media screen and (max-width: $desktop){
      flex-direction: column;
      padding: 48px;
      background-image: url('/images/home/coin10.webp');
      background-position: bottom right;
    }
  }

  &__display {
    @media screen and (max-width: $desktop){
      font-size: 36px;
      font-weight: 600;
      line-height: 46px;
    }
  }
}
</style>
