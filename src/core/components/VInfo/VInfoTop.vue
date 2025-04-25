<script setup lang="ts">
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import { VDialogTrigger, VDialog } from 'UiKit/components/Base/VDialog';

defineProps({
  title: String,
  subtitle: String,
  text: String,
  tagText: String,
  buyNowHref: String,
  learnMoreHref: String,
});
const open = defineModel<boolean>();
</script>

<template>
  <div class="VInfoTop v-info-top with-default-distance">
    <VDialog
      v-model:open="open"
      class="VDialogTop v-dialog-top"
    >
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
            Buy Now
          </VButton>
          <VDialogTrigger>
            <VButton
              size="large"
              variant="link"
              class="is--margin-top-0"
            >
              Learn More
            </VButton>
          </VDialogTrigger>
        </slot>
      </div>
    </VDialog>
  </div>
</template>

<style lang="scss">
.v-info-top {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (max-width: $tablet){
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
    @media (max-width: 768px) {
      font-size: 24px;
      line-height: 32px;
    }
  }

  &__button-wrap {
    margin-top: 48px;
    gap: 16px;
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    flex-wrap: wrap;

    @media (max-width: 768px) {
      flex-direction: column;
      width: 100%;
    }
    @media screen and (max-width: $tablet){
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
