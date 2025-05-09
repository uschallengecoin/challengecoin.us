<script setup lang="ts">
import {
  computed, defineAsyncComponent, hydrateOnVisible, onMounted,
  onUnmounted, ref,
} from 'vue';
import VLoader from 'UiKit/components/VLoader.vue';
import { useData } from 'vitepress';
import { data as allPages } from '@/store/all.data';
import { convertPages } from 'UiKit/types/pages';
import { useGlobalLoader } from 'UiKit/store/useGlobalLoader';
import { storeToRefs } from 'pinia';
import VButton from 'UiKit/components/Base/VButton/VButton.vue';

const VHeader = defineAsyncComponent({
  loader: () => import('UiKit/components/VHeader/VHeader.vue'),
  hydrate: hydrateOnVisible(),
});
const VFooter = defineAsyncComponent({
  loader: () => import('UiKit/components/VFooter/VFooter.vue'),
  hydrate: hydrateOnVisible(),
});

const ViewHome = defineAsyncComponent(() => import('@/layouts/ViewHome.vue'));
const ViewComingSoon = defineAsyncComponent(() => import('@/layouts/ViewComingSoon.vue'));
const DefaultContent = defineAsyncComponent(() => import('@/layouts/DefaultContent.vue'));
const ViewErrors = defineAsyncComponent(() => import('UiKit/components/VPage/VErrorPage/VErrorPageNotFound404.vue'));

const VToaster = defineAsyncComponent(() => import(
  'UiKit/components/Base/VToast/VToaster.vue'
));
const VDialogs = defineAsyncComponent(() => import(
  'UiKit/components/VDialogs.vue'
));

const { page, frontmatter, theme, site, lang } = useData();
const pages = convertPages(allPages);
const currentLocale = computed(() => (
  Object.values(site.value.locales).find((locale) => locale.lang === lang.value)));

theme.navigation = {
  root: pages,
};


const isComingSoon = computed(() => {
  return frontmatter.value.layout === 'coming-soon'
});
const isFontLoaded = ref(false);
const globalLoader = useGlobalLoader();
const { isLoading: globalLoaderisLoading } = storeToRefs(globalLoader);
const showLoader = computed(() => globalLoaderisLoading.value || !isFontLoaded.value);
const showHeader = computed(() => true);
const showMenu = computed(() => !isComingSoon.value);
const hideLanguages = computed(() => !isComingSoon.value);
const showFooter = computed(() => !isComingSoon.value);
globalLoader.toggle(true);

const checkIfFontLoaded = async () => {
  if (document?.fonts) {
    await document.fonts.ready.then(() => {
      setTimeout(() => {
        isFontLoaded.value = true;
      }, 1000);
    });
  } else {
    setTimeout(() => {
      isFontLoaded.value = true;
    }, 1000);
  }
};

function handleLinkClick(event: MouseEvent) {
  const target = event.target as HTMLElement;
  const link = target.closest('a') as HTMLAnchorElement | null;

  if (link) {
    const href = link.getAttribute('href') || '';

    if (href === window.location.pathname) return;

    if (href.startsWith('/') || href.startsWith(window.location.origin)) {
      globalLoader.show();
    }
  }
}

onMounted(() => {
  // https://github.com/webdevelop-pro/dashboard.webdevelop.biz/issues/938
  if (typeof window !== 'undefined') {
    const oldErr = console.error;
    console.error = function () {
      // /assets/chunks/ViewErrors.B98_KOXD.js
      if (arguments.length > 0) {
        const msg = arguments[0].toString();
        if (
          msg.indexOf('Failed to fetch dynamically imported module:') !== -1
            && msg.indexOf('/assets/chunks/') !== -1
            && msg.indexOf('.js') !== -1) {
          window.location.reload();
        }
      } else {
        oldErr(arguments);
      }
    };
    // console.log(arguments);
    // err(arguments);
  }
  void checkIfFontLoaded();
  document.addEventListener('click', handleLinkClick);
});

onUnmounted(() => {
  document.removeEventListener('click', handleLinkClick);
});
</script>

<template>
  <div class="AppLayoutDefault app-layout-default">
    <transition name="transition-fade-out">
      <VLoader v-if="showLoader" />
    </transition>
    <VHeader
      v-if="showHeader"
      :hide-languages="hideLanguages"
      :show-navigation="showMenu"
    >
      <template #mobile>
        <VButton
          as="a"
          :href="encodeURI(theme.links.buyNow)"
          size="large"
        >
          {{ currentLocale.buyNowLong2 }}
        </VButton>
      </template>
    </VHeader>

    <main class="app-layout-default__main is--markdown">
      <ViewErrors
        v-if="page.isNotFound"
      />
      <ViewHome v-else-if="frontmatter.layout === 'home'" />
      <ViewComingSoon v-else-if="isComingSoon" />
      <DefaultContent
        v-else
        class="is--content is--container is--page"
      >
        <Content />
        <!-- if we use somewhere Content it is mandatory to wrap it in container with class 'is--markdown'-->
      </DefaultContent>
    </main>

    <footer class="app-layout-default__footer">
      <VFooter v-if="showFooter" />
    </footer>

    <ClientOnly>
      <VDialogs />
      <VToaster />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.app-layout-default {
  position: relative;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  min-height: 100%;

  &__main {
    display: flex;
    flex-grow: 1;
    flex-wrap: wrap;
    width: 100%;
    background: $white;
    min-height: 50vh;
    position: relative;

    > * {
      width: 100%;
    }
  }

  .is--content {
    width: 100%;
  }

  &__footer {
    width: 100%;
    margin-top: 0 !important;
  }
}
</style>
