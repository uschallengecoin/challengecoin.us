import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { withPwa } from '@vite-pwa/vitepress';

import path from 'path';
import svgLoader from 'vite-svg-loader';

export default withPwa(defineConfig({
  plugins: [
    vue(),
    svgLoader({
      svgo: false,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      Docs: path.resolve(__dirname, './docs'),
    },
    extensions: ['.js', '.ts', '.json', '.vue'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use '@/core/styles/_colors.scss' as *;
          @use '@/core/styles/_variables.scss' as *;
          @use '@/core/styles/_mixins.scss' as *;
        `,
        api: 'modern-compiler',
        silenceDeprecations: ['legacy-js-api'],
      },
      sass: {
        api: 'modern-compiler',
        silenceDeprecations: ['legacy-js-api'],
      },
    },
  },
  server: {
    port: 8080,
    host: 'local.webdevelop.biz',
  },
  pwa: {}
}));
