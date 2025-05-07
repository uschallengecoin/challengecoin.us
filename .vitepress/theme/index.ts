import '@/assets/index.scss';
import type { Theme } from 'vitepress';
import { createPinia } from 'pinia';
import { defineAsyncComponent, hydrateOnVisible } from 'vue';
import AppLayoutDefault from '@/layouts/AppLayoutDefault.vue';

const VButton = defineAsyncComponent({
  loader: () => import(/*VButton*/'UiKit/components/Base/VButton/VButton.vue'),
  hydrate: hydrateOnVisible(),
});


export default {
  Layout: AppLayoutDefault,
  enhanceApp({ app, router, siteData }) {
    const pinia = createPinia();
    app.use(pinia);
    app.component('VButton', VButton);
  },
} satisfies Theme;
