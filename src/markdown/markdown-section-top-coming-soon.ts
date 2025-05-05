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
        return (
          `<VSectionTopComingSoon>\n`
        );
      }
      // closing tag
      return '</VSectionTopComingSoon>\n';
    },
  },
];

export const comingSoon = (md: MarkdownIt) => {
  md.use(...createContainer('coming-soon', md));
};
