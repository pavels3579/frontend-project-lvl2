import _ from 'lodash';

const getAST = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));

  const result = keys.map((key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      const children = getAST(data1[key], data2[key]);

      return {
        key, type: 'nested', children,
      };
    }

    if (_.isEqual(data1[key], data2[key])) {
      return {
        key, type: 'unchanged', value: data1[key],
      };
    }

    if (_.has(data2, key) && !_.has(data1, key)) {
      return {
        key, type: 'added', value: data2[key],
      };
    }

    if (_.has(data1, key) && !_.has(data2, key)) {
      return {
        key, type: 'deleted', value: data1[key],
      };
    }

    return {
      key, type: 'changed', value: data1[key], valueAfter: data2[key],
    };

  });

  return result;
};

export default getAST;
