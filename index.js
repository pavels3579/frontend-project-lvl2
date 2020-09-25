import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';
import formatData from './src/formatters/index.js';
import getContent from './src/getContent.js';
import getAST from './src/getAST.js';

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
  const data1 = getData(pathToFile1);
  const data2 = getData(pathToFile2);

  const AST = getAST(data1, data2);

  return formatData(AST, format);
};

export default genDiff;
