import getParsing from './parsers.js';
import os from 'os';

const addObject = (obj, res, level) => {
  const indent = '    ';
  const newIndent = indent.repeat(level);
  const newIndentSign = indent.repeat(level - 1);

  const keys = Object.keys(obj);

  const result = keys.reduce((acc, el) => {
    if (obj[el] instanceof Object) {
      acc.push(`${newIndent}${el}: {`);
      return addObject(obj[el], acc, level + 1);
    }

    acc.push(`${newIndent}${el}: ${obj[el]}`);
    acc.push(`${newIndentSign}}`);
    return acc;
  }, res);

  return result;
};


const getStylish = (obj1, obj2) => {
  const data = getParsing(obj1, obj2);
  // console.log('data: ', data);

  const indent = '    ';
  const newLine = os.EOL;
  const res = [];
  const level = 1;

  const getResult = (data, level) => {

    const result = data.reduce((acc, el) => {
      const newIndent = indent.repeat(level);
      const newIndentSign = indent.repeat(level - 1);
      if (el.children.length) {
        if (el.type === 'unchanged') {
          res.push(`${newIndent}${el.name}: {`);
        } else if (el.type === 'changed') {
          res.push(`${newIndentSign}  + ${el.name}: {`);
        } else if (el.type === 'deleted') {
          res.push(`${newIndentSign}  - ${el.name}: {`);
        } else if (el.type === 'added') {
          res.push(`${newIndentSign}  + ${el.name}: {`);
        }

        const temp = getResult(el.children, level + 1);
        temp.push(`${newIndent}}`);
        // console.log('temp: ', temp);
        return temp;
      }

      if (el.value[0] instanceof Object) {
        if (el.type === 'unchanged') {
          acc.push(`${newIndent}${el.name}: {`);
        } else if (el.type === 'changed') {
          acc.push(`${newIndentSign}  + ${el.name}: {`);
        } else if (el.type === 'deleted') {
          acc.push(`${newIndentSign}  - ${el.name}: {`);
        } else if (el.type === 'added') {
          acc.push(`${newIndentSign}  + ${el.name}: {`);
        }

        return addObject(el.value[0], acc, level + 1);
      }


      if (el.type === 'unchanged') {
        acc.push(`${newIndent}${el.name}: ${el.value[0]}`);
        return acc;
      }

      if (el.type === 'changed') {
        acc.push(`${newIndentSign}  - ${el.name}: ${el.value[0]}`);
        acc.push(`${newIndentSign}  + ${el.name}: ${el.value[1]}`);
        return acc;
      }

      if (el.type === 'deleted') {
        acc.push(`${newIndentSign}  - ${el.name}: ${el.value[0]}`);
        return acc;
      }

      if (el.type === 'added') {
        // console.log('acc1: ', acc);
        acc.push(`${newIndentSign}  + ${el.name}: ${el.value[0]}`);
        return acc;
      }

      return acc;
    }, res);

    // console.log('result: ', result);

    return result;
  };

  const tree = getResult(data, level);
  // console.log('tree', tree);
  tree.unshift('{');
  tree.push('}');
   console.log('tree', tree);


  return tree.join(newLine);

};

export default getStylish;