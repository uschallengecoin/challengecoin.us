<script setup lang="ts">
import {
  VCard, VCardContent, VCardHeader, VCardDescription, VCardFooter, VCardTitle,
} from 'UiKit/components/Base/VCard';
import VSeparator from 'UiKit/components/Base/VSeparator/VSeparator.vue';

defineProps({
  title: String,
});
</script>

<template>
  <VCard
    variant="primary"
    class="VCardDefault v-card-default"
  >
    <VCardHeader v-if="title">
      <VCardTitle class="is--color-green">
        {{ title }}
      </VCardTitle>
      <VSeparator />
    </VCardHeader>
    <VCardContent class="v-card-default__content with-default-distance">
      <slot />
    </VCardContent>
  </VCard>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;

.v-card-default {
  $root: &;

  &__content {
    position: relative;
  }
}
</style>
