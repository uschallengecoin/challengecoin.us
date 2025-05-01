<script setup lang="ts">
import { VAccordion } from 'UiKit/components/Base/VAccordion';
import VSection from 'UiKit/components/VSection/VSection.vue';

const props = defineProps({
  title: String,
});
</script>

<template>
  <VSection class="VSectionFaq v-section-faq">
    <h2
      v-if="title"
      id="faq"
      class="v-section-faq__title"
    >
      <a
        class="header-anchor"
        href="#faq"
      >
        {{ title }}
      </a>
    </h2>

    <VAccordion
      type="single"
      collapsible
      class="v-section-faq__accordion"
      itemscope
      itemtype="https://schema.org/FAQPage"
    >
      <slot />
    </VAccordion>
  </VSection>
</template>

<style lang="scss">
.v-section-faq {
  &__title {
    text-align: center;
  }

  &__accordion {
    max-width: 804px;
    margin: 40px auto 0;
  }
}
</style>
