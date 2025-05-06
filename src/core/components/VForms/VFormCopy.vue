<script setup lang="ts">
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import VFormInput from 'UiKit/components/Base/VForm/VFormInput.vue';
import { useClipboard } from '@vueuse/core';

const props = defineProps({
  text: String,
  buttonText: {
    type: String,
    default: 'Copy',
  },
});

const { copy, copied } = useClipboard({ legacy: true });

const onShareClick = () => {
  copy(props.text || window?.location?.href);
};
</script>

<template>
  <div class="VFormCopy v-form-copy">
    <VFormInput
      readonly
      :model-value="text"
      size="large"
    />
    <VButton
      v-if="buttonText"
      size="large"
      class="v-form-copy__button is--margin-top-0"
      @click="onShareClick"
    >
      <span v-if="!copied">{{ buttonText }}</span>
      <span v-else>Copied!</span>
    </VButton>
  </div>
</template>

<style lang="scss">
.v-form-copy {
    display: flex;
    gap: 8px;
    width: 100%;
    text-align: left;

    @media screen and (width < $tablet){
      flex-direction: column;
    }

    .v-form-input {
      pointer-events: auto !important;
    }
}
</style>
