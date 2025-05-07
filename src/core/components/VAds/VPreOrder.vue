<script setup lang="ts">
import VSection from 'UiKit/components/VSection/VSection.vue';
import { useBreakpoints } from 'UiKit/composables/useBreakpoints';
import { storeToRefs } from 'pinia';
import { useLazyBackground } from '@/core/composables/useLazyBackground';
import { useData } from 'vitepress';
import { computed } from 'vue';

const { isTablet } = storeToRefs(useBreakpoints());
useLazyBackground('v-pre-order__card', '/images/home/coin6.webp', { useVariable: true });

defineProps({
  title: String,
  display: String,
});

const { lang, site, theme } = useData();
const currentLocale = computed(() => (
  Object.values(site.value.locales).find((locale) => locale.lang === lang.value)));
</script>

<template>
  <VSection
    id="pre-order"
    class="VPreOrder v-pre-order with-default-distance"
  >
    <h2
      v-if="title"
      class="v-pre-order__title"
    >
      {{ title }}
    </h2>
    <div class="v-pre-order__card">
      <div class="is--subheading-2">
        <slot />
        <div class="is--margin-top-8">
          <span class="is--display v-pre-order__display">
            {{ display }}
          </span>
        </div>
      </div>
      <VButton
        v-if="theme.links.buyNow"
        as="a"
        :href="theme.links.buyNow"
        size="large"
        class="is--margin-top-0"
      >
        {{ isTablet ? currentLocale.home.buyNow : currentLocale.buyNowLong2 }}
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

  &__title {
    margin-bottom: 40px;
  }

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
    

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: var(--lazy-background-image);
      background-repeat: no-repeat;
      background-size: 57%;
      background-position: 133% 43%;
      opacity: 0.08;
      pointer-events: none;

      @media screen and (width < $tablet){
        background-size: 127%;
        background-position: -92% 41%;
      }
    }

    @media screen and (width < $desktop){
      flex-direction: column;
      padding: 48px;
    }
  }

  &__display {
    @media screen and (width < $desktop){
      font-size: 36px;
      font-weight: 600;
      line-height: 46px;
    }
  }
}
</style>
