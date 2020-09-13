import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';
import getFormat from './formatters/index.js';
import getContent from './getContent.js';

const getpath = (filePath) => {
  const workingDirectory = process.cwd();
  let correctPath = filePath;

  if (!correctPath.includes(workingDirectory)) {
    correctPath = path.resolve(workingDirectory, correctPath);
  }

  return correctPath;
};

const getQbject = (filePath) => {
  const content = getContent(filePath);

  if (path.extname(filePath) === '.json') {
    return JSON.parse(content);
  }

  if (path.extname(filePath) === '.yml') {
    return yaml.safeLoad(content);
  }

  if (path.extname(filePath) === '.ini') {
    return ini.parse(content);
  }

  return {};
};

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const path1 = getpath(filepath1);
  const path2 = getpath(filepath2);

  const obj1 = getQbject(path1);
  const obj2 = getQbject(path2);

  return getFormat(obj1, obj2, format);
};

export default gendiff;
