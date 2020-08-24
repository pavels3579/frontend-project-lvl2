import os from 'os';
import getParsing from '../parsers.js';

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

const getJSON = (obj1, obj2) => {
  const startData = getParsing(obj1, obj2);
  // console.log('data: ', data);

  const indent = '    ';
  const newLine = os.EOL;
  const res = [];
  const startLevel = 1;

  const getResult = (data, level) => {
    const result = data.reduce((acc, el) => {
      const newIndent = indent.repeat(level);
      const newIndentAndSign = indent.repeat(level - 1);
      if (el.children.length) {
        acc.push(`{'type': ${el.type}},`);
        acc.push(`${el.name}: {`);

        const temp = getResult(el.children, level + 1);
        temp.push('},');
        // console.log('temp: ', temp);
        return temp;
      }

      if (el.value[0] instanceof Object) {
        acc.push(`{'type': ${el.type}},`);
        if (el.type === 'unchanged') {
          acc.push(`${newIndent}${el.name}: {`);
        } else if (el.type === 'changed') {
          acc.push(`${newIndentAndSign}  - ${el.name}: {`);
        } else if (el.type === 'deleted') {
          acc.push(`${newIndentAndSign}  - ${el.name}: {`);
        } else if (el.type === 'added') {
          acc.push(`${newIndentAndSign}  + ${el.name}: {`);
        }

        const temp = addObject(el.value[0], acc, level + 1);
        if (el.type === 'changed') {
          temp.push(`${newIndentAndSign}  + ${el.name}: ${el.value[1]}`);
        }

        return temp;
      }

      if (el.value[1] instanceof Object) {
        if (el.type === 'unchanged') {
          acc.push(`${newIndent}${el.name}: {`);
        } else if (el.type === 'changed') {
          acc.push(`${newIndentAndSign}  - ${el.name}: ${el.value[0]}`);
          acc.push(`${newIndentAndSign}  + ${el.name}: {`);
        } else if (el.type === 'deleted') {
          acc.push(`${newIndentAndSign}  - ${el.name}: {`);
        } else if (el.type === 'added') {
          acc.push(`${newIndentAndSign}  + ${el.name}: {`);
        }

        const temp = addObject(el.value[1], acc, level + 1);

        return temp;
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
        acc.push(`${newIndentAndSign}  + ${el.name}: ${el.value[0]}`);
        return acc;
      }

      return acc;
    }, res);

    // console.log('result: ', result);

    return result;
  };

  const tree = getResult(startData, startLevel);
  // console.log('tree', tree);
  tree.unshift('{');
  tree.push('}');
  console.log('tree', tree);

  return tree.join(newLine);
};

export default getJSON;
