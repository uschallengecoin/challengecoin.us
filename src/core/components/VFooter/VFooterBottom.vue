<script setup lang="ts">
import { links } from '@/config/links';
import VDropdownLanguages from 'UiKit/components/VDropdownLanguages.vue';

const currentYear = new Date().getFullYear();
</script>

<template>
  <div class="VFooterBottom v-footer-bottom">
    <div class="is--container is--small v-footer-bottom__content">
      © {{ currentYear }} U.S. Challenge Coin LLC. All rights reserved.
      <p class="v-footer-bottom__wrap">
        <VDropdownLanguages class="v-footer-bottom__lang" />
        <span class="v-footer-bottom__terms">
          <a
            :href="links.terms"
            class="is--small"
          >Terms of Use</a>
          <a
            :href="links.privacy"
            class="is--small"
          >Privacy Policy</a>
        </span>
      </p>
    </div>
  </div>
</template>

<style lang="scss">
.v-footer-bottom {
    background-color: $primary-blue;
    padding: 10px 0 16px;

    @media screen and (width < $tablet){
      padding: 0;
      text-align: center;
    }

    &__content {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      @media screen and (width < $tablet){
        flex-direction: column-reverse;
        gap: 40px;
      }
    }

    a {
      color: inherit;
    }

    &__terms {
      display: flex;
      flex-direction: row;
      gap: 48px;
      align-items: center;

      @media screen and (width < $tablet){
        justify-content: center;
      }
    }

    &__lang {
      color: $grayscale-white;
    }

    &__wrap {
      display: flex;
      flex-direction: row;
      gap: 8px;
      align-items: center;
      justify-content: space-between;
    }
}
</style>
