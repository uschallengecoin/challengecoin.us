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
        const buyNowHref = links.buyNow ? ` buy-now-href="${links.buyNow}"` : '';
        const howItWorksHref = links.howItWorks ? ` how-it-works-href="${links.howItWorks}"` : '';
        const image = attrs.image ? ` background-image-src="${attrs.image}"` : '';
        return (
          `<VDialogTop ${buyNowHref} ${howItWorksHref} ${image}>\n`
        );
      }
      // closing tag
      return '</VDialogTop>\n';
    },
  },
];

export const dialogTop = (md: MarkdownIt) => {
  md.use(...createContainer('dialog-top', md));
};
