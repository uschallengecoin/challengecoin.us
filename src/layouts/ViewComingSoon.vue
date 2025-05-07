<script lang="ts">
import { useGlobalLoader } from 'UiKit/store/useGlobalLoader';
import VSectionTopVideo from /*VSectionTopVideo*/'UiKit/components/VSectionTop/VSectionTopVideo.vue';
import VSectionTopComingSoon from /*VSectionTopComingSoon*/'UiKit/components/VSectionTop/VSectionTopComingSoon.vue';
</script>

<script setup lang="ts">
useGlobalLoader().hide();
</script>

<template>
  <div class="ViewComingSoon view-coming-soon">
    <VSectionTopVideo
      id="hero"
      full-height
      video-src="/video/video-bg.mp4"
    >
      <VSectionTopComingSoon>
        <Content />
      </VSectionTopComingSoon>
    </VSectionTopVideo>
  </div>
</template>
