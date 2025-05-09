<script setup lang="ts">
import {
  computed,
  defineAsyncComponent, ref,
  watchPostEffect,
} from 'vue';
import { useWindowScroll } from '@vueuse/core';
import VLogo from 'UiKit/components/VLogo.vue';
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import shareIcon from '@/assets/images/social/share.svg';
import { useDialogs } from 'UiKit/store/useDialogs';
import VDropdownLanguages from 'UiKit/components/VDropdownLanguages.vue';
import { useData } from 'vitepress';

const VHeaderMobile = defineAsyncComponent({
  loader: () => import('./VHeaderMobile.vue'),
});

defineProps({
  showNavigation: {
    type: Boolean,
    default: true,
  },
  hideLanguages: {
    type: Boolean,
    default: false,
  },
  path: String,
});

const emit = defineEmits(['click']);
const { lang, site } = useData();
const currentLocale = computed(() => (
  Object.values(site.value.locales).find((locale) => locale.lang === lang.value)));

const { y } = useWindowScroll();
const isFixed = ref(false);
const isMobileSidebarOpen = defineModel<boolean>();

const onShareClick = () => {
  useDialogs().showDialogShare();
};

watchPostEffect(() => {
  if (y.value > 0) {
    isFixed.value = true;
  } else {
    isFixed.value = false;
  }
});
</script>

<template>
  <header
    class="VHeader v-header"
    :class="{ 'is--fixed': isFixed }"
  >
    <div class="is--container v-header__container">
      <VLogo
        href="/"
        class="v-header__logo"
      />

      <ClientOnly>
        <div class="v-header__right ">
          <VButton
            :key="currentLocale.share.button"
            variant="link"
            class="is--gt-tablet-show"
            @click="onShareClick"
          >
            <shareIcon />
            {{ currentLocale.share.button }}
          </VButton>

          <VDropdownLanguages 
            :class="{ 'is--gt-tablet-show' : hideLanguages }"
          />

          <VHeaderMobile
            v-if="showNavigation"
            v-model="isMobileSidebarOpen"
          >
            <slot name="mobile" />
          </VHeaderMobile>
        </div>
      </ClientOnly>
    </div>
  </header>
</template>

<style lang="scss">
.v-header {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 100;
  height: $header-height;

  &.is--fixed {
    background: rgb(252 252 252 / 0.9);
    box-shadow: 0 4px 12px 0 rgb(0 0 0 / 0.04);
  }

  @include media-lte(desktop-md) {
    box-shadow: $box-shadow-small;
  }

  @include media-lte(tablet) {
    height: $header-height-mobile
  }

  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    position: relative;
  }

  &__logo {
    display: flex;
    align-items: center;
    margin-right: 55px;
    max-height: 44px;
    height: 100%;
    width: 100%;
    object-fit: contain;

    @include media-lte(desktop-lg) {
      margin-right: 30px;
      max-height: 30px;
    }
  }

  &__right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: 1;
    height: 100%;
    gap: 20px;
  }

  &__data {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 12px;
  }
}
</style>
