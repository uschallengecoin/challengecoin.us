<script setup lang="ts">
import VDropdown from 'UiKit/components/VDropdown.vue';
import { useData } from 'vitepress';
import { computed } from 'vue';

const { site, lang } = useData();
console.log(useData())

const currentLanguage = computed(() => lang.value || 'en');
const locales = computed(() => site.value.locales);
const currentLocale = computed(() => {
  const languageKey = lang.value || currentLanguage.value;
  const locale = Object.values(locales.value).find((locale) => locale.lang === languageKey);
  return locale?.label || '';
});
const localesMenu = computed(() => {
  const menu = [];
  Object.keys(locales.value).forEach((key) => {
      menu.push({
        text: locales.value[key].label,
        href: `/${locales.value[key].lang}/`,
        active: locales.value[key].lang === currentLanguage.value,
      });
  });
  return menu;
});
</script>

<template>
  <div
    class="VDropdownLanguages v-dropdown-languages"
  >
    <VDropdown
      v-bind="$attrs"
      :menu="localesMenu"
      with-chevron
    >
      <span class="is--small">
        {{ currentLocale.slice(0, 3).toUpperCase() }}
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