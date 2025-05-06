import { spawn } from 'node:child_process';
import fs from 'fs';
import path from 'path';
import pMap from 'p-map';
import { ContentData, createContentLoader } from 'vitepress';
import { sortByOrder, sortByPublishDate } from '../../src/core/helpers/allData';
import { normalizeFrontmatter } from '../../src/core/helpers/pageData';
import { convertPages } from '../../src/core/types/pages';
import { IFrontmatter } from '../../src/core/types/types';

// getLastUpdated function to fetch the last update time of a markdown file
async function getLastUpdatedUnix(url:string) {
  // Access global VITEPRESS_CONFIG
  const siteConfig = globalThis.VITEPRESS_CONFIG;

  let file = url.replace(/(^|\/)$/, '$1index');
  file = file.replace(/(\.html)?$/, '.md');
  file = siteConfig.rewrites.inv[file] || file;
  file = path.join(siteConfig.srcDir, file);

  // return new Promise((resolve, reject) => {
  //   const cwd = path.dirname(file);
  //   if (!fs.existsSync(cwd)) return resolve(0);
  //   const fileName = path.basename(file);
  //   const child = spawn('git', ['log', '-1', '--pretty=`%ai`', fileName], {
  //     cwd,
  //   });
  //   let output = '';
  //   child.stdout.on('data', (data) => (output += String(data)));
  //   child.on('close', () => resolve(new Date(output).getTime()));
  //   child.on('error', reject);
  // });
  // made eslint comatible
  return new Promise((resolve, reject) => {
    const cwd = path.dirname(file);
    if (!fs.existsSync(cwd)) {
      resolve(0);
      return;
    }
    const fileName = path.basename(file);
    const child = spawn('git', ['log', '-1', '--pretty=%ai', fileName], {
      cwd,
    });
    let output = '';
    child.stdout.on('data', (data) => {
      output += String(data);
    });
    child.on('close', () => {
      resolve(new Date(output).getTime());
    });
    child.on('error', reject);
  });
}

const loader = createContentLoader(['**/*.md'], {
  includeSrc: true,
  render: true,
  async transform(rawData: ContentData[]) {
    let data = await pMap(
      rawData,
      async (pageData) => {
        const mtime = await getLastUpdatedUnix(pageData.url);
        normalizeFrontmatter(pageData);
        return {
          ...pageData.frontmatter as IFrontmatter,
          mtime,
          rawUrl: pageData.url,
          html: pageData.frontmatter.render ? pageData.html : '',
        };
      },
      { concurrency: 64 },
    );
    // ToDo
    // change to draft == false
    data = data.filter((pageData) => pageData.draft !== true);
    data = sortByPublishDate(data);
    data = sortByOrder(data);
    return data;
  },
});

async function reShapeData() {
  const tempData = await loader.load();
  return convertPages(tempData);
}

// Export the data and the loader
export const data = await loader.load();
export const pages = await reShapeData();

export default loader;
