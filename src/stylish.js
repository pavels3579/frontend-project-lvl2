import getParsing from './parsers.js';

const getStylish = (obj1, obj2) => {
  const data = getParsing(obj1, obj2);

  const indent = '  ';
  const newLine = '\r\n';

  const result = data.reduce((acc, el) => {
    if (el.after === el.before) {
      acc.push(`${indent}${indent}${el.after}`);
      return acc;
    }

    if (el.after !== undefined) {
      acc.push(`  + ${el.after}`);
    }

    if (el.before !== undefined) {
      acc.push(`  - ${el.before}`);
    }

    return acc;
  }, []);

  result.unshift('{');
  result.push('}');

  return result.join(newLine);
};

export default getStylish;
