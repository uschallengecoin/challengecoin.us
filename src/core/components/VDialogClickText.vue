<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { useDialogs } from 'UiKit/store/useDialogs';
import { storeToRefs } from 'pinia';

const props = defineProps({
  name: {
    type: String,
    required: true,
  }
});

const useDialogsStore = useDialogs();

const onDialogClick = () => {
  if (props.name.toLowerCase().includes('engraver')) {
    useDialogsStore.showDialogEngraver();
  }
};
</script>

<template>
  <span class="VDialogClickText v-dialog-click-text" @click="onDialogClick">
    <slot />
  </span>
</template>

<style lang="scss">
.v-dialog-click-text {
  cursor: pointer;
  display: inline;
}
</style>