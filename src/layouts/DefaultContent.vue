<script lang="ts">
import { useData } from 'vitepress';
import { useGlobalLoader } from 'UiKit/store/useGlobalLoader';
</script>

<script setup lang="ts">
const { frontmatter } = useData();
useGlobalLoader().hide();
</script>

<template>
  <div class="DefaultContent with-default-distance is--no-padding">
    <h1> {{ frontmatter.title }} </h1>
    <div class="is--no-padding">
      <slot />
      <br />
      <br />
    </div>
  </div>
</template>
