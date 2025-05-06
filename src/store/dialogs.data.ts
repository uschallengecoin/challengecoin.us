import pMap from 'p-map';
import { ContentData, createContentLoader } from 'vitepress';
import { sortByOrder, sortByPublishDate } from '../core/helpers/allData';
import { normalizeFrontmatter } from '../core/helpers/pageData';
import { IFrontmatter } from '../core/types/types';


const loader = createContentLoader(['dialogs/*.md'], {
  includeSrc: true,
  render: true,
  async transform(rawData: ContentData[]) {
    let data = await pMap(
      rawData,
      async (pageData) => {
        normalizeFrontmatter(pageData);
        return {
          ...pageData.frontmatter as IFrontmatter,
          rawUrl: pageData.url,
          html: pageData.frontmatter.render ? pageData.html : '',
        };
      },
      { concurrency: 64 },
    );
    data = sortByPublishDate(data);
    data = sortByOrder(data);
    return data;
  },
});

export default loader;
