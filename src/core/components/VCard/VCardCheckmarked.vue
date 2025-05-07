<script setup lang="ts">
import VTooltip from 'UiKit/components/VTooltip.vue';
import { PropType } from 'vue';
import CheckIcon from 'UiKit/assets/images/check.svg';
import { VCard } from 'UiKit/components/Base/VCard';

export interface ICheckmarkedItem {
  title: string;
  description: string;
}

defineProps({
  title: String,
  description: String,
  tooltip: String,
});
</script>

<template>
  <VCard
    class="VCardCheckmarked v-card-checkmarked "
  >
    <VTooltip
      :disabled="!tooltip"
    >
      <span class="v-card-checkmarked__top">
        <span
          class="v-card-checkmarked__icon-wrap"
        >
          <component
            :is="CheckIcon"
            class="v-card-checkmarked__icon"
          />
        </span>
        <span
          class="is--h5__title"
          itemprop="headline"
        >
          {{ title }}
        </span>
      </span>
      <template #content>
        <div v-html="tooltip" />
      </template>
    </VTooltip>
    <div
      class="v-card-checkmarked__bottom"
      itemprop="description"
    >
      <slot>
        {{ description }}
      </slot>
    </div>
  </VCard>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
@use 'UiKit/styles/_variables.scss' as variables;

.v-card-checkmarked {
  $root: &;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  box-shadow: none;

  &:not(.is--card) + &:not(.is--card){
    padding-top: 12px;
    margin-top: 12px;
  }

  &__top{
    display: flex;
    align-items: center;
    gap: 8px;
    align-self: stretch;
    text-align: initial;

    @media screen and (width < 767px){
      align-items: flex-start;
    }
  }

  &__icon{
    width: 22px;
    height: auto;
    color: colors.$primary-red;
  }

  &__icon-wrap{
    display: flex;
    margin-right: 5px;
    align-items: flex-start;
    gap: 10px;

    @media screen and (width < 767px){
      margin-top: 3px;
    }
  }

  &__bottom {
    color: colors.$dark-gray;
    margin-left: 35px;
  }

  .is--h5__title {
    margin-top: 0 !important;
    color: inherit;
  }
}
</style>
