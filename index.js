import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';
import formatData from './src/formatters/index.js';
import getContent from './src/getContent.js';

const getpath = (pathToFile) => {
  // const fullPath = path.resolve(pathToFile, process.cwd());
  const workingDirectory = process.cwd();
  let fullPath = pathToFile;

  if (!fullPath.includes(workingDirectory)) {
    fullPath = path.resolve(workingDirectory, fullPath);
  }

  return fullPath;
};

const getData = (filePath) => {
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

const genDiff = (pathToFile1, pathToFile2, format = 'stylish') => {
  const path1 = getpath(pathToFile1);
  const path2 = getpath(pathToFile2);

  const data1 = getData(path1);
  const data2 = getData(path2);

  return formatData(data1, data2, format);
};

export default genDiff;
