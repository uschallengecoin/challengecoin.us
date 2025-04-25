<script setup lang="ts">
import VSection from 'UiKit/components/VSection/VSection.vue';
</script>

<template>
  <VSection class="VSectionWhatOurClientsSay v-section-what-our-clients-say">
    <div class="v-section-what-our-clients-say__content  is--gap-80">
      <slot />
    </div>
  </VSection>
</template>

<style lang="scss">
.v-section-what-our-clients-say {
  overflow: hidden;
  width: 100%;

  &__content {
    width: 100%;
    display: grid;
    grid-template-columns: calc(30% - 40px) calc(67% - 40px);

    @media screen and (max-width: $tablet){
      display: flex;
      flex-direction: column;
    }

    & > div > p {
      font-size: 24px;
      font-style: normal;
      font-weight: 400;
      line-height: 32px;
      margin-top: 28px;

      @media screen and (max-width: $tablet){
        margin-top: 20px;
      }
    }
  }
}
</style>
