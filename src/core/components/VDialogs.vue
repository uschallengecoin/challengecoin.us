<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { useDialogs } from 'UiKit/store/useDialogs';
import { storeToRefs } from 'pinia';

const VDialogShare = defineAsyncComponent({
  loader: () => import('UiKit/components/VDialogs/VDialogShare.vue'),
});

const useDialogsStore = useDialogs();
const { isDialogShareOpen, dialogsShareUrl } = storeToRefs(useDialogsStore);
</script>

<template>
  <div>
    <VDialogShare
      v-model="isDialogShareOpen"
      :full-url="dialogsShareUrl"
    />
  </div>
</template>
