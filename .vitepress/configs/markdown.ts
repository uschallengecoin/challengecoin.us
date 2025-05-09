import { urlFormat } from '../../src/core/helpers/url';

import markdownItAnchor from 'markdown-it-anchor';
import obsidianImages from 'markdown-it-obsidian-images';
import wikilinks from '../../src/markdown-it-wikilinks';

export default {
  image: {
    // image lazy loading is disabled by default
    lazyLoading: true,
  },
  // options for markdown-it-anchor
  // https://github.com/valeriangalliat/markdown-it-anchor#usage
  anchor: {
    permalink: markdownItAnchor.permalink.headerLink(),
  },
  config: (md) => {
    md.use(obsidianImages({makeAllLinksAbsolute: true }));
    md.use(wikilinks({
      makeAllLinksAbsolute: false, generatePagePathFromLabel: urlFormat, postProcessPagePath: urlFormat, uriSuffix: '',
    }));
  },
  theme: 'github-light',
};