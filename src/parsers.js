import _ from 'lodash';

const getParsing = (obj1, obj2) => {
  const newLine = '\r\n';
  const keys = _.uniq([...Object.keys(obj1), ...Object.keys(obj2)]);

  const result = keys.reduce((acc, el) => {
    if (obj2[el] === obj1[el]) {
      acc.push(`    ${el}: ${obj2[el]}`);
      return acc;
    }

    if (obj2[el] !== undefined) {
      acc.push(`  + ${el}: ${obj2[el]}`);
    }

    if (obj1[el] !== undefined) {
      acc.push(`  - ${el}: ${obj1[el]}`);
    }

    return acc;
  }, []);

  // console.log('result: ', result);

  result.unshift('{');
  result.push('}');
  return result.join(newLine);
};

export default getParsing;
