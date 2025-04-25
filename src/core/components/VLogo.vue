<script setup lang="ts">
import { computed } from 'vue';
import logoIcon from 'UiKit/assets/images/logo.svg?component';

const props = defineProps({
  disabled: Boolean,
  href: String,
  routeName: String,
});

const componentName = computed(() => {
  if (props.href) return 'a';
  if (props.routeName) return 'router-link';
  return 'span';
});
</script>

<template>
  <component
    :is="componentName"
    class="VLogo v-logo"
    :href="href"
    :to="{ name: routeName }"
    aria-label="Site logo"
    :class="{ 'is--link': href || routeName }"
  >
    <component
      :is="logoIcon"
      class="v-logo__desktop"
    />
    <component
      :is="logoIcon"
      class="v-logo__mobile"
    />
  </component>
</template>

<style lang="scss">
.v-logo {
  flex-shrink: 0;
  color: inherit;
  height: 100%;

  &.is--link {
    cursor: pointer;
  }

  &__desktop {
    height: 100%;
    color: inherit;
    width: auto;
    // @media screen and (max-width: 1024px) {
    //   display: none;
    // }
  }

  &__mobile {
    display: none;
    height: auto;
    color: inherit;
    @media screen and (min-width: 1024px) {
      display: none;
    }
  }
}
</style>
