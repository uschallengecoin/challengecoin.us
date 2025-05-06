<script setup lang="ts">
import { useDialogs } from 'UiKit/store/useDialogs';

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
  <span class="VDialogClickText v-dialog-click-text is--link-1" @click="onDialogClick">
    <slot />
  </span>
</template>

<style lang="scss">
.v-dialog-click-text {
  cursor: pointer;
  display: inline;
}
</style>