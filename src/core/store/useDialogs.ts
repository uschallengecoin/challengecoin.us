/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { ref } from 'vue';
import { acceptHMRUpdate, defineStore } from 'pinia';

export const useDialogs = defineStore('dialogs', () => {

  const isDialogShareOpen = ref(false);
  const showDialogShare = () => {
    isDialogShareOpen.value = true;
  };

  const isDialogEngraverOpen = ref(false);
  const showDialogEngraver = () => {
    isDialogEngraverOpen.value = true;
  };

  return {
    showDialogShare,
    isDialogShareOpen,
    showDialogEngraver,
    isDialogEngraverOpen,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDialogs, import.meta.hot));
}
