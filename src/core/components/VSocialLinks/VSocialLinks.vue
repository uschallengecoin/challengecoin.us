<script setup lang="ts">
import { PropType } from 'vue';
import VButton from 'UiKit/components/Base/VButton/VButton.vue';

interface ISocial {
  icon: object;
  href: string;
  name: string;
  iconName: string;
}

defineProps({
  socialList: {
    type: Array as PropType<ISocial[]>,
    required: true,
  },
});
</script>

<template>
  <div class="SocialLinks social-links">
    <VButton
      v-for="item in socialList"
      :key="item.iconName"
      :href="item.href"
      as="a"
      target="_blank"
      class="social-links__item is--margin-top-0"
      rel="noopener noreferrer"
      :aria-label="item.name"
      icon-only
      variant="social"
      size="large"
    >
      <component
        :is="item.icon"
        class="social-links__icon"
      />
    </VButton>
  </div>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
@use 'UiKit/styles/_variables.scss' as variables;

.social-links{
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  width: 100%;
  color: colors.$white;
  gap: 28px;

  @media screen and (width < $tablet){
    gap: 2px;
    justify-content: space-between;
  }

  &__icon{
    height: 24px;
    width: 24px;
  }
}
</style>
