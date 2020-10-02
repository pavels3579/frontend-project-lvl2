import path from 'path';
import formatData from './src/formatters/index.js';
import getAST from './src/getAST.js';
import getData from './src/parsers.js';
import getContent from './src/getContent.js';

const getFormat = (pathToFile) => {
  const extname = path.extname(pathToFile);
  return extname.substring(extname.lastIndexOf('.') + 1);
};

const genDiff = (pathToFile1, pathToFile2, format = 'stylish') => {
  const content1 = getContent(pathToFile1);
  const content2 = getContent(pathToFile2);

  const data1 = getData(content1, getFormat(pathToFile1));
  const data2 = getData(content2, getFormat(pathToFile2));

  const AST = getAST(data1, data2);

  return formatData(AST, format);
};

export default genDiff;
