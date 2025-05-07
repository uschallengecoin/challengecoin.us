<script setup lang="ts">
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import { useData } from 'vitepress';
import { computed } from 'vue';

defineProps({
  title: String,
  subtitle: String,
  text: String,
  tagText: String,
  buyNowHref: String,
  learnMoreHref: String,
});

const emit = defineEmits(['learnMore']);
const { lang, site } = useData();
const currentLocale = computed(() => (
  Object.values(site.value.locales).find((locale) => locale.lang === lang.value)));

const onLearnMore = () => {
  emit('learnMore');
};
</script>

<template>
  <div class="VInfoTop v-info-top with-default-distance">
    <div class="v-info-top__text">
      <slot>
        <h1
          v-if="title"
        >
          {{ title }}
        </h1>
        <div
          v-if="subtitle"
          class="is--subheading-1"
        >
          {{ subtitle }}
        </div>
      </slot>
    </div>
    <div class="v-info-top__button-wrap">
      <slot name="buttons">
        <VButton
          as="a"
          :href="encodeURI(buyNowHref)"
          size="large"
          class="is--margin-top-0"
        >
          {{ currentLocale.home.buyNow || 'Buy Now' }}
        </VButton>
        <VButton
          size="large"
          variant="link"
          class="is--margin-top-0"
          @click="onLearnMore"
        >
          {{ currentLocale.home.learnMore || 'Learn More' }}
        </VButton>
      </slot>
    </div>
  </div>
</template>

<style lang="scss">
.v-info-top {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (width < $tablet){
    justify-content: center;
  }

  &__text {
    text-align: left;
  }

  p {
    font-size: 28px;
    font-style: normal;
    font-weight: 400;
    line-height: 36px;

    @media (width < 768px) {
      font-size: 24px;
      line-height: 32px;
    }
  }

  &__button-wrap {
    margin-top: 48px;
    gap: 16px;
    display: flex;
    align-items: flex-start;
    flex-flow: row wrap;

    @media (width < 768px) {
      flex-direction: column;
      width: 100%;
    }

    @media screen and (width < $tablet){
      gap: 12px;
      align-items: end;
      flex-direction: row;
      margin-top: 40px;
    }
  }

  a:not([class]) {
    margin-top: 0 !important;
  }
}
</style>
