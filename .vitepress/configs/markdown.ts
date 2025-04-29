import { urlFormat } from '../../src/core/helpers/url';

import markdownItAnchor from 'markdown-it-anchor';
import wikilinks from '../../src/markdown-it-wikilinks';

import { slider } from '../../src/markdown/markdown-slider';
import { heroItem } from '../../src/markdown/markdown-hero-item';
import { accordionItem } from '../../src/markdown/markdown-accordion-item';
import { faq } from '../../src/markdown/markdown-faq';
import { preOrder } from '../../src/markdown/markdown-pre-order';
import { sliderAutoplay } from '../../src/markdown/markdown-slider-autoplay';
import { topVideo } from '../../src/markdown/markdown-section-top-video';
import { dialogTop } from '../../src/markdown/markdown-dialog-top';
import { twoCOlImageFullBackground } from '../../src/markdown/markdown-two-col-image-full-background';
import { whyOwn } from '../../src/markdown/markdown-why-own';
import { card } from '../../src/markdown/markdown-card';
import { CheckmarkedItem } from '../../src/markdown/markdown-checkmarked';
import { testimonialItem } from '../../src/markdown/markdown-testimonial-item';
import { subscribe } from '../../src/markdown/markdown-subscribe';
import { whatOurClientSay } from '../../src/markdown/markdown-what-our-cliens-say';
import { howItWorks } from '../../src/markdown/markdown-how-it-works';
import { legacy } from '../../src/markdown/markdown-legacy';

export default {
  image: {
    // image lazy loading is disabled by default
    lazyLoading: true,
  },
  // options for markdown-it-anchor
  // https://github.com/valeriangalliat/markdown-it-anchor#usage
  anchor: {
    // permalink: markdownItAnchor.permalink.headerLink(),
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
};