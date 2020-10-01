import path from 'path';
import formatData from './src/formatters/index.js';
import getAST from './src/getAST.js';
import getData from './src/parsers.js';

const getFormat = (pathToFile) => path.extname(pathToFile).split('.').pop();

const genDiff = (pathToFile1, pathToFile2, format = 'stylish') => {
  const data1 = getData(pathToFile1, getFormat(pathToFile1));
  const data2 = getData(pathToFile2, getFormat(pathToFile2));

  const AST = getAST(data1, data2);

  return formatData(AST, format);
};

export default genDiff;
