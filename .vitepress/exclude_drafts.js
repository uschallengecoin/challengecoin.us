import fs from 'fs';
import path from 'path';

import matter from "gray-matter";

function findDrafts(dirPath) {
  let draftFiles = [];
  let err, files = fs.readdirSync(dirPath);
  if (err) {
    console.error(err);
  }

  for(let i = 0; i < files.length; i++) {
    const filePath = path.join(dirPath, files[i]);
    let err, stats = fs.statSync(filePath);
    if (err) {
      console.error(err);
    }
    if (stats.isDirectory()) {
      draftFiles = draftFiles.concat(findDraftFiles(filePath));
    }
  }

  for(let i = 0; i < files.length; i++) {
    const filePath = path.join(dirPath, files[i]);
    let err, stats = fs.statSync(filePath);
    if (err) {
      console.error(err);
    }
    if (stats.isFile() && filePath.endsWith('.md')) {
      try {
        let fileContent = fs.readFileSync(filePath, "utf8");
        let frontmatter = matter(fileContent);
        let data = frontmatter.data;
        if (data.draft === true) {
          draftFiles.push(filePath);
        }
      } catch(e) {
        console.error(e);
      }
    }
  };
  return draftFiles;
}

export default function findDraftFiles(dirPath) {
  const draftFiles = findDrafts(dirPath);
  // change source dir to ./
  // i.e. docs/aaa/bb/ccc.md => ./aaa/bb/ccc.md
  for(let i = 0; i < draftFiles.length; i++) {
    draftFiles[i] = `./${draftFiles[i].substr(dirPath.length-1, draftFiles[i].length)}`
  }
  return draftFiles;
};
