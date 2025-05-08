<script setup lang="ts">
import VDropdown from 'UiKit/components/VDropdown.vue';
import { useLangs } from 'UiKit/composables/useLang';

const { localeLinks, currentLang } = useLangs({ correspondingLink: true })

</script>

<template>
  <div
    class="VDropdownLanguages v-dropdown-languages"
  >
    <VDropdown
      v-bind="$attrs"
      :menu="localeLinks"
      with-chevron
    >
      <span class="is--small">
        {{ currentLang.label.slice(0, 3).toUpperCase() }}
      </span>
    </VDropdown>
  </div>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as *;

.v-dropdown-languages {
  min-width: 94px;
  color: $black;
  display: flex;
  justify-content: center;
}
</style>