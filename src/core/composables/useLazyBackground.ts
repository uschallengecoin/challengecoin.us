import { ref, onMounted, onUnmounted } from 'vue';

export interface UseLazyBackgroundOptions {
  useVariable?: boolean;
}

export const useLazyBackground = (elementClass: string, imagePath: string, options: UseLazyBackgroundOptions = {}) => {
  const isImageLoaded = ref(false);
  let observer: IntersectionObserver | null = null;

  const loadImage = () => {
    const element = document.querySelector(`.${elementClass}`);
    if (element) {
      if (options.useVariable) {
        element.style.setProperty('--lazy-background-image', `url(${imagePath})`);
      } else {
        element.style.backgroundImage = `url(${imagePath})`;
      }
      isImageLoaded.value = true;
    }
  };

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isImageLoaded.value) {
            loadImage();
            observer?.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector(`.${elementClass}`);
    if (element) {
      observer.observe(element);
    }
  });

  onUnmounted(() => {
    observer?.disconnect();
  });

  return {
    isImageLoaded,
  };
};