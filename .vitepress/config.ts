import path from 'node:path';
import svgLoader from 'vite-svg-loader';
import markdownItAnchor from 'markdown-it-anchor';
import { loadEnv, PageData } from 'vitepress';
import wikilinks from '../src/markdown-it-wikilinks';
import { ResourceCenterTagItems } from './utils';
import { slider } from '../src/markdown/markdown-slider';
import { heroItem } from '../src/markdown/markdown-hero-item';
import { accordionItem } from '../src/markdown/markdown-accordion-item';
import { faq } from '../src/markdown/markdown-faq';
import { preOrder } from '../src/markdown/markdown-pre-order';
import { sliderAutoplay } from '../src/markdown/markdown-slider-autoplay';
import { topVideo } from '../src/markdown/markdown-section-top-video';
import { dialogTop } from '../src/markdown/markdown-dialog-top';
import { twoCOlImageFullBackground } from '../src/markdown/markdown-two-col-image-full-background';
import { whyOwn } from '../src/markdown/markdown-why-own';
import { card } from '../src/markdown/markdown-card';
import { CheckmarkedItem } from '../src/markdown/markdown-checkmarked';
import { testimonialItem } from '../src/markdown/markdown-testimonial-item';
import { subscribe } from '../src/markdown/markdown-subscribe';
import { whatOurClientSay } from '../src/markdown/markdown-what-our-cliens-say';
import { howItWorks } from '../src/markdown/markdown-how-it-works';
import { legacy } from '../src/markdown/markdown-legacy';
import { urlFormat } from '../src/core/helpers/url';
import { generateJsonLd } from '../src/core/helpers/jsonLd';
import { normalizeFrontmatter } from '../src/core/helpers/pageData';
import { stripHtmlAndMarkdown } from '../src/core/helpers/text';
import findDraftFiles from './exclude_drafts';

const envProcess = loadEnv('', process.cwd());

export const env = {
  env: envProcess.VITE_ENV,
  robotsNoIndex: envProcess.VITE_robotsNoIndex,
  FRONTEND_URL: envProcess.VITE_FRONTEND_URL,
  CHATBOT_URL: envProcess.VITE_CHATBOT_URL,
  HUBSPOTFORM: envProcess.VITE_HUBSPOTFORM,
  HUBSPOTPORTAL_ID: envProcess.VITE_HUBSPOTPORTAL_ID,
  HUBSPOT_FORM_ID_RECEIVE_LATEST_NEWS: envProcess.VITE_HUBSPOT_FORM_ID_RECEIVE_LATEST_NEWS,
  SEGMENT_KEY: envProcess.VITE_SEGMENT_KEY,
  GTM: envProcess.VITE_GTM,
  title: 'US Challenge Coin',
  description: 'Introducing a modern symbol of American pride — crafted to honor heritage, support those who serve, and bring communities together with every purchase.',
  keywords: ['challenge', 'coin'],
  author: 'US Challenge Coin',
  email: 'info@domain.com',
  phone: '123-123-1234',
  bookACall: envProcess.VITE_bookACall,
  sendAMessage: envProcess.VITE_sendAMessage,
  leaveEmail: envProcess.VITE_leaveEmail,
  locale: 'en_US',
};

// https://vitepress.dev/reference/site-config
export default {
  // https://vitepress.dev/guide/routing#root-and-source-directory
  srcDir: './docs',
  srcExclude: findDraftFiles('./docs'),
  transformHead({ assets }) {
    // adjust the regex accordingly to match your font
    const myFontFile = assets.find((file) => file.match(/Avenir[-a-zA-Z0-9.]+\.[woff2|ttf|eot|svg]/));
    if (myFontFile) {
      const ext = myFontFile.split('.').pop();
      return [
        [
          'link',
          {
            rel: 'preload',
            href: myFontFile,
            as: 'font',
            type: `font/${ext}`,
            crossorigin: '',
          },
        ],
      ];
    }
  },
  title: env.title,
  description: env.description,
  cleanUrls: true,
  lastUpdated: true,
  head: [
    [
      'link',
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
    [
      'link',
      { rel: 'icon', type: 'image/svg+xml', href: '/images/logo.svg' },
    ],
    [
      'meta',
      {
        name: 'og:image:width',
        content: '200',
      },
    ],
    [
      'meta',
      {
        name: 'og:image:height',
        content: '200',
      },
    ],
    [
      'meta',
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
    [
      'meta',
      {
        name: 'twitter:creator',
        content: env.author,
      },
    ],
    [
      'link',
      {
        rel: 'apple-touch-icon',
        href: '/logo200x200.png',
      },
    ],
    [
      'meta',
      {
        name: 'mobile-web-app-capable',
        content: 'yes',
      },
    ],
    [
      'meta',
      {
        name: 'theme-color',
        content: '#2e2e33',
      },
    ],
    [
      'link',
      {
        rel: 'manifest',
        href: '/manifest.json',
      },
    ],
    [
      'meta',
      {
        name: 'msapplication-config',
        content: '/browserconfig.xml',
      },
    ],
    [
      'script',
      {},
      `(function() {
        window.addEventListener('load', function() {
          setTimeout(function() {
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:''; 
              j.async=true; 
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${env.GTM}');
          }, 3000); // Delay by 3 seconds to ensure async loading
        });
      })();`,
    ],
    [
      'script',
      {},
      `!function(){
        function loadSegment() {
          setTimeout(function() {
            var analytics=window.analytics=window.analytics||[];
            if(!analytics.initialize) if(analytics.invoked) 
              window.console && console.error && console.error("Segment snippet included twice.");
            else {
              analytics.invoked=!0;
              analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];
              analytics.factory=function(e){return function(){if(window.analytics.initialized)return window.analytics[e].apply(window.analytics,arguments);
              var i=Array.prototype.slice.call(arguments);i.unshift(e);analytics.push(i);return analytics}};
              for(var i=0;i<analytics.methods.length;i++){var key=analytics.methods[i];analytics[key]=analytics.factory(key)}
              analytics.load=function(key,i){
                var t=document.createElement("script");
                t.type="text/javascript";
                t.async=!0;
                t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";
                var n=document.getElementsByTagName("script")[0];
                n.parentNode.insertBefore(t,n);
                analytics._loadOptions=i
              };
              analytics._writeKey="${env.SEGMENT_KEY}";
              analytics.SNIPPET_VERSION="4.16.1";
              analytics.load("${env.SEGMENT_KEY}");
              analytics.page();
              
              // Observe changes in the document's body for SPA navigation
              var currentPath = window.location.pathname;
              var observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                  if (mutation.type === "childList") {
                    var newPath = window.location.pathname;
                    if (newPath !== currentPath) {
                      currentPath = newPath;
                      analytics.page();
                    }
                  }
                });
              });
              observer.observe(document.body, { childList: true, subtree: true });
            }
          }, 3000); // Delayed loading by 3 seconds
        }
        
        window.addEventListener('load', loadSegment);
      }();`,
    ],
  ],
  themeConfig: {
    search: {
      provider: 'local',
    },
    contacts: {
      phone: env.phone,
      email: env.email,
    },
    resourceCenter: {
      tags: ResourceCenterTagItems,
      mainArticleSlug: 'digitalizing-businesses-which-made-through-covid-19-outbreak',
      secondaryArticleSlug1: 'google-maps-background-svg-map',
      secondaryArticleSlug2: '3-things-helped-me-get-web-design-world',
    },
    env,
  },
  transformPageData(pageData: PageData) {
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
    let canonicalImage = pageData.frontmatter?.cover?.image;
    if (canonicalImage && (pageData.frontmatter.cover.image.startsWith('http') === false)) {
      canonicalImage = `${env.FRONTEND_URL}${canonicalImage}`;
    }
    const image = pageData.frontmatter.cover?.image ? canonicalImage
      : `${env.FRONTEND_URL}/images/blog/sharing.png`;

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
  },
  sitemap: {
    hostname: env.FRONTEND_URL,
    lastmodDateOnly: false,
    transformItems: (item) => {
      if (item.url != null) {
        item.url = urlFormat(item.url);
      }
      if (item.draft == true) {
        item = {};
      }
      return item;
    },
  },
  metaChunk: true,
  rewrites(url) {
    return urlFormat(url);
  },
  appearance: false,
  vite: {
    plugins: [
      svgLoader({
        svgo: false,
      }),
    ],
    ssr: {
      noExternal: ['@kyvg/vue3-notification'],
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
        '@': path.resolve(__dirname, '../src'),
        UiKit: path.resolve(__dirname, '../src/core'),
        Docs: path.resolve(__dirname, '../docs'),
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
  },
  markdown: {
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
      md.use(wikilinks({
        makeAllLinksAbsolute: false, generatePagePathFromLabel: urlFormat, postProcessPagePath: urlFormat, uriSuffix: '',
      }));
      md.use(slider);
      md.use(topVideo);
      md.use(heroItem);
      md.use(dialogTop);
      md.use(twoCOlImageFullBackground);
      md.use(legacy);
      md.use(howItWorks);
      md.use(card);
      md.use(whyOwn);
      md.use(CheckmarkedItem);
      md.use(subscribe);
      md.use(whatOurClientSay);
      md.use(testimonialItem);
      md.use(preOrder);
      md.use(sliderAutoplay);
      md.use(faq);
      md.use(accordionItem);
    },
    theme: 'github-light',
  },
};
