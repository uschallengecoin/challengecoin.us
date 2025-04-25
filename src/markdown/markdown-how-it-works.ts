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
        const title = attrs.title ? ` title="${attrs.title}"` : '';
        return (
          `<VHowItWorks ${title}>\n`
        );
      }
      // closing tag
      return '</VHowItWorks>\n';
    },
  },
];

export const howItWorks = (md: MarkdownIt) => {
  md.use(...createContainer('how-it-works', md));
};
