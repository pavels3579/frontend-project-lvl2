import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';
import formatData from './src/formatters/index.js';
import getContent from './src/getContent.js';

const getPath = (pathToFile) => {
  // const fullPath = path.resolve(pathToFile, process.cwd());
  const workingDirectory = process.cwd();
  let fullPath = pathToFile;

  if (!fullPath.includes(workingDirectory)) {
    fullPath = path.resolve(workingDirectory, fullPath);
  }

  return fullPath;
};

const getData = (pathToFile) => {
  const content = getContent(pathToFile);

  if (path.extname(pathToFile) === '.json') {
    return JSON.parse(content);
  }

  if (path.extname(pathToFile) === '.yml') {
    return yaml.safeLoad(content);
  }

  if (path.extname(pathToFile) === '.ini') {
    return ini.parse(content);
  }

  throw new Error('Unknown file format.');
};

const genDiff = (pathToFile1, pathToFile2, format = 'stylish') => {
  const path1 = getPath(pathToFile1);
  const path2 = getPath(pathToFile2);

  const data1 = getData(path1);
  const data2 = getData(path2);

  return formatData(data1, data2, format);
};

export default genDiff;
