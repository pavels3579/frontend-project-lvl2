const getPlain = (AST) => {
  const res = [];
  const stertParent = '';

  const getResult = (data, parent) => {
    const result = data.reduce((acc, el) => {
      if (el.type === 'nested') {
        const parentName = parent === '' ? el.key : `${parent}.${el.key}`;
        const temp = getResult(el.children, parentName);

        return temp;
      }

      const fullName = parent === '' ? el.key : `${parent}.${el.key}`;

      if (el.value instanceof Object) {
        if (el.type === 'changed') {
          acc.push(`Property '${fullName}' was updated. From [complex value] to '${el.valueAfter}'`);
        } else if (el.type === 'deleted') {
          acc.push(`Property '${fullName}' was removed`);
        } else if (el.type === 'added') {
          acc.push(`Property '${fullName}' was added with value: [complex value]`);
        }

        return acc;
      }

      if (el.valueAfter instanceof Object) {
        if (el.type === 'changed') {
          acc.push(`Property '${fullName}' was updated. From ${el.value} to [complex value]`);
        }

        return acc;
      }

      if (el.type === 'unchanged') {
        return acc;
      }

      if (el.type === 'changed') {
        acc.push(`Property '${fullName}' was updated. From '${el.value}' to '${el.valueAfter}'`);
        return acc;
      }

      if (el.type === 'deleted') {
        acc.push(`Property '${fullName}' was removed`);
        return acc;
      }

      if (el.type === 'added') {
        acc.push(`Property '${fullName}' was added with value: '${el.value}'`);
        return acc;
      }

      return acc;
    }, res);

    return result;
  };

  const tree = getResult(AST, stertParent);
  tree.sort();

  return tree.join('\n');
};

export default getPlain;
