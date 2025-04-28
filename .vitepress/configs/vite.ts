import path, { relative } from 'node:path';
import svgLoader from 'vite-svg-loader';

export default {
  plugins: [
    svgLoader({
      svgo: false,
    }),
  ],
  ssr: {
  },
  build: {
    modulePreload: false,
    assetsInlineLimit: 12288,
  },
  server: {
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../../src'),
      UiKit: path.resolve(__dirname, '../../src/core'),
      Docs: path.resolve(__dirname, '../../docs'),
    },
    extensions: ['.js', '.ts', '.json', '.vue'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use 'UiKit/styles/_colors.scss' as *;
          @use 'UiKit/styles/_variables.scss' as *;
          @use 'UiKit/styles/_mixins.scss' as *;
        //   @use 'UiKit/styles/_global.scss' as *;
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
}