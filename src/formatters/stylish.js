import EndOfLine from '../getEOL.js';

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

      if (el.value instanceof Object) {
        if (el.type === 'unchanged') {
          acc.push(`${newIndent}${el.key}: {`);
        } else if (el.type === 'changed') {
          acc.push(`${newIndentAndSign}  - ${el.key}: {`);
        } else if (el.type === 'deleted') {
          acc.push(`${newIndentAndSign}  - ${el.key}: {`);
        } else if (el.type === 'added') {
          acc.push(`${newIndentAndSign}  + ${el.key}: {`);
        }

        const temp = addObject(el.value, acc, level + 1);
        if (el.type === 'changed') {
          temp.push(`${newIndentAndSign}  + ${el.key}: ${el.valueAfter}`);
        }

        return temp;
      }

      if (el.valueAfter instanceof Object) {
        if (el.type === 'changed') {
          acc.push(`${newIndentAndSign}  - ${el.key}: ${el.value}`);
          acc.push(`${newIndentAndSign}  + ${el.key}: {`);
        }

        const temp = addObject(el.valueAfter, acc, level + 1);

        return temp;
      }

      if (el.type === 'unchanged') {
        acc.push(`${newIndent}${el.key}: ${el.value}`);
        return acc;
      }

      if (el.type === 'changed') {
        acc.push(`${newIndentAndSign}  - ${el.key}: ${el.value}`);
        acc.push(`${newIndentAndSign}  + ${el.key}: ${el.valueAfter}`);
        return acc;
      }

      if (el.type === 'deleted') {
        acc.push(`${newIndentAndSign}  - ${el.key}: ${el.value}`);
        return acc;
      }

      if (el.type === 'added') {
        acc.push(`${newIndentAndSign}  + ${el.key}: ${el.value}`);
        return acc;
      }

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
