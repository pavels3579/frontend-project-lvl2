import _ from 'lodash';

const addObject = (val) => {
  if (_.isString(val)) {
    return `'${val}'`;
  }

  if (_.isObject(val)) {
    return '[complex value]';
  }

  return val;
};

const getStylish = (AST, acc) => {
  const getResult = (data) => {
    const result = data.map((el) => {
      const newAcc = acc === '' ? el.key : `${acc}.${el.key}`;
      switch (el.type) {
        case 'unchanged': return '';
        case 'nested': return `${getStylish(el.children, newAcc)}`;
        case 'added': return `Property '${newAcc}' was added with value: ${addObject(el.value)}`;
        case 'deleted': return `Property '${newAcc}' was removed`;
        case 'changed': return `Property '${newAcc}' was updated. From ${addObject(el.value)} to ${addObject(el.valueAfter)}`;
        default: throw new Error(`Unknown type ${el.type}`);
      }
    });

    return result;
  };

  const tree = getResult(AST);

  return `${_.compact(tree).sort().join('\n')}`;
};

export default (AST) => getStylish(AST, '');
