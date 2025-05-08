<script lang="ts" setup>
defineProps({
  hasAsterisk: Boolean,
});
</script>

<template>
  <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
  <label
    v-bind="$attrs"
    class="VFormlabel v-form-label is--h5__title"
  >
    <slot />

    <span
      v-if="hasAsterisk"
      class="v-form-label__required"
    >
      *
    </span>
  </label>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;

.v-form-label{
  color: inherit;
  display: inline-block;
  position: relative;

  &__required {
    color: colors.$red;
  }
}
</style>
