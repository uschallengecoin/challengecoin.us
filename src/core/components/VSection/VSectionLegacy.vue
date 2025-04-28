<script setup lang="ts">
import VImage from 'UiKit/components/Base/VImage/VImage.vue';

const props = defineProps({
  images: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  title1: String,
  title2: String,
});
</script>

<template>
  <section class="VSectionLegacy v-section-legacy">
    <VImage
      :src="images[0]"
      alt="Legacy hero image"
      class="v-section-legacy__hero-image is--margin-top-0"
      fit="cover"
    />
    <h2 v-if="title1 || title2" class="is--color-green v-section-legacy__title is--margin-top-0">
      <span v-if="title1" class="v-section-legacy__title1">{{ title1 }}</span> <br/>
      <span v-if="title2" class="v-section-legacy__title2">{{ title2 }}</span>
    </h2>
    <div class="v-section-legacy__bottom is--margin-top-0">
      <VImage
        :src="images[1]"
        alt="Legacy bottom left image"
        class="v-section-legacy__bottom-left is--margin-top-0"
        fit="cover"
      />
      <VImage
        :src="images[2]"
        alt="Legacy bottom right image"
        class="v-section-legacy__bottom-right is--margin-top-0"
        fit="cover"
      />
    </div>
  </section>
</template>

<style lang="scss">
.v-section-legacy {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 48px;
  flex: 1 0 0;
  justify-content: center;

  &__hero-image {
    width: 100%;
    aspect-ratio: 348/219;
  }

  &__bottom-left {
    aspect-ratio: 128/158;
  }

  &__bottom-right {
    aspect-ratio: 238/158;
  }

  &__bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
    gap: 30px;
    width: calc(47vw - 40px);
    position: relative;
    left: calc(-47vw + 100% + 40px);

    @media screen and (width < $tablet){
      width: calc(100vw - 25px);
      left: -25px;
    }
  }

  &__title {
    width: 100%;
  }

  &__title1 {
    text-align: start;
    margin-left: 10%;

    @media screen and (width < $desktop){
      margin-left: 0;
    }
  }

  &__title2 {
    text-align: end;
    margin-right: 10%;
    float: right;

    @media screen and (width < $desktop){
      margin-right: 0;
    }
  }
}
</style>
