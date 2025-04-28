<script setup lang="ts">
import ArrowRight from 'UiKit/assets/images/arrow-right.svg';
import VSection from 'UiKit/components/VSection/VSection.vue';
import VButton from 'UiKit/components/Base/VButton/VButton.vue';

const props = defineProps({
  title: String,
  subTitle: String,
  slider: Array,
  text: String,
  videoSrc: String,
  buttonHref: String,
  buttonText: String,
  contentClass: String,
  fullHeight: Boolean,
  videoCoverImage: String,
});

const emit = defineEmits(['click']);
</script>

<template>
  <VSection
    class="VSectionTopVideo v-section-top-video"
    :class="{ 'is--full-height': fullHeight }"
    :style="{ '--video-cover': videoCoverImage ? `url(${videoCoverImage})` : undefined }"
  >
    <video
      v-if="props.videoSrc"
      autoplay
      muted
      loop
      playsInline
      class="v-section-top-video__video"
    >
      <source
        :src="videoSrc"
        type="video/mp4"
      >
    </video>
    <div
      class="v-section-top-video__content"
      :class="[contentClass]"
    >
      <ClientOnly>
        <slot>
          <h5>
            {{ text }}
          </h5>
          <h1 class="is--margin-top-15">
            {{ title }}
          </h1>
          <p
            v-if="subTitle"
            class="is--subheading-1 is--margin-top-15"
            v-html="subTitle"
          />
          <VButton
            v-if="props.buttonHref"
            as="a"
            :href="encodeURI(props.buttonHref)"
            size="large"
            class="is--margin-top-40"
            @click="emit('click')"
          >
            <slot name="buttonText">
              {{ props.buttonText }}
              <component
                :is="ArrowRight"
              />
            </slot>
          </VButton>
        </slot>
      </ClientOnly>
    </div>
  </VSection>
</template>

<style lang="scss">
@use "UiKit/styles/_variables.scss" as *;

.v-section-top-video {
  position: relative;
  overflow: hidden;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  &.is--full-height {
    padding: $header-height 0;
    min-height: max(600px, 100vh);

    @include media-lte(tablet) {
      padding: calc($header-height-mobile + 40px) 0 70px;
      // min-height: auto;
    }
  }

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.5;
    background: linear-gradient(243deg, #F2F2F2 16.02%, #E1DCD0 83.06%);
    // background-image: var(--video-cover);
    background-repeat: no-repeat;
    background-attachment: scroll;
    background-size: cover;
    background-position: center;
  }

  video {
    position: absolute;
    left: 0;
    top: 0;
    width: auto;
    height: auto;
    min-width: 100%;
    min-height: 100%;
    opacity: 0.3;
    z-index: -2;
    object-fit: cover;
    max-width: 100%;
    max-height: 100%;
  }

  &__content {
    margin: 0 auto;
    // padding: 130px 0;
  }

  h5 {
    color: $primary;
    text-transform: uppercase;
  }
}
</style>
