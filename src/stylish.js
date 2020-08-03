import getParsing from './parsers.js';
import os from 'os';

const getStylish = (obj1, obj2) => {
  const data = getParsing(obj1, obj2);
  // console.log('data: ', data);

  const indent = '  ';
  const newLine = os.EOL;

  const result = data.reduce((acc, el) => {

    if (el.type === 'unchanged') {
      acc.push(`${indent}${indent}${el.name}: ${el.value[0]}`);
      return acc;
    }

    if (el.type === 'changed') {
      acc.push(`  + ${el.name}: ${el.value[1]}`);
      acc.push(`  - ${el.name}: ${el.value[0]}`);
      return acc;
    }

    if (el.type === 'added') {
      acc.push(`  + ${el.name}: ${el.value[0]}`);
      return acc;
    }

    if (el.type === 'deleted') {
      acc.push(`  - ${el.name}: ${el.value[0]}`);
      return acc;
    }

    return acc;
  }, []);

  result.unshift('{');
  result.push('}');

  // console.log('result: ', result);

  return result.join(newLine);
};

export default getStylish;