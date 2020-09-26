import _ from 'lodash';

const getAST = (data1, data2) => {
  const keys = _.union([...Object.keys(data1), ...Object.keys(data2)]);

  const result = keys.reduce((acc, key) => {
    const name = key;

    if (data1[key] instanceof Object && data2[key] instanceof Object) {
      const type = 'nested';
      const children = getAST(data1[key], data2[key]);
      const value = '';
      acc.push({
        name, type, children, value,
      });

      return acc;
    }

    const children = [];

    if (_.has(data1, key) && _.has(data2, key)) {
      const type = data1[key] === data2[key] ? 'unchanged' : 'changed';
      const value = [data1[key], data2[key]];
      acc.push({
        name, type, children, value,
      });

      return acc;
    }

    if (_.has(data2, key)) {
      const type = 'added';
      const value = [data2[key]];
      acc.push({
        name, type, children, value,
      });

      return acc;
    }

    if (_.has(data1, key)) {
      const type = 'deleted';
      const value = [data1[key]];
      acc.push({
        name, type, children, value,
      });

      return acc;
    }

    return acc;
  }, []);

  return result;
};

export default getAST;
