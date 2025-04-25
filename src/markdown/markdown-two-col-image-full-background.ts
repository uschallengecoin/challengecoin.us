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
        const reverse = attrs.reverse ? 'reverse' : '';
        const buttonHref = links.buyNow ? ` button-href="${links.buyNow}"` : '';
        const buttonText = attrs.buttonText ? ` button-text="${attrs.buttonText}"` : '';
        return (
          `<VSectionTwoColImageFullBackground ${reverse} ${buttonHref} ${buttonText} class="is--margin-top-150">\n`
        );
      }
      // closing tag
      return '</VSectionTwoColImageFullBackground>\n';
    },
  },
];

export const twoCOlImageFullBackground = (md: MarkdownIt) => {
  md.use(...createContainer('two-col-image-full-background', md));
};
