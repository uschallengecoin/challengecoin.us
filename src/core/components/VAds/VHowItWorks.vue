<script setup lang="ts">
import VImage from 'UiKit/components/Base/VImage/VImage.vue';
import VSection from 'UiKit/components/VSection/VSection.vue';

defineProps({
  title: String,
});
</script>

<template>
  <VSection class="VHowItWorks v-how-it-works is--margin-top-150">
    <h2
      v-if="title"
      id="how-it-works"
    >
      {{ title }}
    </h2>
    <div
      class="is--three-col-grid"
      :class="{ 'is--margin-top-40': title }"
    >
      <slot />
    </div>
  </VSection>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as *;
@use 'UiKit/styles/_mixins.scss' as *;
@use 'UiKit/styles/_variables.scss' as *;

.v-how-it-works {
  text-align: center;
}
</style>
