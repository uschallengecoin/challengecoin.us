import { PageData } from 'vitepress';
import { generateJsonLd } from '../../src/core/helpers/jsonLd';
import { normalizeFrontmatter } from '../../src/core/helpers/pageData';
import { stripHtmlAndMarkdown } from '../../src/core/helpers/text';

import env from './env';


export default function (pageData: PageData) {
  pageData.frontmatter.head ??= [];
  pageData.frontmatter.url = `/${pageData.relativePath.replace('.md', '')}`;
  if (pageData.frontmatter.slug === undefined) {
    pageData.frontmatter.slug = pageData.frontmatter.url.split('/').pop();
  }

  const { title } = pageData;
  const titleFormatted = stripHtmlAndMarkdown(title);
  pageData.frontmatter.head.push([
    'meta',
    {
      name: 'og:title',
      content: titleFormatted,
    },
  ]);
  pageData.frontmatter.head.push([
    'meta',
    {
      name: 'twitter:title',
      content: titleFormatted,
    },
  ]);

  normalizeFrontmatter(pageData);

  const seoDescription = stripHtmlAndMarkdown(`${pageData.frontmatter.title} ${env.title} ${pageData.frontmatter.summary}`);
  const canonicalUrl = `${env.FRONTEND_URL}${pageData.frontmatter.url}`;
  let canonicalImage = pageData.frontmatter.cover.image;
  if (canonicalImage && (pageData.frontmatter.cover.image.startsWith('http') === false)) {
    canonicalImage = `${env.FRONTEND_URL}${canonicalImage}`;
  }
  const image = pageData.frontmatter.cover?.image ? canonicalImage
        : `${env.FRONTEND_URL}/sharing.png`;
  
  pageData.frontmatter.head.push([
    'meta',
    {
      name: 'og:image',
      content: image,
    },
  ]);

  pageData.frontmatter.head.push([
    'meta',
    {
      name: 'twitter:image',
      content: image,
    },
  ]);

  pageData.frontmatter.head.push([
    'link',
    {
      rel: 'canonical',
      href: canonicalUrl,
    },
  ]);
  pageData.frontmatter.head.push([
    'meta',
    {
      name: 'og:url',
      content: canonicalUrl,
    },
  ]);
  pageData.frontmatter.head.push([
    'meta',
    {
      name: 'twitter:url',
      content: canonicalUrl,
    },
  ]);

  pageData.description = seoDescription;
  pageData.frontmatter.head.push([
    'meta',
    {
      name: 'og:description',
      content: seoDescription,
    },
  ]);
  pageData.frontmatter.head.push([
    'meta',
    {
      name: 'twitter:description',
      content: seoDescription,
    },
  ]);

  const author = pageData.frontmatter.author || env.author;
  pageData.frontmatter.head.push([
    'meta',
    {
      name: 'author',
      content: Array.isArray(author) ? author.join(', ') : author,
    },
  ]);
  pageData.frontmatter.head.push([
    'meta',
    {
      name: 'robots',
      content: +env.robotsNoIndex ? 'noindex, nofollow' : 'index, follow',
    },
  ]);
  const keywords = pageData.frontmatter.keywords || pageData.frontmatter.tags || env.keywords;
  const keywordsResult = Array.isArray(keywords) ? keywords.join(', ') : keywords;
  const keywordsFormatted = stripHtmlAndMarkdown(keywordsResult);
  pageData.frontmatter.head.push([
    'meta',
    {
      name: 'keywords',
      content: keywordsFormatted,
    },
  ]);
  // added ogType variable to frontmatter. if not set, default is website
  pageData.frontmatter.head.push([
    'meta',
    {
      name: 'og:type',
      content: pageData.frontmatter.ogType || 'website',
    },
  ]);
  // added general function to helpers. Checks frontmatter jsonLDType variable
  pageData.frontmatter.head.push([
    'script',
    { type: 'application/ld+json' },
    generateJsonLd(pageData, env),
  ]);

  if (pageData.frontmatter.audio) {
    pageData.frontmatter.head.push([
      'meta',
      {
        name: 'og:audio',
        content: pageData.frontmatter.audio,
      },
    ]);
  }
  if (pageData.frontmatter.video) {
    pageData.frontmatter.head.push([
      'meta',
      {
        name: 'og:video',
        content: pageData.frontmatter.video,
      },
    ]);
  }
  if (pageData.frontmatter.jsonLDType === 'BlogPosting') {
    if (pageData.frontmatter.lastmod) {
      pageData.frontmatter.head.push([
        'meta',
        {
          name: 'article:modified_time',
          content: pageData.frontmatter.lastmod,
        },
      ]);
    }
    pageData.frontmatter.head.push([
      'meta',
      {
        name: 'article:published_time',
        content: pageData.frontmatter.publishDate,
      },
    ]);
  }
  pageData.frontmatter.head.push([
    'meta',
    {
      name: 'og:locale',
      content: pageData.frontmatter.locale || env.locale,
    },
  ]);
};
