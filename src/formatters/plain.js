import EndOfLine from '../getEOL.js';

const getPlain = (AST) => {
  const res = [];
  const stertParent = '';

  const getResult = (data, parent) => {
    const result = data.reduce((acc, el) => {
      if (el.type === 'nested') {
        const parentName = parent === '' ? el.name : `${parent}.${el.name}`;
        const temp = getResult(el.children, parentName);

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

    return result;
  };

  const tree = getResult(AST, stertParent);
  tree.sort();

  return tree.join(EndOfLine);
};

export default getPlain;
