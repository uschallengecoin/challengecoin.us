/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { computed, ref } from 'vue';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { useData } from 'vitepress';

export const useDialogs = defineStore('dialogs', () => {

const { frontmatter, theme } = useData();

  const isDialogShareOpen = ref(false);
  const dialogsShareUrl = ref();
  const fullUrl = computed(() => (window?.location?.origin || theme.env.FRONTEND_URL) + frontmatter.value.url);
  const showDialogShare = (url?: string) => {
    isDialogShareOpen.value = true;
    dialogsShareUrl.value = url  ? url : fullUrl.value;
  };

  return {
    showDialogShare,
    isDialogShareOpen,
    dialogsShareUrl,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDialogs, import.meta.hot));
}
