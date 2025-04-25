<script setup lang="ts">
import vector from '@/assets/images/vector.svg?component';

defineProps({
  title: String,
  profession: String,
});

</script>

<template>
  <div class="VWhatOurClientsSayItem what-our-clients-say-item">
    <div class="what-our-clients-say-item__header">
      <vector class="what-our-clients-say-item__icon" />

      <div>
        <h5 v-if="title">
          {{ title }}
        </h5>
        <p v-if="profession" class="is--color-gray is--margin-top-8">
          {{ profession }}
        </p>
      </div>
    </div>
    <div class="what-our-clients-say-item__content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;

.what-our-clients-say-item{

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 28px;
  }

  &__icon {
    width: 78px;
    height: 56px;
    aspect-ratio: 39/28;
    color: colors.$primary-red;
  }

  &__content {
    font-size: 44px;
    font-style: normal;
    font-weight: 400;
    line-height: 60px;

    @media screen and (max-width: $tablet){
      font-size: 36px;
      line-height: 46px;
    }
  }
}
</style>
