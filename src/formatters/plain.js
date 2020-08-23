import getParsing from '../parsers.js';
import os from 'os';

const addObject = (obj, res, level) => {
  const indent = '    ';
  const newIndent = indent.repeat(level);
  const newIndentAndSign = indent.repeat(level - 1);

  const keys = Object.keys(obj);

  const result = keys.reduce((acc, el) => {
    if (obj[el] instanceof Object) {
      acc.push(`${newIndent}${el}: {`);
      return addObject(obj[el], acc, level + 1);
    }

    acc.push(`${newIndent}${el}: ${obj[el]}`);
    acc.push(`${newIndentAndSign}}`);
    return acc;
  }, res);

  return result;
};


const getPlain = (obj1, obj2) => {
  const data = getParsing(obj1, obj2);
  // console.log('data: ', data);

  const indent = '    ';
  const newLine = os.EOL;
  const res = [];
  const level = 1;
  const parent = '';

  const getResult = (data, level, parent) => {

    const result = data.reduce((acc, el) => {
      const newIndent = indent.repeat(level);
      const newIndentAndSign = indent.repeat(level - 1);
      if (el.children.length) {
        const parentName = parent === undefined ? el.name : `${parent}.${el.name}`;

        const temp = getResult(el.children, level + 1, parentName);
        // console.log('temp: ', temp);
        return temp;
      }

      if (el.value[0] instanceof Object) {
        if (el.type === 'changed') {
          // acc.push(`${newIndentAndSign}  - ${el.name}: {`);
          acc.push(`Property '${el.name}' was updated. From [complex value] to ${el.value[1]}`);
        }

        return acc;
      }

      if (el.value[1] instanceof Object) {
        if (el.type === 'changed') {
          acc.push(`Property '${el.name}' was updated. From ${el.value[0]} to [complex value]`);
        }

        return acc;
      }

      if (el.type === 'unchanged') {
        acc.push(`${newIndent}${el.name}: ${el.value[0]}`);
        return acc;
      }

      if (el.type === 'changed') {
        acc.push(`${newIndentAndSign}  - ${el.name}: ${el.value[0]}`);
        acc.push(`${newIndentAndSign}  + ${el.name}: ${el.value[1]}`);
        return acc;
      }

      if (el.type === 'deleted') {
        acc.push(`${newIndentAndSign}  - ${el.name}: ${el.value[0]}`);
        return acc;
      }

      if (el.type === 'added') {
        // console.log('acc1: ', acc);
        // acc.push(`${newIndentAndSign}  + ${el.name}: ${el.value[0]}`);
        acc.push(`Property '${parent}.${el.name}' was added with value: ${el.value[0]}`);
        return acc;
      }

      return acc;
    }, res);

    // console.log('result: ', result);

    return result;
  };

  const tree = getResult(data, level);
  // console.log('tree', tree);
  console.log('tree', tree);

  return tree.join(newLine);

};

export default getPlain;