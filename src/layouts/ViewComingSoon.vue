<script lang="ts">
import { useGlobalLoader } from 'UiKit/store/useGlobalLoader';
</script>

<script setup lang="ts">
useGlobalLoader().hide();
</script>

<template>
  <div class="ViewComingSoon view-coming-soon">
    <Content />
  </div>
</template>
