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
          '<VSectionWhatOurClientsSay class="is--margin-top-150" id="voices-of-honor">\n'
        );
      }
      // closing tag
      return '</VSectionWhatOurClientsSay>\n';
    },
  },
];

export const whatOurClientSay = (md: MarkdownIt) => {
  md.use(...createContainer('what-our-client-say', md));
};
