import _ from 'lodash';

const indent = 4;
const initial = 2;

const addObject = (val, level) => {
  if (!_.isObject(val)) {
    return val;
  }

  const keys = Object.keys(val);

  const result = keys.map((el) => {
    const currentValue = `${addObject(val[el], level + 1)}`;
    const currentDepth = (level + 1) * indent;

    return `{\n${' '.repeat(currentDepth + initial)}  ${el}: ${currentValue}\n${' '.repeat(currentDepth)}}`;
  });

  return result.join('\n');
};

const getStylish = (AST, depth) => {
  const getResult = (data, level) => {
    const result = data.map((el) => {
      const currentIndent = ' '.repeat((level) * indent + initial);

      switch (el.type) {
        case 'unchanged': return `${currentIndent}  ${el.key}: ${addObject(el.value, level)}`;
        case 'nested': return `${currentIndent}  ${el.key}: ${getStylish(el.children, level + 1)}`;
        case 'added': return `${currentIndent}+ ${el.key}: ${addObject(el.value, level)}`;
        case 'deleted': return `${currentIndent}- ${el.key}: ${addObject(el.value, level)}`;
        case 'changed': return `${currentIndent}- ${el.key}: ${addObject(el.value, level)}\n${currentIndent}+ ${el.key}: ${addObject(el.valueAfter, level)}`;
        default: throw new Error(`Unknown type ${el.type}`);
      }
    });

    return result;
  };

  const tree = getResult(AST, depth);

  return `{\n${tree.join('\n')}\n${' '.repeat(depth * indent)}}`;
};

export default (AST) => getStylish(AST, 0);
