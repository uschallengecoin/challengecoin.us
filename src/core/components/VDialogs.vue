<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { useDialogs } from 'UiKit/store/useDialogs';
import { storeToRefs } from 'pinia';

const VDialogShare = defineAsyncComponent({
  loader: () => import('UiKit/components/VDialogs/VDialogShare.vue'),
});
const VDialogEngraver = defineAsyncComponent({
  loader: () => import('UiKit/components/VDialogs/VDialogEngraver.vue'),
});

const useDialogsStore = useDialogs();
const { isDialogShareOpen, isDialogEngraverOpen } = storeToRefs(useDialogsStore);
</script>

<template>
  <div>
    <VDialogShare
      v-model="isDialogShareOpen"
    />
    <VDialogEngraver 
      v-model="isDialogEngraverOpen"
    />
  </div>
</template>
