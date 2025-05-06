import { urlFormat } from '../src/core/helpers/url';

import findDraftFiles from './exclude_drafts';

import env from './configs/env';
import head from './configs/head';
import theme from './configs/theme';
import sitemap from './configs/sitemap';
import vite from './configs/vite';
import markdown from './configs/markdown';
import transformPage from './configs/transformPage';
import transformHead from './configs/transformHead';

const srcDir = "./docs";
// https://vitepress.dev/reference/site-config
export default {
  // https://vitepress.dev/guide/routing#root-and-source-directory
  srcDir: srcDir,
  srcExclude: findDraftFiles(srcDir, srcDir),
  transformHead: transformHead,
  title: env.title,
  description: env.description,
  cleanUrls: true,
  lastUpdated: true,
  head: head,
  themeConfig: theme,
  transformPageData: transformPage,
  sitemap: sitemap,
  metaChunk: true,
  rewrites(url) {
    return urlFormat(url);
  },
  appearance: false,
  vite: vite,
  markdown: markdown,
};
