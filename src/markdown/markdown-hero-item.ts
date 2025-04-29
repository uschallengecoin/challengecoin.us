import type MarkdownIt from 'markdown-it';
import type Token from 'markdown-it/lib/token.mjs';
import type { RenderRule } from 'markdown-it/lib/renderer.mjs';
import container from 'markdown-it-container';
import { links } from '../config/links';

type ContainerArgs = [typeof container, string, { render: RenderRule }];
const createContainer = (
  klass: string,
): ContainerArgs => [
  container,
  klass,
  {
    render(tokens: Token[], idx: number) {
      const token = tokens[idx];
      if (token.nesting === 1) {
        // Convert attrs to object
        const attrs = token.attrs?.reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {} as Record<string, string>) || {};

        // Safely escape attributes
        const imageSrc = attrs.image ? ` image-src="${attrs.image}"` : '';
        const imageMobileSrc = attrs.imageMobile ? ` image-mobile-src="${attrs.imageMobile}"` : '';
        const buyNowHref = links.buyNow ? ` buy-now-href="${links.buyNow}"` : '';
        return (
          `<VCarouselItem><VInfoHero ${imageSrc} ${buyNowHref} ${imageMobileSrc}>\n`
        );
      }
      // closing tag
      return '</VInfoHero></VCarouselItem>\n';
    },
  },
];

export const heroItem = (md: MarkdownIt) => {
  md.use(...createContainer('hero-item', md));
};
