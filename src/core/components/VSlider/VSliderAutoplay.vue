<script setup lang="ts">
import VSlider from './VSlider.vue';
import { ref, watch } from 'vue';
import { CarouselApi } from '../Base/VCarousel';
import VImage from 'UiKit/components/Base/VImage/VImage.vue';

// yarn add embla-carousel-autoplay
// yarn add embla-carousel-fade
const props = defineProps({
  paginationSrc: {
    type: String,
    default: '',
  },
  showPagination: {
    type: Boolean,
    default: true,
  },

  activecolor: {
    type: String,
    default: '#7A8450',
  },
});

const api = ref<CarouselApi>();
const slidesLength = ref(0);

function setApi(val: CarouselApi) {
  api.value = val;
  slidesLength.value = api.value?.slideNodes().length || 0;
}
const activeElementId = ref(0);

const changeSlide = (index: number) => {
  api.value?.scrollTo(index);
  api.value?.plugins()?.autoplay.reset();
};

watch(api, (value) => {
  if (!value) return;

  activeElementId.value = value.selectedScrollSnap();
  slidesLength.value = value?.slideNodes().length || 0;

  value.on('select', () => {
    activeElementId.value = value.selectedScrollSnap();
  });

  value.on('slidesInView', () => {
    slidesLength.value = value?.slideNodes().length || 0;
  });
});
</script>

<template>
  <div class="VSliderAutpoplay v-slider-autoplay">
    <VSlider
      variant="autoplay"
      :options="{ containScroll: 'trimSnaps', loop: true }"
      class="v-slider-autoplay__slider"
      @init-api="setApi"
    >
      <slot />
    </VSlider>
    <div
      v-if="showPagination"
      class="v-slider-autoplay__pagination"
    >
      <div
        v-for="(_, indexp) in slidesLength"
        :key="indexp"
        class="v-slider-autoplay__pagination-item-wrap"
        :class="{ 'is--active': indexp === activeElementId }"
        @click="changeSlide(indexp)"
      >
          <div
            class="v-slider-autoplay__pagination-item"
            :class="{ 'is--active': indexp === activeElementId }"
          />
          <slot name="pagination">
            <VImage
              v-if="paginationSrc"
              :src="paginationSrc"
              alt="coin image"
              class="v-slider-autoplay__pagination-image"
            :class="{ 'is--active': indexp === activeElementId }"
            />
          </slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
.v-slider-autoplay {
  $root: &;

  width: 100%;

  &__slider {
    margin: 0;
  }

  &__pagination {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 12px;
    justify-content: space-between;
    margin-top: 71px;

    @media screen and (max-width: $tablet){
      margin-top: 51px;
    }
  }

  &__pagination-item {
    width: 100%;
    height: 4px;
    background-color: v-bind(activecolor);
    opacity: 0.2;
    margin-bottom: 20px;

    &.is--active {
      opacity: 1;
    }
  }

  &__pagination-item-wrap {
    padding: 9px 0;
    cursor: pointer;
    width: 100%;
    flex: 1 1 auto;
  }

  &__pagination-image {
    width: 100%;
    height: 100%;
    max-width: 100px;
    max-height: 100px;
    aspect-ratio: 1/1;
    object-fit: cover;
    border-radius: 50%;
    margin: 0 auto;
    opacity: 0.2;

    &.is--active {
      opacity: 1;
    }
  }
}
</style>
