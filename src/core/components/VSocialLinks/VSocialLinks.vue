<script setup lang="ts">
import { defineAsyncComponent, markRaw, onMounted, PropType, reactive } from 'vue';
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import { useDialogs } from '@/core/store/useDialogs';


interface ISocial {
  icon: string;
  href: string;
  name: string;
  shareHref: string;
  function: () => void;
}

const props = defineProps({
  socialList: {
    type: Array as PropType<ISocial[]>,
    required: true,
  },
  share: {
    type: Boolean,
    default: false,
  },
});

// Reactive object to store resolved icons
const resolvedIcons = reactive<Record<string, any>>({});

const loadIcons = async () => {
  for (const item of props.socialList) {
    if (!resolvedIcons[item.icon]) {
      resolvedIcons[item.icon] = markRaw(
        defineAsyncComponent(() =>
          import(`@/assets/images/social/${item.icon}.svg`)
        )
      );
    }
  }
};

// Load icons when the component is mounted
onMounted(() => {
  loadIcons();
});
</script>

<template>
  <div class="SocialLinks social-links">
    <div
      v-for="item in socialList"
      :key="item.icon"
      class="social-links__item"
    >
      <VButton
        :href="share ? item.shareHref : item.href"
        as="a"
        target="_blank"
        class="social-links__item is--margin-top-0"
        rel="noopener noreferrer"
        :aria-label="item.name"
        icon-only
        :variant="!share ? 'social' : 'default'"
        size="large"
        @click="item.function && item.function(useDialogs())"
      >
        <component
          :is="resolvedIcons[item.icon]"
          class="social-links__icon"
        />
      </VButton>
      <span
        v-if="share"
        class="social-links__text"
      >{{ item.name }}</span>
    </div>
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

  &__item{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    

    @media screen and (width < $tablet){
      gap: 12px;
    }
  }

  &__text{
    color: colors.$black;
  }
}
</style>
