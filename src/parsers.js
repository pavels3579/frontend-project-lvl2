import _ from 'lodash';

const getParsing = (obj1, obj2) => {
  const keys = _.uniq([...Object.keys(obj1), ...Object.keys(obj2)]);

  const result = keys.reduce((acc, el) => {
    const newObj = {};
    if (_.has(obj1, el) && _.has(obj2, el)) {
      newObj.type = obj1[el] === obj2[el] ? 'unchanged' : 'changed';
      newObj.value = [obj1[el], obj2[el]];
    } else if (_.has(obj2, el)) {
      newObj.type = 'added';
      newObj.value = [obj2[el]];
    } else {
      newObj.type = 'deleted';
      newObj.value = [obj1[el]];
    }

    newObj.name = el;
    newObj.children = [];
    // newObj.value = _.has(obj1, el) ? obj1[el] : obj2[el];

    acc.push(newObj);

    return acc;
  }, []);

  // console.log('result: ', result);

  return result;
};

export default getParsing;