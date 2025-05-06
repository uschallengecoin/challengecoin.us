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
      loading="lazy"
    />
    <h2
      v-if="title1 || title2"
      class="is--color-green v-section-legacy__title is--margin-top-0"
    >
      <span
        v-if="title1"
        class="v-section-legacy__title1"
      >{{ title1 }}</span> <br>
      <span
        v-if="title2"
        class="v-section-legacy__title2"
      >{{ title2 }}</span>
    </h2>
    <div class="v-section-legacy__bottom is--margin-top-0">
      <VImage
        :src="images[1]"
        alt="Legacy bottom left image"
        class="v-section-legacy__bottom-image is--margin-top-0"
        fit="cover"
        loading="lazy"
      />
      <VImage
        :src="images[2]"
        alt="Legacy bottom right image"
        class="v-section-legacy__bottom-image is--margin-top-0"
        fit="cover"
        loading="lazy"
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

  &__bottom-image {
    aspect-ratio: 262/270;
  }

  &__bottom {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    width: 100%;
  }

  &__title {
    width: 100%;

    @media screen and (width < $tablet){
      max-width: 345px;
      margin: 0 auto;
    }
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
