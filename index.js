import formatData from './src/formatters/index.js';
import getAST from './src/getAST.js';
import getType from './src/getType.js';
import getData from './src/getData.js';

const genDiff = (pathToFile1, pathToFile2, format = 'stylish') => {
  const type1 = getType(pathToFile1);
  const type2 = getType(pathToFile2);

  const data1 = getData(pathToFile1, type1);
  const data2 = getData(pathToFile2, type2);

  const AST = getAST(data1, data2);

  return formatData(AST, format);
};

export default genDiff;
