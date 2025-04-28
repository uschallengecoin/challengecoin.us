<script setup lang="ts">
import {
  VAccordionItem, VAccordionContent, VAccordionTrigger,
} from 'UiKit/components/Base/VAccordion';

defineProps({
  idx: Number || String,
  trigger: String,
});
</script>

<template>
  <VAccordionItem
    :value="String(idx)"
    transparent
    class="VAccordionItem v-accordion-item"
  >
    <VAccordionTrigger
      class="v-accordion-item__title is--h5__title"
    >
      {{ trigger }}
    </VAccordionTrigger>
    <VAccordionContent
      class="v-accordion-item__content with-default-distance"
    >
      <slot />
    </VAccordionContent>
  </VAccordionItem>
</template>

<style lang="scss">
.v-accordion-item {
  &__content {
    color: $gray;
  }
}
</style>
