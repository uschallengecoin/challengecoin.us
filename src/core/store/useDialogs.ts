/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { ref } from 'vue';
import { acceptHMRUpdate, defineStore } from 'pinia';

export const useDialogs = defineStore('dialogs', () => {

  const isDialogShareOpen = ref(false);
  const showDialogShare = () => {
    isDialogShareOpen.value = true;
  };

  return {
    showDialogShare,
    isDialogShareOpen,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDialogs, import.meta.hot));
}
