import type MarkdownIt from 'markdown-it';
import type Token from 'markdown-it/lib/token.mjs';
import type { RenderRule } from 'markdown-it/lib/renderer.mjs';
import container from 'markdown-it-container';

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
        const title1 = attrs.title1 ? ` title1="${attrs.title1}"` : '';
        const title2 = attrs.title2 ? ` title2="${attrs.title2}"` : '';
        const images = attrs.images ? ` :images="${attrs.images}"` : '';
        return (
          `<VSectionLegacy ${title1} ${title2} ${images} id="legacy">\n`
        );
      }
      // closing tag
      return '</VSectionLegacy>\n';
    },
  },
];

export const legacy = (md: MarkdownIt) => {
  md.use(...createContainer('legacy', md));
};
