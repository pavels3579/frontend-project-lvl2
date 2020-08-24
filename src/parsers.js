import _ from 'lodash';

const getParsing = (object1, object2) => {
  const obj1 = object1 instanceof Object ? object1 : {};
  const obj2 = object2 instanceof Object ? object2 : {};

  const keys = _.uniq([...Object.keys(obj1), ...Object.keys(obj2)]);

  const result = keys.reduce((acc, el) => {
    const newObj = {};
    if (_.has(obj1, el) && _.has(obj2, el)) {
      newObj.type = obj1[el] === obj2[el] ? 'unchanged' : 'changed';
    } else {
      if (_.has(obj2, el)) {
        newObj.type = 'added';
      }

      if (_.has(obj1, el)) {
        newObj.type = 'deleted';
      }
    }

    newObj.name = el;

    if (obj1[el] instanceof Object && obj2[el] instanceof Object) {
      newObj.type = 'unchanged';
      const children = getParsing(obj1[el], obj2[el]);
      newObj.children = children;
      newObj.value = '';
      acc.push(newObj);
      return acc;
    }

    if (newObj.type === 'added') {
      newObj.value = [obj2[el]];
    } else if (newObj.type === 'deleted') {
      newObj.value = [obj1[el]];
    } else {
      newObj.value = [obj1[el], obj2[el]];
    }

    newObj.children = [];
    acc.push(newObj);

    return acc;
  }, []);

  // console.log('result: ', result);

  return result;
};

export default getParsing;
