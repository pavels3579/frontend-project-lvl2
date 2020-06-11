// const program = require('commander');
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import getParsing from './parsers.js';


const getpath = (filePath) => {
  const workingDirectory = process.cwd();
  let correctPath = filePath;

  if (!correctPath.includes(workingDirectory)) {
    correctPath = path.resolve(workingDirectory, correctPath);
  }

  return correctPath;
};

const getQbject = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf-8');

  if (path.extname(filePath) === '.json') {
    return JSON.parse(content);
  }

  if (path.extname(filePath) === '.yml') {
    return yaml.safeLoad(content);
  }

  return {};
};

const getdiff = (filepath1, filepath2) => {
  const path1 = getpath(filepath1);
  const path2 = getpath(filepath2);

  const obj1 = getQbject(path1);
  const obj2 = getQbject(path2);

  return getParsing(obj1, obj2);
};

export default getdiff;
