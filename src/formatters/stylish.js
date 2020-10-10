import _ from 'lodash';
import EndOfLine from '../getEOL.js';

const addObject = (obj, res, level) => {
  const indent = '    ';
  const newIndent = indent.repeat(level);
  const newIndentAndSign = indent.repeat(level - 1);

  const keys = Object.keys(obj);

  const result = keys.reduce((acc, el) => {
    if (_.isObject(obj[el])) {
      return addObject(obj[el], [...acc, `${newIndent}${el}: {`], level + 1);
    }

    acc.push(`${newIndent}${el}: ${obj[el]}`);
    acc.push(`${newIndentAndSign}}`);
    return acc;
  }, res);

  return result;
};

const getStylish = (AST) => {
  const indent = '    ';
  const res = [];
  const startLevel = 1;

  const getResult = (data, level) => {
    const result = data.reduce((acc, el) => {
      const newIndent = indent.repeat(level);
      const newIndentAndSign = indent.repeat(level - 1);

      if (el.type === 'nested') {
        acc.push(`${newIndent}${el.key}: {`);

        const temp = getResult(el.children, level + 1);
        temp.push(`${newIndent}}`);

        return temp;
      }

      if (el.type === 'unchanged') {
        if (_.isObject(el.value)) {
          acc.push(`${newIndent}${el.key}: {`);

          const temp = addObject(el.value, acc, level + 1);
          return temp;
        }

        acc.push(`${newIndent}${el.key}: ${el.value}`);
        return acc;
      }

      if (el.type === 'added') {
        if (_.isObject(el.value)) {
          acc.push(`${newIndentAndSign}  + ${el.key}: {`);

          const temp = addObject(el.value, acc, level + 1);
          // const temp = addObject(el.value,
          // [...acc, `${newIndentAndSign}  + ${el.key}: {`], level + 1);
          return temp;
        }

        acc.push(`${newIndentAndSign}  + ${el.key}: ${el.value}`);
        return acc;
      }

      if (el.type === 'deleted') {
        if (_.isObject(el.value)) {
          acc.push(`${newIndentAndSign}  - ${el.key}: {`);

          const temp = addObject(el.value, acc, level + 1);
          return temp;
        }

        acc.push(`${newIndentAndSign}  - ${el.key}: ${el.value}`);
        return acc;
      }

      if (_.isObject(el.value)) {
        acc.push(`${newIndentAndSign}  - ${el.key}: {`);

        const temp = addObject(el.value, acc, level + 1);
        temp.push(`${newIndentAndSign}  + ${el.key}: ${el.valueAfter}`);

        return temp;
      }

      if (_.isObject(el.valueAfter)) {
        acc.push(`${newIndentAndSign}  - ${el.key}: ${el.value}`);
        acc.push(`${newIndentAndSign}  + ${el.key}: {`);

        const temp = addObject(el.valueAfter, acc, level + 1);

        return temp;
      }

      acc.push(`${newIndentAndSign}  - ${el.key}: ${el.value}`);
      acc.push(`${newIndentAndSign}  + ${el.key}: ${el.valueAfter}`);

      return acc;
    }, res);

    return result;
  };

  const tree = getResult(AST, startLevel);
  tree.unshift('{');
  tree.push('}');

  return tree.join(EndOfLine);
};

export default getStylish;
