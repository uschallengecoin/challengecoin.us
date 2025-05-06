import '@/assets/index.scss';
import type { Theme } from 'vitepress';
import { createPinia } from 'pinia';
import { defineAsyncComponent, hydrateOnVisible } from 'vue';
import AppLayoutDefault from '@/layouts/AppLayoutDefault.vue';

const VTooltip = defineAsyncComponent({
  loader: () => import(/*VTooltip*/'UiKit/components/VTooltip.vue'),
  hydrate: hydrateOnVisible(),
});

const VButton = defineAsyncComponent({
  loader: () => import(/*VButton*/'UiKit/components/Base/VButton/VButton.vue'),
  hydrate: hydrateOnVisible(),
});

const VBadge = defineAsyncComponent({
  loader: () => import(/*VBadge*/'UiKit/components/Base/VBadge/VBadge.vue'),
  hydrate: hydrateOnVisible(),
});

// const VInfoHero = defineAsyncComponent({
//   loader: () => import('UiKit/components/VInfo/VInfoHero.vue'),
//   // hydrate: hydrateOnVisible(),
// });
import VInfoHero from /*VInfoHero*/'UiKit/components/VInfo/VInfoHero.vue';

// const VSectionTopVideo = defineAsyncComponent({
//   loader: () => import('UiKit/components/VSectionTop/VSectionTopVideo.vue'),
//   // hydrate: hydrateOnVisible(),
// });
import VSectionTopVideo from 'UiKit/components/VSectionTop/VSectionTopVideo.vue';

const VSectionTopComingSoon = defineAsyncComponent({
  loader: () => import('UiKit/components/VSectionTop/VSectionTopComingSoon.vue'),
  // hydrate: hydrateOnVisible(),
});
// import VSectionTopComingSoon from 'UiKit/components/VSectionTop/VSectionTopComingSoon.vue';

// const VSlider = defineAsyncComponent({
//   loader: () => import('UiKit/components/VSlider/VSlider.vue'),
//   // hydrate: hydrateOnVisible(),
// });
import VSlider from 'UiKit/components/VSlider/VSlider.vue';

const VSliderAutoplay = defineAsyncComponent({
  loader: () => import('UiKit/components/VSlider/VSliderAutoplay.vue'),
  hydrate: hydrateOnVisible(),
});

// const VCarouselItem = defineAsyncComponent({
//   loader: () => import('UiKit/components/Base/VCarousel/VCarouselItem.vue'),
//   // hydrate: hydrateOnVisible(),
// });
import VCarouselItem from 'UiKit/components/Base/VCarousel/VCarouselItem.vue';

const VDialogTop = defineAsyncComponent({
  loader: () => import('UiKit/components/VSectionTop/VDialogTop.vue'),
  hydrate: hydrateOnVisible(),
});

const VSectionTwoColImageFullBackground = defineAsyncComponent({
  loader: () => import('UiKit/components/VSection/VSectionTwoColImageFullBackground.vue'),
  hydrate: hydrateOnVisible(),
});

const VSectionLegacy = defineAsyncComponent({
  loader: () => import('UiKit/components/VSection/VSectionLegacy.vue'),
  hydrate: hydrateOnVisible(),
});

const VHowItWorks = defineAsyncComponent({
  loader: () => import('UiKit/components/VAds/VHowItWorks.vue'),
  hydrate: hydrateOnVisible(),
});

const VCardDefault = defineAsyncComponent({
  loader: () => import('UiKit/components/VCard/VCardDefault.vue'),
  hydrate: hydrateOnVisible(),
});

const VSectionWhyOwn = defineAsyncComponent({
  loader: () => import('UiKit/components/VSection/VSectionWhyOwn.vue'),
  hydrate: hydrateOnVisible(),
});

const VSectionFaq = defineAsyncComponent({
  loader: () => import('UiKit/components/VSection/VSectionFaq.vue'),
  hydrate: hydrateOnVisible(),
});

const VCardCheckmarked = defineAsyncComponent({
  loader: () => import('UiKit/components/VCard/VCardCheckmarked.vue'),
  hydrate: hydrateOnVisible(),
});

const VSubscribe = defineAsyncComponent({
  loader: () => import('UiKit/components/VAds/VSubscribe.vue'),
  hydrate: hydrateOnVisible(),
});

const VPreOrder = defineAsyncComponent({
  loader: () => import('UiKit/components/VAds/VPreOrder.vue'),
  hydrate: hydrateOnVisible(),
});

const VSectionWhatOurClientsSay = defineAsyncComponent({
  loader: () => import('UiKit/components/VWhatOurClientsSay/VSectionWhatOurClientsSay.vue'),
  hydrate: hydrateOnVisible(),
});

const VWhatOurClientsSayItem = defineAsyncComponent({
  loader: () => import('UiKit/components/VWhatOurClientsSay/VWhatOurClientsSayItem.vue'),
  hydrate: hydrateOnVisible(),
});

const VAccordionItem = defineAsyncComponent({
  loader: () => import('UiKit/components/VAccordion/VAccordionItem.vue'),
  hydrate: hydrateOnVisible(),
});

export default {
  Layout: AppLayoutDefault,
  enhanceApp({ app, router, siteData }) {
    const pinia = createPinia();
    app.use(pinia);
    app.component('VTooltip', VTooltip);
    app.component('VButton', VButton);
    app.component('VBadge', VBadge);
    app.component('VInfoHero', VInfoHero);
    app.component('VSectionTopVideo', VSectionTopVideo);
    app.component('VSlider', VSlider);
    app.component('VCarouselItem', VCarouselItem);
    app.component('VDialogTop', VDialogTop);
    app.component('VSectionTwoColImageFullBackground', VSectionTwoColImageFullBackground);
    app.component('VSectionLegacy', VSectionLegacy);
    app.component('VHowItWorks', VHowItWorks);
    app.component('VCardDefault', VCardDefault);
    app.component('VSectionWhyOwn', VSectionWhyOwn);
    app.component('VCardCheckmarked', VCardCheckmarked);
    app.component('VSubscribe', VSubscribe);
    app.component('VSectionWhatOurClientsSay', VSectionWhatOurClientsSay);
    app.component('VWhatOurClientsSayItem', VWhatOurClientsSayItem);
    app.component('VSliderAutoplay', VSliderAutoplay);
    app.component('VPreOrder', VPreOrder);
    app.component('VSectionFaq', VSectionFaq);
    app.component('VAccordionItem', VAccordionItem);
    app.component('VSectionTopComingSoon', VSectionTopComingSoon);
  },
} satisfies Theme;
