<script setup lang="ts">
import VSection from 'UiKit/components/VSection/VSection.vue';
import VButton from 'UiKit/components/Base/VButton/VButton.vue';

defineProps({
  reverse: Boolean,
  buttonHref: String,
  buttonText: String,
});
</script>

<template>
  <VSection
    class="VSectionTwoColImageFullBackground v-section-two-col-image-full-background with-default-distance"
    :class="{ 'is--reverse': reverse }"
  >
    <div class="v-section-two-col-image-full-background__container is--gap-80">
      <slot />
    </div>
    <VButton
      v-if="buttonHref && buttonText"
      as="a"
      :href="encodeURI(buttonHref)"
      size="large"
      class="v-section-two-col-image-full-background__button"
    >
      {{ buttonText }}
    </VButton>
  </VSection>
</template>

<style lang="scss">
@use "UiKit/styles/_variables.scss" as *;

.v-section-two-col-image-full-background {
  $root: &;

  width: 100%;

  &__container {
    width: 100%;
    display: grid;
    grid-template-columns: calc(46.5% - 40px) calc(53.5% - 40px);
    // grid-template-columns: 2fr 3fr;
    position: relative;

    @media screen and (max-width: $tablet){
      display: flex;
      flex-direction: column;
    }

    & > div > p:first-of-type:not([class]) {
      font-family: $familyValue;
      font-size: 24px;
      font-style: normal;
      font-weight: 400;
      line-height: 32px;
      margin-bottom: 40px;
    }
  }

  &.is--reverse {
    .v-section-two-col-image-full-background__container {
      grid-template-columns: calc(51% - 40px) calc(49% - 40px);
    }
  }

  &__button {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
