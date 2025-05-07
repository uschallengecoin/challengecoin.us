<script lang="ts">
import { useGlobalLoader } from 'UiKit/store/useGlobalLoader';
import { data } from '@/store/home.data';
import VInfoHero from /*VInfoHero*/'UiKit/components/VInfo/VInfoHero.vue';
import VCarouselItem from /*VCarouselItem*/'UiKit/components/Base/VCarousel/VCarouselItem.vue';
import VSectionTopVideo from /*VSectionTopVideo*/'UiKit/components/VSectionTop/VSectionTopVideo.vue';
import VSlider from /*VSlider*/'UiKit/components/VSlider/VSlider.vue';
import {
  defineAsyncComponent, hydrateOnVisible, onBeforeUnmount, onMounted, ref, computed,
} from 'vue';
import { useData } from 'vitepress';

const VDialog = defineAsyncComponent({
  loader: () => import('UiKit/components/VDialogs/VDialog.vue'),
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
const VCardCheckmarked = defineAsyncComponent({
  loader: () => import('UiKit/components/VCard/VCardCheckmarked.vue'),
  hydrate: hydrateOnVisible(),
});
const VSubscribe = defineAsyncComponent({
  loader: () => import('UiKit/components/VAds/VSubscribe.vue'),
  hydrate: hydrateOnVisible(),
});
const VSectionWhatOurClientsSay = defineAsyncComponent({
  loader: () => import('UiKit/components/VWhatOurClientsSay/VSectionWhatOurClientsSay.vue'),
  hydrate: hydrateOnVisible(),
});
const VSliderAutoplay = defineAsyncComponent({
  loader: () => import('UiKit/components/VSlider/VSliderAutoplay.vue'),
  hydrate: hydrateOnVisible(),
});
const VWhatOurClientsSayItem = defineAsyncComponent({
  loader: () => import('UiKit/components/VWhatOurClientsSay/VWhatOurClientsSayItem.vue'),
  hydrate: hydrateOnVisible(),
});
const VPreOrder = defineAsyncComponent({
  loader: () => import('UiKit/components/VAds/VPreOrder.vue'),
  hydrate: hydrateOnVisible(),
});
const VSectionFaq = defineAsyncComponent({
  loader: () => import('UiKit/components/VSection/VSectionFaq.vue'),
  hydrate: hydrateOnVisible(),
});
const VAccordionItem = defineAsyncComponent({
  loader: () => import('UiKit/components/VAccordion/VAccordionItem.vue'),
  hydrate: hydrateOnVisible(),
});
const VButton = defineAsyncComponent({
  loader: () => import(/*VButton*/'UiKit/components/Base/VButton/VButton.vue'),
  hydrate: hydrateOnVisible(),
});

</script>

<script setup lang="ts">
useGlobalLoader().hide();
const { lang, theme, site } = useData();
const currentLanguage = computed(() => lang.value || 'en');
const currentLocale = computed(() => (
  Object.values(site.value.locales).find((locale) => locale.lang === lang.value)));

const languageData = computed(() => data[currentLanguage.value] || data['en']);

const heroSlides = computed(() => languageData.value?.filter((item) => item.slug === 'heroSlide'));
const heroDialogs = computed(() => languageData.value?.filter((item) => item.slug === 'heroDialog'));
const legacy = computed(() => languageData.value?.find((item) => item.slug === 'legacy'));
const engraver = computed(() => languageData.value?.find((item) => item.slug === 'dialogEngraver'));
const howItWorksList = computed(() => languageData.value?.filter((item) => item.slug === 'howItWorks'));
const whyOwn = computed(() => languageData.value?.find((item) => item.slug === 'whyOwn'));
const whyOwnList = computed(() => languageData.value?.filter((item) => item.slug === 'whyOwnList'));
const subscribe = computed(() => languageData.value?.find((item) => item.slug === 'subscribe'));
const testimonials = computed(() => languageData.value?.find((item) => item.slug === 'testimonials'));
const testimonialsList = computed(() => languageData.value?.filter((item) => item.slug === 'testimonialsList'));
const preOrder = computed(() => languageData.value?.find((item) => item.slug === 'preOrder'));
const faq = computed(() => languageData.value?.find((item) => item.slug === 'faq'));
const faqList = computed(() => languageData.value?.filter((item) => item.slug === 'faqList'));

const dialogOpen = defineModel<boolean>();
const dialogData = ref();
const savedDialogValue = ref<string | null>(null);

const onLearnMore = (dialogId: string) => {
  dialogData.value = heroDialogs.value.find((item) => item.dialogId === dialogId);
  dialogOpen.value = true;
};

const handleDialogAttributeClick = (event: Event) => {
  const target = event.target as HTMLElement;
    if (target.hasAttribute('dialog')) {
      savedDialogValue.value = target.getAttribute('dialog');
      if (savedDialogValue.value?.toLowerCase() === 'engraver') {
        dialogData.value = engraver.value;
        dialogOpen.value = true;
      }
    }
}

onMounted(() => {
  document.addEventListener('click', handleDialogAttributeClick);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDialogAttributeClick);
});
</script>

// TODO sanityze html
<template>
  <div class="ViewHome view-home">
    <!-- Start Top Video -->
    <VSectionTopVideo
      id="hero"
      full-height
      video-src="/video/video-bg.mp4"
    >
      <VSlider
        autoplay
        fade
        :options="{ containScroll: 'trimSnaps', loop: true }"
      >
        <VCarouselItem
          v-for="(item, index) in heroSlides"
          :key="index + item.dialogId"
        >
          <VInfoHero
            :image-src="item.image"
            :image-mobile-src="item.imageMobile"
            :buy-now-href="theme.links.buyNow"
            @learn-more="onLearnMore(item.dialogId)"
          >
            <div v-html="item.html" />
          </VInfoHero>
        </VCarouselItem>
      </VSlider>
    </VSectionTopVideo>
    <!-- End Top Video -->

    <!-- Start Legacy -->
    <VSectionTwoColImageFullBackground
      id="legacy"
      :button-href="theme.links.buyNow"
      :button-text="currentLocale?.home.buyNowLong"
      :button-text-mobile="currentLocale?.home.buyNow"
      class="is--margin-top-150"
    >
      <VSectionLegacy
        :title1="legacy?.title1"
        :title2="legacy?.title2"
        :images="legacy?.images"
      />
      <div
        style="position: relative; align-self: center;"
        v-html="legacy.html"
      />
    </VSectionTwoColImageFullBackground>
    <!-- End Legacy -->

    <!-- Start How It Works -->
    <VHowItWorks
      :title="currentLocale?.home?.howItWorksTitle"
    >
      <VCardDefault
        v-for="(item, index) in howItWorksList"
        :key="index + item.title"
        :title="item.title"
      >
        <div v-html="item.html" />
      </VCardDefault>
    </VHowItWorks>
    <!-- End How It Works -->

    <!-- Start Why Own -->
    <VSectionWhyOwn
      id="why-own-u-s-challenge-coin"
      :image="whyOwn?.image"
      :image-mobile="whyOwn?.imageMobile"
      :button-text="currentLocale?.home.buyNow"
      class="is--paddings"
    >
      <div
        class="is--margin-bottom-40"
        v-html="whyOwn?.html"
      />
      <VCardCheckmarked
        v-for="(item, index) in whyOwnList"
        :key="index + item.title"
        :title="item.title"
      >
        <div v-html="item.html" />
      </VCardCheckmarked>
    </VSectionWhyOwn>
    <!-- End Why Own -->

    <!-- Start Subscribe -->
    <VSubscribe id="be-part-of-something-bigger">
      <div v-html="subscribe?.html" />
    </VSubscribe>
    <!-- End Subscribe -->

    <!-- Start Testimonials -->
    <VSectionWhatOurClientsSay
      id="voices-of-honor"
      class="is--margin-top-150"
    >
      <div v-html="testimonials?.html" />
      <VSliderAutoplay pagination-src="/images/home/coin5.webp">
        <VCarouselItem
          v-for="(item, index) in testimonialsList"
          :key="index + item.title"
        >
          <VWhatOurClientsSayItem
            :title="item.title"
            :profession="item.profession"
          >
            <div v-html="item.html" />
          </VWhatOurClientsSayItem>
        </VCarouselItem>
      </VSliderAutoplay>
    </VSectionWhatOurClientsSay>
    <!-- End Testimonials -->

    <!-- Start Pre Order -->
    <VPreOrder
      :title="preOrder?.title"
      :display="preOrder?.display"
      class="is--margin-top-150"
    >
      <div v-html="preOrder.html" />
    </VPreOrder>
    <!-- End Pre Order -->

    <!-- Start faq-->
    <VSectionFaq
      :title="faq?.title"
      class="is--margin-top-150"
    >
      <VAccordionItem
        v-for="(item, index) in faqList"
        :key="index"
        :trigger="item?.trigger"
        :idx="index"
      >
        <div v-html="item.html" />
      </VAccordionItem>
    </VSectionFaq>
    <!-- End faq-->

    <div class="is--paddings view-home__button">
      <VButton
        as="a"
        :href="encodeURI(theme.links.buyNow)"
        size="large"
      >
        {{ currentLocale?.buyNowLong2 }}
      </VButton>
    </div>
  </div>

  <ClientOnly>
    <VDialog
      v-model="dialogOpen"
      :data="dialogData?.html"
      :background-image-src="dialogData?.image"
      class="view-home__dialog"
    />
  </ClientOnly>
</template>

<style lang="scss">
@use "UiKit/styles/_variables.scss" as *;

.view-home {
  overflow: hidden;

  .v-slider {
    width: 100%;
    margin: 0;
    display: flex;
    flex-direction: column-reverse;
  }

  .v-slider__prev,
  .v-slider__next {
    bottom: -48px;
    top: auto;
    right: 50%;
    z-index: 1;
  }

  .v-slider__prev {
    transform: translateX(-18px);
  }

  .v-slider__next {
    transform: translateX(68px);
  }

  .v-info-hero {
    height: 100%;
  }

  .v-carousel-item {
    // height: 100%;
    flex: 0 0 100%;
  }

  &__button {
    text-align: center;
  }
}
</style>
