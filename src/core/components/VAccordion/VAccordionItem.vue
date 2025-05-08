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
    <div
      itemscope
      itemprop="acceptedAnswer"
      itemtype="https://schema.org/Answer"
      class="v-accordion-item__content-hidden with-default-distance"
    >
      <div itemprop="text">
        <slot />
      </div>
    </div>
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
    color: $dark-gray;
  }

  &__content-hidden {
    display: none;
  }
}
</style>
