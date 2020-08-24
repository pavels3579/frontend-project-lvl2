import getParsing from '../parsers.js';
import os from 'os';


const getPlain = (obj1, obj2) => {
  const data = getParsing(obj1, obj2);
  // console.log('data: ', data);

  const newLine = os.EOL;
  const res = [];
  const parent = '';

  const getResult = (data, parent) => {

    const result = data.reduce((acc, el) => {
      if (el.children.length) {
        const parentName = parent === '' ? el.name : `${parent}.${el.name}`;

        const temp = getResult(el.children, parentName);
        // console.log('temp: ', temp);
        return temp;
      }

      const fullName = parent === '' ? el.name : `${parent}.${el.name}`;

      if (el.value[0] instanceof Object) {
        if (el.type === 'changed') {
          acc.push(`Property '${fullName}' was updated. From [complex value] to '${el.value[1]}'`);
        } else if (el.type === 'deleted') {
          acc.push(`Property '${fullName}' was removed`);
        } else if (el.type === 'added') {
          acc.push(`Property '${fullName}' was added with value: [complex value]`);
        }

        return acc;
      }

      if (el.value[1] instanceof Object) {
        if (el.type === 'changed') {
          acc.push(`Property '${fullName}' was updated. From ${el.value[0]} to [complex value]`);
        }

        return acc;
      }

      if (el.type === 'unchanged') {
        return acc;
      }

      if (el.type === 'changed') {
        acc.push(`Property '${fullName}' was updated. From '${el.value[0]}' to '${el.value[1]}'`);
        return acc;
      }

      if (el.type === 'deleted') {
        acc.push(`Property '${fullName}' was removed`);
        return acc;
      }

      if (el.type === 'added') {
        acc.push(`Property '${fullName}' was added with value: '${el.value[0]}'`);
        return acc;
      }

      return acc;
    }, res);

    // console.log('res: ', res);

    return result;
  };

  const tree = getResult(data, parent);
  // console.log('tree', tree);
  // console.log('tree1', tree);
  tree.sort();

  // console.log('tree2', tree);

  return tree.join(newLine);

};

export default getPlain;