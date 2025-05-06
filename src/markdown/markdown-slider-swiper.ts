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
        const attrs: Record<string, string> = {};
        token.attrs?.forEach((item: string[]) => {
          // eslint-disable-next-line prefer-destructuring
          attrs[item[0]] = item[1];
        });
        return (
          `<VSliderSwiper autoplay fade navigation>\n`
        );
      }
      // closing tag
      return '</VSliderSwiper>\n';
    },
  },
];

export const sliderSwiper = (md: MarkdownIt) => {
  md.use(...createContainer('slider-swiper', md));
};
