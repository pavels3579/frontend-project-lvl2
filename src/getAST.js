import _ from 'lodash';

const getAST = (data1, data2) => {
  const keys = _.union([...Object.keys(data1), ...Object.keys(data2)]);

  const result = keys.reduce((acc, key) => {
    const newObj = {};
    if (_.has(data1, key) && _.has(data2, key)) {
      newObj.type = data1[key] === data2[key] ? 'unchanged' : 'changed';
    } else {
      if (_.has(data2, key)) {
        newObj.type = 'added';
      }

      if (_.has(data1, key)) {
        newObj.type = 'deleted';
      }
    }

    newObj.name = key;

    if (data1[key] instanceof Object && data2[key] instanceof Object) {
      newObj.type = 'unchanged';
      const children = getAST(data1[key], data2[key]);
      newObj.children = children;
      newObj.value = '';
      acc.push(newObj);
      return acc;
    }

    if (newObj.type === 'added') {
      newObj.value = [data2[key]];
    } else if (newObj.type === 'deleted') {
      newObj.value = [data1[key]];
    } else {
      newObj.value = [data1[key], data2[key]];
    }

    newObj.children = [];
    acc.push(newObj);

    return acc;
  }, []);

  return result;
};

export default getAST;
