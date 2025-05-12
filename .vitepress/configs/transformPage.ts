import { PageData } from 'vitepress';
import { generateJsonLd } from '../../src/core/helpers/jsonLd';
import { getLang, normalizeFrontmatter } from '../../src/core/helpers/pageData';
import { stripHtmlAndMarkdown } from '../../src/core/helpers/text';

import env from './env';
import locales from './locales';
import theme from './theme';


export default function (pageData: PageData) {

  pageData.frontmatter.head ??= [];
  if (!pageData.frontmatter.lang) pageData.frontmatter.lang = getLang(pageData.filePath);
  const locale = locales[pageData.frontmatter.lang] || locales.root;
  if (!pageData.frontmatter.title) pageData.frontmatter.title = locale.title;
  if (!pageData.frontmatter.description) pageData.frontmatter.description = locale.description;

  normalizeFrontmatter(pageData);
  

  /** TITLE **/ 
  const titleFormatted = stripHtmlAndMarkdown(pageData.frontmatter.title);
  pageData.frontmatter.head.push(['meta', { name: 'og:title', content: titleFormatted }]);
  pageData.frontmatter.head.push(['meta', { name: 'twitter:title', content: titleFormatted }]);

  /** DESCRIPTION **/ 
  pageData.description = stripHtmlAndMarkdown(`${pageData.frontmatter.title}: ${pageData.frontmatter.summary}`);
  pageData.frontmatter.head.push(['meta', { name: 'og:description', content: pageData.description }]);
  pageData.frontmatter.head.push(['meta', { name: 'twitter:description', content: pageData.description }]);

  /** CANONICAL IMAGE **/ 
  let canonicalImage = pageData.frontmatter.cover.image;
  if (canonicalImage && (pageData.frontmatter.cover.image.startsWith('http') === false)) {
    canonicalImage = `${env.FRONTEND_URL}${canonicalImage}`;
  }
  const image = pageData.frontmatter.cover?.image ? canonicalImage : `${env.FRONTEND_URL}/sharing.png`;
  pageData.frontmatter.head.push(['meta', { name: 'og:image', content: image }]);
  pageData.frontmatter.head.push(['meta', { name: 'twitter:image', content: image }]);

  /** CANONICAL URL **/ 
  const canonicalUrl = `${env.FRONTEND_URL}${pageData.frontmatter.url}`;
  pageData.frontmatter.head.push(['link', { rel: 'canonical', href: canonicalUrl }]);
  pageData.frontmatter.head.push(['meta', { name: 'og:url', content: canonicalUrl }]);
  pageData.frontmatter.head.push(['meta', { name: 'twitter:url', content: canonicalUrl}]);

  /** AUTHOR **/ 
  const author = pageData.frontmatter.author || theme.author;
  pageData.frontmatter.head.push([
    'meta', { name: 'author', content: Array.isArray(author) ? author.join(', ') : author },
  ]);

  /** ROBOTS **/ 
  pageData.frontmatter.head.push([
    'meta',
    { name: 'robots', content: +env.robotsNoIndex ? 'noindex, nofollow' : 'index, follow' },
  ]);

  /** KEYWORDS **/ 
  const keywords = pageData.frontmatter.keywords || pageData.frontmatter.tags || locale.keywords;
  const keywordsResult = Array.isArray(keywords) ? keywords.join(', ') : keywords;
  const keywordsFormatted = stripHtmlAndMarkdown(keywordsResult);
  pageData.frontmatter.head.push(['meta', { name: 'keywords', content: keywordsFormatted }]);

  // added ogType variable to frontmatter. if not set, default is website
  pageData.frontmatter.head.push(['meta', { name: 'og:type', content: pageData.frontmatter.ogType || 'website' }]);

  // added general function to helpers. Checks frontmatter jsonLDType variable
  pageData.frontmatter.head.push([
    'script',
    { type: 'application/ld+json' },
    generateJsonLd(pageData, env, theme),
  ]);

  if (pageData.frontmatter.audio) {
    pageData.frontmatter.head.push([
      'meta',
      { name: 'og:audio', content: pageData.frontmatter.audio },
    ]);
  }

  if (pageData.frontmatter.video) {
    pageData.frontmatter.head.push([
      'meta',
      { name: 'og:video', content: pageData.frontmatter.video },
    ]);
  }

  if (pageData.frontmatter.jsonLDType === 'BlogPosting') {
    if (pageData.frontmatter.lastmod) {
      pageData.frontmatter.head.push([
        'meta',
        { name: 'article:modified_time', content: pageData.frontmatter.lastmod },
      ]);
    }
    pageData.frontmatter.head.push([
      'meta',
      { name: 'article:published_time', content: pageData.frontmatter.publishDate },
    ]);
  }

  pageData.frontmatter.head.push(['meta', { name: 'og:locale', content: locale.locale }]);

  // console.log(pageData)
};
