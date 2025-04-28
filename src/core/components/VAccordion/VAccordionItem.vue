<script setup lang="ts">
import {
  VAccordionItem, VAccordionContent, VAccordionTrigger,
} from 'UiKit/components/Base/VAccordion';

defineProps({
  idx: [Number, String],
  trigger: String,
});
</script>

<template>
  <VAccordionItem
    :value="String(idx)"
    class="VAccordionItem v-accordion-item"
    itemscope
    itemprop="mainEntity"
    itemtype="https://schema.org/Question"
  >
    <VAccordionTrigger
      itemprop="name"
      class="v-accordion-item__title is--h5__title"
    >
      {{ trigger }}
    </VAccordionTrigger>
    <VAccordionContent
      itemscope
      itemprop="acceptedAnswer"
      itemtype="https://schema.org/Answer"
    >
      <p
        itemprop="text"
        class="v-accordion-item__content with-default-distance"
      >
        <slot />
      </p>
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
