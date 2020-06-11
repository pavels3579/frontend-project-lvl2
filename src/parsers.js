import _ from 'lodash';

const getParsing = (obj1, obj2) => {
  const newLine = '\r\n';
  const keys = _.uniq([...Object.keys(obj1), ...Object.keys(obj2)]);
  const result = ['{'];

  for (let i = 0; i < keys.length; i += 1) {
    if (_.has(obj2, keys[i]) && _.has(obj1, keys[i])) {
      if (obj2[keys[i]] === obj1[keys[i]]) {
        result.push(`    ${keys[i]}: ${obj1[keys[i]]}`);
      } else {
        result.push(`  + ${keys[i]}: ${obj2[keys[i]]}`);
        result.push(`  - ${keys[i]}: ${obj1[keys[i]]}`);
      }
    } else if (_.has(obj2, keys[i])) {
      result.push(`  + ${keys[i]}: ${obj2[keys[i]]}`);
    } else {
      result.push(`  - ${keys[i]}: ${obj1[keys[i]]}`);
    }
  }
  result.push('}');
  return result.join(newLine);
};

export default getParsing;
